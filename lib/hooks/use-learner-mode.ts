'use client';

import { useSearchParams } from 'next/navigation';

/**
 * Returns true when the classroom is opened in Learner Mode
 * (i.e. the URL contains ?mode=learner).
 *
 * In Learner Mode:
 *  - All interactive learning features remain fully active
 *    (CALE agents, chat, quizzes, exercises, audio, navigation)
 *  - Authoring / admin controls are hidden:
 *    Settings, Export/Download, Language switcher,
 *    slide lock toggle, slide regenerate button
 *
 * Usage:
 *   Facilitator URL  →  /classroom/<id>          (full access)
 *   Learner URL      →  /classroom/<id>?mode=learner  (read-only authoring)
 */
export function useLearnerMode(): boolean {
  const searchParams = useSearchParams();
  return searchParams?.get('mode') === 'learner';
}
