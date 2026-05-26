import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Automation Now, LLC — CALE Platform',
  description:
    'Automation Now, LLC is committed to ensuring digital accessibility for people with disabilities. This statement describes our conformance with WCAG 2.1 Level AA and Section 508 of the Rehabilitation Act.',
};

export default function AccessibilityPage() {
  const lastUpdated = 'May 25, 2026';

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/automation-now-logo-full.png"
              alt="Automation Now, LLC Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-semibold text-gray-900">Automation Now, LLC</span>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline font-medium"
            aria-label="Return to CALE platform home"
          >
            ← Back to Platform
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-block bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            Accessibility
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Automation Now, LLC is committed to ensuring that the CALE platform and all
            associated digital services are accessible to people with disabilities, in
            conformance with <strong>WCAG 2.1 Level AA</strong> and{' '}
            <strong>Section 508 of the Rehabilitation Act</strong>.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Last updated:</strong> {lastUpdated}
          </p>
        </div>

        {/* Commitment */}
        <section className="mb-12" aria-labelledby="commitment-heading">
          <h2
            id="commitment-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Our Commitment
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Automation Now, LLC is a SAM.gov-registered federal vendor (CAGE Code:{' '}
            <code className="bg-gray-100 px-1 rounded text-sm">KESEQWKHCDJ3</code>, UEI:{' '}
            <code className="bg-gray-100 px-1 rounded text-sm">1WYM2</code>) serving federal
            agencies, corporations, and educational institutions. As a vendor subject to{' '}
            <strong>FAR 39.2</strong> and <strong>ADA Title III</strong>, we are committed to
            providing accessible information and communication technology (ICT) to all users,
            including those who rely on assistive technologies such as screen readers, keyboard
            navigation, braille displays, and voice control software.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We actively work to conform to the{' '}
            <a
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>{' '}
            published by the World Wide Web Consortium (W3C), and to the technical standards
            established by the{' '}
            <a
              href="https://www.access-board.gov/ict/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              U.S. Access Board (36 CFR Part 1194)
            </a>
            .
          </p>
        </section>

        {/* Conformance Status */}
        <section className="mb-12" aria-labelledby="conformance-heading">
          <h2
            id="conformance-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Conformance Status
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The CALE platform at{' '}
            <a
              href="https://learn.automationnow.org"
              className="text-blue-600 hover:underline"
            >
              learn.automationnow.org
            </a>{' '}
            is <strong>partially conformant</strong> with WCAG 2.1 Level AA. Partial conformance
            means that some parts of the content do not fully conform to the accessibility
            standard, as described in the Known Limitations section below.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <caption className="sr-only">
                WCAG 2.1 Level AA conformance status for the CALE platform
              </caption>
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200"
                  >
                    Accessibility Feature
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200"
                  >
                    WCAG Criterion
                  </th>
                </tr>
              </thead>
              <tbody>
                {conformanceItems.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-800 border-b border-gray-100">
                      {item.feature}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                      {item.criterion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="mb-12" aria-labelledby="limitations-heading">
          <h2
            id="limitations-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Known Limitations
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Despite our best efforts to ensure accessibility, there are some known limitations.
            We are actively working to resolve these issues:
          </p>
          <ul className="space-y-4">
            {knownLimitations.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold">
                  !
                </span>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Technical Specifications */}
        <section className="mb-12" aria-labelledby="tech-heading">
          <h2
            id="tech-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Technical Specifications
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Accessibility of the CALE platform relies on the following technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>HTML5 with semantic landmark elements</li>
            <li>CSS3 with WCAG-compliant focus indicators</li>
            <li>WAI-ARIA 1.2 roles, states, and properties</li>
            <li>Next.js 16 (React-based server-side rendering)</li>
            <li>
              The platform has been tested with the following assistive technologies and browsers:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600">
                <li>NVDA screen reader with Chrome on Windows</li>
                <li>VoiceOver with Safari on macOS and iOS</li>
                <li>Keyboard-only navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* VPAT */}
        <section className="mb-12" aria-labelledby="vpat-heading">
          <h2
            id="vpat-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Accessibility Conformance Report (VPAT)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a SAM.gov-registered federal vendor, Automation Now, LLC has prepared a{' '}
            <strong>Voluntary Product Accessibility Template (VPAT 2.5 Section 508)</strong> —
            also known as an Accessibility Conformance Report (ACR) — for the CALE platform.
            This document is available to federal contracting officers and procurement officials
            upon request and is also publicly available on our compliance page.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-purple-800 transition-colors"
              aria-label="View the full compliance and VPAT page"
            >
              View Compliance &amp; VPAT Page →
            </Link>
            <a
              href="https://www.section508.gov/sell/acr-vpat-faq/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              aria-label="Learn about VPAT and ACR requirements on Section508.gov (opens in new tab)"
            >
              About VPAT/ACR ↗
            </a>
          </div>
        </section>

        {/* Feedback & Contact */}
        <section className="mb-12" aria-labelledby="feedback-heading">
          <h2
            id="feedback-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Feedback &amp; Contact
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We welcome your feedback on the accessibility of the CALE platform. If you
            experience any accessibility barriers, or if you need information in an alternative
            format, please contact us:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
            <div>
              <span className="font-semibold text-gray-800">Organization:</span>{' '}
              <span className="text-gray-700">Automation Now, LLC</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Email:</span>{' '}
              <a
                href="mailto:automationnow@automationnow.org"
                className="text-blue-600 hover:underline"
                aria-label="Send email to Automation Now LLC accessibility team"
              >
                automationnow@automationnow.org
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Website:</span>{' '}
              <a
                href="https://www.automationnow.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                aria-label="Visit Automation Now LLC main website (opens in new tab)"
              >
                www.automationnow.org
              </a>
            </div>
            <p className="text-sm text-gray-600 pt-2 border-t border-gray-200">
              We aim to respond to accessibility feedback within{' '}
              <strong>5 business days</strong>. If you are not satisfied with our response,
              you may contact the{' '}
              <a
                href="https://www.ada.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                U.S. Department of Justice ADA Information Line
              </a>{' '}
              at 1-800-514-0301 (voice) or 1-800-514-0383 (TTY).
            </p>
          </div>
        </section>

        {/* Formal Complaints */}
        <section className="mb-12" aria-labelledby="complaints-heading">
          <h2
            id="complaints-heading"
            className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
          >
            Formal Complaints
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you are not satisfied with our response to your accessibility concern, you have
            the right to file a formal complaint with the relevant enforcement authority. For
            Section 508 complaints related to federal agency ICT procurement, contact the{' '}
            <a
              href="https://www.section508.gov/manage/laws-and-policies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              relevant federal agency&apos;s Section 508 Coordinator
            </a>
            . For ADA Title III complaints, contact the{' '}
            <a
              href="https://www.ada.gov/filing-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              U.S. Department of Justice Civil Rights Division
            </a>
            .
          </p>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 pt-8 text-sm text-gray-500">
          <p>
            This accessibility statement was prepared on {lastUpdated} in accordance with the{' '}
            <a
              href="https://www.w3.org/WAI/planning/statements/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              W3C WAI Accessibility Statement Generator guidelines
            </a>
            . It will be reviewed and updated at least annually or whenever significant changes
            are made to the platform.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/compliance" className="text-blue-600 hover:underline">
              Compliance &amp; VPAT
            </Link>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Platform
            </Link>
            <a
              href="https://www.automationnow.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              automationnow.org
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function StatusBadge({ status }: { status: 'Supports' | 'Partial' | 'In Progress' }) {
  const styles = {
    Supports: 'bg-green-100 text-green-700',
    Partial: 'bg-yellow-100 text-yellow-700',
    'In Progress': 'bg-blue-100 text-blue-700',
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ─── Data ───────────────────────────────────────────────── */

const conformanceItems = [
  {
    feature: 'Captions / Live Transcript for AI Voice (Kim)',
    status: 'Supports' as const,
    criterion: 'WCAG 1.2.3 — Audio Description or Media Alternative',
  },
  {
    feature: 'Screen Reader Announcements (aria-live)',
    status: 'Supports' as const,
    criterion: 'WCAG 4.1.3 — Status Messages',
  },
  {
    feature: 'Form Input Labels (Access Code)',
    status: 'Supports' as const,
    criterion: 'WCAG 1.3.1 — Info and Relationships',
  },
  {
    feature: 'Skip Navigation Link',
    status: 'Supports' as const,
    criterion: 'WCAG 2.4.1 — Bypass Blocks',
  },
  {
    feature: 'ARIA Landmark Regions (main, header, nav)',
    status: 'Supports' as const,
    criterion: 'WCAG 1.3.6 — Identify Purpose',
  },
  {
    feature: 'Dynamic Page Titles per Classroom Session',
    status: 'Supports' as const,
    criterion: 'WCAG 2.4.2 — Page Titled',
  },
  {
    feature: 'Visible Focus Indicators',
    status: 'Supports' as const,
    criterion: 'WCAG 2.4.7 — Focus Visible',
  },
  {
    feature: 'Text Resize up to 200% (no zoom restriction)',
    status: 'Supports' as const,
    criterion: 'WCAG 1.4.4 — Resize Text',
  },
  {
    feature: 'Keyboard Navigation (full Tab/Shift+Tab)',
    status: 'Partial' as const,
    criterion: 'WCAG 2.1.1 — Keyboard',
  },
  {
    feature: 'Color Contrast (text on background)',
    status: 'Partial' as const,
    criterion: 'WCAG 1.4.3 — Contrast (Minimum)',
  },
  {
    feature: 'AI-Generated Image Alt Text in Course Scenes',
    status: 'In Progress' as const,
    criterion: 'WCAG 1.1.1 — Non-text Content',
  },
];

const knownLimitations = [
  {
    title: 'Keyboard Navigation in the CALE Roundtable Canvas',
    description:
      'Some interactive controls within the AI roundtable canvas (e.g., agent avatar controls, whiteboard tools) may not be fully operable via keyboard alone. We are conducting a full keyboard audit and expect to resolve this in a future release.',
  },
  {
    title: 'Color Contrast in Dark Mode',
    description:
      'Certain secondary text elements in the dark-mode CALE interface may not meet the 4.5:1 contrast ratio required by WCAG 1.4.3. A formal color contrast audit using automated tools (WAVE, axe) is scheduled.',
  },
  {
    title: 'Alt Text for AI-Generated Images in Course Scenes',
    description:
      'When AI-generated images are embedded within course scenes, they may not always include descriptive alt text. We are updating the course generation pipeline to require alt text for all generated images.',
  },
];
