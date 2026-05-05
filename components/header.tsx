'use client';

import {
  Settings,
  Sun,
  Moon,
  Monitor,
  ArrowLeft,
  Loader2,
  Download,
  FileDown,
  Package,
  Archive,
  Link2,
  Check,
} from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useTheme } from '@/lib/hooks/use-theme';
import { LanguageSwitcher } from './language-switcher';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsDialog } from './settings';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useStageStore } from '@/lib/store/stage';
import { useMediaGenerationStore } from '@/lib/store/media-generation';
import { useExportPPTX } from '@/lib/export/use-export-pptx';
import { useExportClassroom } from '@/lib/export/use-export-classroom';

interface HeaderProps {
  readonly currentSceneTitle: string;
  /** When true, hides all authoring controls (Settings, Export, Language switcher) */
  readonly isLearnerMode?: boolean;
}

export function Header({ currentSceneTitle, isLearnerMode = false }: HeaderProps) {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  // Export
  const { exporting: isExporting, exportPPTX, exportResourcePack } = useExportPPTX();
  const { exporting: isExportingZip, exportClassroomZip } = useExportClassroom();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [learnerLinkCopied, setLearnerLinkCopied] = useState(false);
  const [learnerLinkSaving, setLearnerLinkSaving] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const stage = useStageStore((s) => s.stage);

  const copyLearnerLink = useCallback(async () => {
    setExportMenuOpen(false);
    setLearnerLinkSaving(true);
    try {
      // Persist current session to server-side storage so it loads on any domain/device.
      // Always POST to learn.automationnow.org so the save and load hit the same server instance.
      const { scenes: currentScenes } = useStageStore.getState();
      if (stage && currentScenes.length > 0) {
        // Collect full agent configs (including voiceConfig) from the registry so
        // the learner domain can hydrate Kim's voice and other agent settings.
        const { useAgentRegistry } = await import('@/lib/orchestration/registry/store');
        const registry = useAgentRegistry.getState();
        const agentIds = stage.agentIds || [];
        const generatedAgentConfigs = registry
          .listAgents()
          .filter((a) => a.isGenerated && (agentIds.includes(a.id) || a.boundStageId === stage.id))
          .map((a) => ({
            id: a.id,
            name: a.name,
            role: a.role,
            persona: a.persona,
            avatar: a.avatar,
            color: a.color,
            priority: a.priority,
            ...(a.voiceConfig ? { voiceConfig: a.voiceConfig } : {}),
          }));

        const stageWithAgents = {
          ...stage,
          ...(generatedAgentConfigs.length > 0 ? { generatedAgentConfigs } : {}),
        };

        await fetch('https://learn.automationnow.org/api/classroom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stage: stageWithAgents, scenes: currentScenes }),
        });
      }
    } catch (err) {
      console.warn('Failed to persist classroom for learner link:', err);
    } finally {
      setLearnerLinkSaving(false);
    }
    const learnerUrl = `https://learn.automationnow.org${pathname}?mode=learner`;
    navigator.clipboard.writeText(learnerUrl).then(() => {
      setLearnerLinkCopied(true);
      setTimeout(() => setLearnerLinkCopied(false), 2500);
    });
  }, [pathname, stage]);
  const scenes = useStageStore((s) => s.scenes);
  const generatingOutlines = useStageStore((s) => s.generatingOutlines);
  const failedOutlines = useStageStore((s) => s.failedOutlines);
  const mediaTasks = useMediaGenerationStore((s) => s.tasks);

  const canExport =
    scenes.length > 0 &&
    generatingOutlines.length === 0 &&
    failedOutlines.length === 0 &&
    Object.values(mediaTasks).every((task) => task.status === 'done' || task.status === 'failed');

  // Copy Learner Link is always available as long as there are scenes —
  // it does not depend on media task completion.
  const canShareLearnerLink = scenes.length > 0 && generatingOutlines.length === 0;

  const isAnyExporting = isExporting || isExportingZip;

  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (themeOpen && themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
      if (exportMenuOpen && exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    },
    [themeOpen, exportMenuOpen],
  );

  useEffect(() => {
    if (themeOpen || exportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [themeOpen, exportMenuOpen, handleClickOutside]);

  return (
    <>
      <header className="h-20 px-8 flex items-center justify-between z-10 bg-transparent gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            onClick={() => router.push('/')}
            className="shrink-0 p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            title={t('generation.backToHome')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-0.5">
              {t('stage.currentScene')}
            </span>
            <h1
              className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tight truncate"
              suppressHydrationWarning
            >
              {currentSceneTitle || t('common.loading')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-100/50 dark:border-gray-700/50 shadow-sm shrink-0">
          {/* Language Selector — hidden in learner mode */}
          {!isLearnerMode && <LanguageSwitcher onOpen={() => setThemeOpen(false)} />}

          {!isLearnerMode && <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700" />}

          {/* Theme Selector */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => {
                setThemeOpen(!themeOpen);
              }}
              className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group"
            >
              {theme === 'light' && <Sun className="w-4 h-4" />}
              {theme === 'dark' && <Moon className="w-4 h-4" />}
              {theme === 'system' && <Monitor className="w-4 h-4" />}
            </button>
            {themeOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
                <button
                  onClick={() => {
                    setTheme('light');
                    setThemeOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2',
                    theme === 'light' &&
                      'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                  )}
                >
                  <Sun className="w-4 h-4" />
                  {t('settings.themeOptions.light')}
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    setThemeOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2',
                    theme === 'dark' &&
                      'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                  )}
                >
                  <Moon className="w-4 h-4" />
                  {t('settings.themeOptions.dark')}
                </button>
                <button
                  onClick={() => {
                    setTheme('system');
                    setThemeOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2',
                    theme === 'system' &&
                      'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                  )}
                >
                  <Monitor className="w-4 h-4" />
                  {t('settings.themeOptions.system')}
                </button>
              </div>
            )}
          </div>

          {!isLearnerMode && <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700" />}

          {/* Settings Button — hidden in learner mode */}
          {!isLearnerMode && (
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(true)}
                className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group"
              >
                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          )}
        </div>

        {/* Export Dropdown — hidden in learner mode */}
        {!isLearnerMode && (
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => {
              // Allow opening the dropdown if either full export is ready OR
              // the learner link is available (scenes exist, not generating)
              if ((canExport || canShareLearnerLink) && !isAnyExporting) setExportMenuOpen(!exportMenuOpen);
            }}
            disabled={!canExport && !canShareLearnerLink || isAnyExporting}
            title={
              canExport || canShareLearnerLink
                ? isAnyExporting
                  ? t('export.exporting')
                  : t('export.pptx')
                : t('share.notReady')
            }
            className={cn(
              'shrink-0 p-2 rounded-full transition-all',
              (canExport || canShareLearnerLink) && !isAnyExporting
                ? 'text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50',
            )}
          >
            {isAnyExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </button>
          {exportMenuOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[200px]">
              <button
                onClick={() => {
                  setExportMenuOpen(false);
                  exportPPTX();
                }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5"
              >
                <FileDown className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{t('export.pptx')}</span>
              </button>
              <button
                onClick={() => {
                  setExportMenuOpen(false);
                  exportResourcePack();
                }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5"
              >
                <Package className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <div>{t('export.resourcePack')}</div>
                  <div className="text-[11px] text-gray-400 dark:text-gray-500">
                    {t('export.resourcePackDesc')}
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setExportMenuOpen(false);
                  exportClassroomZip();
                }}
                disabled={isExportingZip}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5"
              >
                <Archive className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <div>{t('export.classroomZip')}</div>
                  <div className="text-[11px] text-gray-400 dark:text-gray-500">
                    {t('export.classroomZipDesc')}
                  </div>
                </div>
              </button>
              {/* Offline HTML export removed — live Learner Link preferred */}
              {/* Copy Learner Link */}
              <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
              <button
                onClick={copyLearnerLink}
                disabled={learnerLinkSaving}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {learnerLinkCopied ? (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                ) : learnerLinkSaving ? (
                  <Loader2 className="w-4 h-4 text-purple-500 shrink-0 animate-spin" />
                ) : (
                  <Link2 className="w-4 h-4 text-purple-500 shrink-0" />
                )}
                <div>
                  <div className={learnerLinkCopied ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-purple-600 dark:text-purple-400 font-semibold'}>
                    {learnerLinkCopied ? 'Copied!' : learnerLinkSaving ? 'Saving session...' : 'Copy Learner Link'}
                  </div>
                  <div className="text-[11px] text-gray-400 dark:text-gray-500">
                    Share with students — read-only view
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
        )}
      </header>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
