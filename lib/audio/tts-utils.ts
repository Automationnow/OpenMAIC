/**
 * Shared TTS utilities used by both client-side and server-side generation.
 */

import type { TTSProviderId } from './types';
import type { Action, SpeechAction } from '@/lib/types/action';
import { createLogger } from '@/lib/logger';

const log = createLogger('TTS');

/**
 * Normalize text before sending to TTS to ensure correct pronunciation.
 * Expands financial shorthand, abbreviations, and symbols that TTS engines
 * commonly mispronounce (e.g. $1.2M -> "one point two million dollars").
 */
export function normalizeTTSText(text: string): string {
  return text
    // Written-out currency: $1.2 million -> "one point two million dollars"
    // MUST come before all other rules
    .replace(/\$\s*(\d+\.\d+)\s+million\b/gi, (_, n) => `${n.replace('.', ' point ')} million dollars`)
    .replace(/\$\s*(\d+)\s+million\b/gi, (_, n) => `${n} million dollars`)
    .replace(/\$\s*(\d+\.\d+)\s+billion\b/gi, (_, n) => `${n.replace('.', ' point ')} billion dollars`)
    .replace(/\$\s*(\d+)\s+billion\b/gi, (_, n) => `${n} billion dollars`)
    .replace(/\$\s*(\d+\.\d+)\s+trillion\b/gi, (_, n) => `${n.replace('.', ' point ')} trillion dollars`)
    .replace(/\$\s*(\d+)\s+trillion\b/gi, (_, n) => `${n} trillion dollars`)
    .replace(/\$\s*(\d+\.\d+)\s+thousand\b/gi, (_, n) => `${n.replace('.', ' point ')} thousand dollars`)
    .replace(/\$\s*(\d+)\s+thousand\b/gi, (_, n) => `${n} thousand dollars`)
    // Currency with M/B/K/T suffix — MUST come before plain dollar fallback
    // $1.2M -> "one point two million dollars"
    .replace(/\$\s*(\d+\.\d+)\s*[Mm](?:illion)?\b/g, (_, n) => `${n.replace('.', ' point ')} million dollars`)
    .replace(/\$\s*(\d+)\s*[Mm](?:illion)?\b/g, (_, n) => `${n} million dollars`)
    // $1.2B -> "one point two billion dollars"
    .replace(/\$\s*(\d+\.\d+)\s*[Bb](?:illion)?\b/g, (_, n) => `${n.replace('.', ' point ')} billion dollars`)
    .replace(/\$\s*(\d+)\s*[Bb](?:illion)?\b/g, (_, n) => `${n} billion dollars`)
    // $500K -> "500 thousand dollars"
    .replace(/\$\s*(\d+\.\d+)\s*[Kk](?:illion)?\b/g, (_, n) => `${n.replace('.', ' point ')} thousand dollars`)
    .replace(/\$\s*(\d+)\s*[Kk]\b/g, (_, n) => `${n} thousand dollars`)
    // $2T -> "2 trillion dollars"
    .replace(/\$\s*(\d+\.\d+)\s*[Tt](?:rillion)?\b/g, (_, n) => `${n.replace('.', ' point ')} trillion dollars`)
    .replace(/\$\s*(\d+)\s*[Tt](?:rillion)?\b/g, (_, n) => `${n} trillion dollars`)
    // Plain currency fallback: $15 -> "15 dollars" (only after all suffix patterns handled)
    .replace(/\$\s*(\d+(?:,\d{3})*(?:\.\d+)?)(?![MmBbKkTt\d])/g, (_, n) => `${n.replace(/,/g, '')} dollars`)
    // Large plain numbers with commas: 1,200,000 -> "1200000" for TTS
    .replace(/(\d{1,3}(?:,\d{3})+)/g, (_, n) => n.replace(/,/g, ''))
    // Percentages: 15% -> "15 percent"
    .replace(/(\d+(?:\.\d+)?)%/g, '$1 percent')
    // Common abbreviations
    .replace(/\bROI\b/g, 'return on investment')
    .replace(/\bRPA\b/g, 'robotic process automation')
    .replace(/\bAI\b/g, 'artificial intelligence')
    .replace(/\bHR\b/g, 'human resources')
    .replace(/\bCFO\b/g, 'chief financial officer')
    .replace(/\bCEO\b/g, 'chief executive officer')
    .replace(/\bCTO\b/g, 'chief technology officer')
    .replace(/\bCOO\b/g, 'chief operating officer')
    .replace(/\bSLA\b/g, 'service level agreement')
    .replace(/\bKPI\b/g, 'key performance indicator')
    .replace(/\bFTE\b/g, 'full time equivalent');
}

/** Provider-specific max text length limits. */
export const TTS_MAX_TEXT_LENGTH: Partial<Record<TTSProviderId, number>> = {
  'glm-tts': 1024,
};

/**
 * Split long text into chunks that respect sentence boundaries.
 * Tries splitting at sentence-ending punctuation first, then clause-level
 * punctuation, and finally hard-splits at maxLength as a last resort.
 */
export function splitLongSpeechText(text: string, maxLength: number): string[] {
  const normalized = text.trim();
  if (!normalized || normalized.length <= maxLength) return [normalized];

  const units = normalized
    .split(/(?<=[。！？!?；;：:\n])/u)
    .map((part) => part.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = '';

  const pushChunk = (value: string) => {
    const trimmed = value.trim();
    if (trimmed) chunks.push(trimmed);
  };

  const appendUnit = (unit: string) => {
    if (!current) {
      current = unit;
      return;
    }
    if ((current + unit).length <= maxLength) {
      current += unit;
      return;
    }
    pushChunk(current);
    current = unit;
  };

  const hardSplitUnit = (unit: string) => {
    const parts = unit.split(/(?<=[，,、])/u).filter(Boolean);
    if (parts.length > 1) {
      for (const part of parts) {
        if (part.length <= maxLength) appendUnit(part);
        else hardSplitUnit(part);
      }
      return;
    }

    let start = 0;
    while (start < unit.length) {
      appendUnit(unit.slice(start, start + maxLength));
      start += maxLength;
    }
  };

  for (const unit of units.length > 0 ? units : [normalized]) {
    if (unit.length <= maxLength) appendUnit(unit);
    else hardSplitUnit(unit);
  }

  pushChunk(current);
  return chunks;
}

/**
 * Split long speech actions into multiple shorter actions so each stays
 * within the TTS provider's text length limit. Each sub-action gets its
 * own independent audio file — no byte concatenation needed.
 */
export function splitLongSpeechActions(actions: Action[], providerId: TTSProviderId): Action[] {
  const maxLength = TTS_MAX_TEXT_LENGTH[providerId];
  if (!maxLength) return actions;

  let didSplit = false;
  const nextActions: Action[] = actions.flatMap((action) => {
    if (action.type !== 'speech' || !action.text || action.text.length <= maxLength)
      return [action];

    const chunks = splitLongSpeechText(action.text, maxLength);
    if (chunks.length <= 1) return [action];
    didSplit = true;
    const { audioId: _audioId, ...baseAction } = action as SpeechAction;

    log.info(
      `Split speech for ${providerId}: action=${action.id}, len=${action.text.length}, chunks=${chunks.length}`,
    );
    return chunks.map((chunk, i) => ({
      ...baseAction,
      id: `${action.id}_tts_${i + 1}`,
      text: chunk,
    }));
  });
  return didSplit ? nextActions : actions;
}
