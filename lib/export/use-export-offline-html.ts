'use client';

/**
 * useExportOfflineHTML
 *
 * Packages the current classroom session into a single self-contained HTML file
 * that can be opened on any laptop without an internet connection.
 *
 * What is included:
 *  - All slide content (HTML canvas data)
 *  - All scene metadata (titles, types, order)
 *  - All agent definitions (name, role, persona, avatar, color)
 *  - All speech/action scripts (text content)
 *  - Audio files embedded as base64 data URIs
 *  - A lightweight built-in viewer with slide navigation
 *
 * What is NOT included (requires live server):
 *  - Real-time AI agent chat / LLM responses
 *  - TTS generation for new responses
 *  - Whiteboard real-time collaboration
 *
 * The exported file opens in any modern browser and shows:
 *  - Full slide viewer with prev/next navigation
 *  - All slide content rendered faithfully
 *  - Pre-recorded audio playback (if TTS was generated)
 *  - Agent scripts shown as a read-only transcript
 *  - Course title, description, and scene list
 */

import { useState, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
import { useStageStore } from '@/lib/store/stage';
import { db, getGeneratedAgentsByStageId } from '@/lib/utils/database';
import { collectAudioFiles } from './classroom-zip-utils';
import type { SpeechAction } from '@/lib/types/action';
import type { SlideContent } from '@/lib/types/stage';
import { createLogger } from '@/lib/logger';

const log = createLogger('ExportOfflineHTML');

/** Convert a Blob to a base64 data URI */
async function blobToDataUri(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function useExportOfflineHTML() {
  const [exporting, setExporting] = useState(false);

  const exportOfflineHTML = useCallback(async () => {
    const { stage, scenes } = useStageStore.getState();
    if (!stage?.id || scenes.length === 0) return;

    setExporting(true);
    const toastId = toast.loading('Building offline HTML package...');

    try {
      // 1. Read latest stage name from IndexedDB
      const freshStage = await db.stages.get(stage.id);
      const latestName = freshStage?.name || stage.name;

      // 2. Collect agents
      const agentRecords = await getGeneratedAgentsByStageId(stage.id);
      const agents =
        agentRecords.length > 0
          ? agentRecords
          : (stage.generatedAgentConfigs ?? []);

      // 3. Collect audio files and convert to base64 data URIs
      const audioFiles = await collectAudioFiles(scenes);
      const audioDataUris = new Map<string, string>();
      for (const af of audioFiles) {
        const dataUri = await blobToDataUri(af.record.blob);
        audioDataUris.set(af.record.id, dataUri);
      }

      // 4. Build scene data for the viewer
      const sceneData = scenes
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((scene) => {
          // Extract slide HTML canvas
          const slideContent = scene.type === 'slide' ? (scene.content as SlideContent) : null;
          const canvasHtml = slideContent?.canvas?.html ?? '';

          // Extract speech scripts
          const speechScript = (scene.actions ?? [])
            .filter((a): a is SpeechAction => a.type === 'speech' && !!a.text)
            .map((a) => {
              const audioDataUri = a.audioId ? audioDataUris.get(a.audioId) : undefined;
              return { text: a.text, audioDataUri: audioDataUri ?? null };
            });

          return {
            order: scene.order,
            title: scene.title,
            type: scene.type,
            canvasHtml,
            speechScript,
          };
        });

      // 5. Build agent cards HTML
      const agentCardsHtml = agents
        .map(
          (a) => `
        <div class="agent-card">
          <div class="agent-avatar" style="background:${a.color ?? '#6366f1'}">
            ${a.avatar ? `<img src="${a.avatar}" alt="${a.name}" onerror="this.style.display='none'">` : ''}
            <span class="agent-initials">${(a.name ?? '?').charAt(0).toUpperCase()}</span>
          </div>
          <div class="agent-info">
            <div class="agent-name">${escapeHtml(a.name ?? '')}</div>
            <div class="agent-role">${escapeHtml(a.role ?? '')}</div>
          </div>
        </div>`,
        )
        .join('');

      // 6. Build scene list sidebar HTML
      const sceneListHtml = sceneData
        .map(
          (s, i) => `
        <div class="scene-item ${i === 0 ? 'active' : ''}" data-index="${i}" onclick="goToScene(${i})">
          <span class="scene-num">${i + 1}</span>
          <span class="scene-title">${escapeHtml(s.title)}</span>
        </div>`,
        )
        .join('');

      // 7. Build scene panels HTML
      const scenePanelsHtml = sceneData
        .map((s, i) => {
          const speechHtml = s.speechScript
            .map(
              (sp, si) => `
            <div class="speech-item">
              ${sp.audioDataUri ? `<audio id="audio-${i}-${si}" src="${sp.audioDataUri}" preload="none"></audio>` : ''}
              <p class="speech-text">${escapeHtml(sp.text)}</p>
              ${sp.audioDataUri ? `<button class="play-btn" onclick="playAudio('audio-${i}-${si}')">▶ Play</button>` : ''}
            </div>`,
            )
            .join('');

          return `
        <div class="scene-panel ${i === 0 ? 'active' : ''}" id="scene-${i}">
          <div class="scene-header">
            <span class="scene-type-badge ${s.type}">${s.type}</span>
            <h2 class="scene-title-main">${escapeHtml(s.title)}</h2>
          </div>
          ${
            s.canvasHtml
              ? `<div class="slide-canvas">${s.canvasHtml}</div>`
              : `<div class="slide-canvas no-canvas"><p>Interactive scene — requires live session</p></div>`
          }
          ${speechHtml ? `<div class="speech-section"><h3>Agent Scripts</h3>${speechHtml}</div>` : ''}
        </div>`;
        })
        .join('');

      // 8. Assemble the full HTML document
      const exportedAt = new Date().toLocaleString();
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(latestName)} — Offline Course Viewer</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; display: flex; flex-direction: column; min-height: 100vh; }

    /* Header */
    .app-header { background: #1e1b4b; color: white; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
    .app-header h1 { font-size: 18px; font-weight: 700; }
    .app-header .meta { font-size: 12px; opacity: 0.6; }
    .offline-badge { background: #7c3aed; color: white; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; }

    /* Layout */
    .app-body { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 60px); }

    /* Sidebar */
    .sidebar { width: 240px; background: white; border-right: 1px solid #e2e8f0; overflow-y: auto; flex-shrink: 0; }
    .sidebar-section { padding: 12px; border-bottom: 1px solid #f1f5f9; }
    .sidebar-section h3 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 8px; }
    .scene-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
    .scene-item:hover { background: #f8fafc; }
    .scene-item.active { background: #ede9fe; }
    .scene-num { width: 20px; height: 20px; border-radius: 50%; background: #e2e8f0; color: #64748b; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .scene-item.active .scene-num { background: #7c3aed; color: white; }
    .scene-title { font-size: 12px; font-weight: 600; color: #475569; line-height: 1.3; }
    .scene-item.active .scene-title { color: #5b21b6; }

    /* Agent cards */
    .agent-card { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
    .agent-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
    .agent-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .agent-initials { font-size: 13px; font-weight: 700; color: white; }
    .agent-name { font-size: 12px; font-weight: 700; color: #1e293b; }
    .agent-role { font-size: 11px; color: #64748b; }

    /* Main content */
    .main-content { flex: 1; overflow-y: auto; padding: 24px; }
    .scene-panel { display: none; }
    .scene-panel.active { display: block; }
    .scene-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .scene-type-badge { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 999px; }
    .scene-type-badge.slide { background: #dbeafe; color: #1d4ed8; }
    .scene-type-badge.interactive { background: #dcfce7; color: #15803d; }
    .scene-type-badge.quiz { background: #fef3c7; color: #b45309; }
    .scene-title-main { font-size: 22px; font-weight: 700; color: #1e293b; }

    /* Slide canvas */
    .slide-canvas { background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 24px; margin-bottom: 20px; overflow: auto; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .no-canvas { text-align: center; padding: 48px; color: #94a3b8; font-style: italic; }

    /* Speech section */
    .speech-section { background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; }
    .speech-section h3 { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
    .speech-item { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .speech-item:last-child { border-bottom: none; }
    .speech-text { font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 6px; }
    .play-btn { font-size: 12px; background: #7c3aed; color: white; border: none; border-radius: 6px; padding: 4px 12px; cursor: pointer; }
    .play-btn:hover { background: #6d28d9; }

    /* Navigation */
    .nav-bar { background: white; border-top: 1px solid #e2e8f0; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
    .nav-btn { background: #7c3aed; color: white; border: none; border-radius: 8px; padding: 8px 20px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
    .nav-btn:hover { background: #6d28d9; }
    .nav-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
    .nav-counter { font-size: 14px; color: #64748b; font-weight: 600; }
  </style>
</head>
<body>
  <header class="app-header">
    <div>
      <h1>${escapeHtml(latestName)}</h1>
      <div class="meta">Exported ${exportedAt} &nbsp;·&nbsp; ${sceneData.length} scenes</div>
    </div>
    <span class="offline-badge">OFFLINE VIEWER</span>
  </header>

  <div class="app-body">
    <aside class="sidebar">
      <div class="sidebar-section">
        <h3>Scenes</h3>
        ${sceneListHtml}
      </div>
      ${
        agentCardsHtml
          ? `<div class="sidebar-section"><h3>Agents</h3>${agentCardsHtml}</div>`
          : ''
      }
    </aside>

    <main class="main-content" id="main-content">
      ${scenePanelsHtml}
    </main>
  </div>

  <nav class="nav-bar">
    <button class="nav-btn" id="btn-prev" onclick="navigate(-1)" disabled>← Previous</button>
    <span class="nav-counter" id="nav-counter">1 / ${sceneData.length}</span>
    <button class="nav-btn" id="btn-next" onclick="navigate(1)" ${sceneData.length <= 1 ? 'disabled' : ''}>Next →</button>
  </nav>

  <script>
    var currentIndex = 0;
    var total = ${sceneData.length};

    function goToScene(index) {
      if (index < 0 || index >= total) return;
      document.querySelectorAll('.scene-panel').forEach(function(p) { p.classList.remove('active'); });
      document.querySelectorAll('.scene-item').forEach(function(i) { i.classList.remove('active'); });
      document.getElementById('scene-' + index).classList.add('active');
      document.querySelector('[data-index="' + index + '"]').classList.add('active');
      currentIndex = index;
      document.getElementById('nav-counter').textContent = (index + 1) + ' / ' + total;
      document.getElementById('btn-prev').disabled = index === 0;
      document.getElementById('btn-next').disabled = index === total - 1;
      document.getElementById('main-content').scrollTop = 0;
    }

    function navigate(dir) {
      goToScene(currentIndex + dir);
    }

    function playAudio(id) {
      var audio = document.getElementById(id);
      if (audio) { audio.currentTime = 0; audio.play(); }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
    });
  </script>
</body>
</html>`;

      // 9. Download the HTML file
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const safeName = latestName.replace(/[\\/:*?"<>|]/g, '_') || 'classroom';
      saveAs(blob, `${safeName}_offline.html`);

      toast.success('Offline HTML exported successfully!', { id: toastId });
    } catch (error) {
      log.error('Offline HTML export failed:', error);
      toast.error('Export failed. Please try again.', { id: toastId });
    } finally {
      setExporting(false);
    }
  }, []);

  return { exporting, exportOfflineHTML };
}

/** Escape HTML special characters to prevent XSS in the exported file */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
