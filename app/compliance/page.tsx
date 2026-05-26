import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Compliance & About | Automation Now, LLC — CALE Platform',
  description:
    'Automation Now, LLC is a SAM.gov-registered vendor with an active CAGE Code, delivering AI-powered learning solutions for federal agencies, corporations, and educational institutions.',
};

export default function CompliancePage() {
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
            className="text-sm text-blue-600 underline font-medium"
          >
            ← Back to Platform
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            Compliance &amp; About
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Automation Now, LLC
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            A federally registered, woman- and minority-owned small business delivering AI-powered
            education and automation solutions to government agencies, corporations, and educational
            institutions. <em>&quot;The future is Here.&quot;</em>
          </p>
        </div>

        {/* Federal Registration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Federal Registration &amp; Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CredentialCard
              label="SAM.gov Registration"
              value="Active"
              detail="System for Award Management — U.S. federal government vendor registry"
              badge="Active"
              badgeColor="green"
            />
            <CredentialCard
              label="Unique Entity Identifier (UEI)"
              value="1WYM2"
              detail="Assigned by SAM.gov for federal procurement identification"
            />
            <CredentialCard
              label="CAGE Code"
              value="KESEQWKHCDJ3"
              detail="Commercial and Government Entity Code — assigned by the Defense Logistics Agency (DLA)"
            />
            <CredentialCard
              label="Business Type"
              value="Limited Liability Company (LLC)"
              detail="Registered in the State of North Carolina"
            />
          </div>
        </section>

        {/* Platform Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Platform Security &amp; Infrastructure
          </h2>
          <p className="text-gray-600 mb-6">
            The CALE (Collaborative AI Learning Environment) platform is hosted on enterprise-grade
            cloud infrastructure designed for reliability, security, and compliance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfraCard
              title="Hosting Provider"
              value="Vercel Inc."
              detail="SOC 2 Type II certified cloud platform. Enterprise SLA with 99.99% uptime guarantee."
              link="https://vercel.com/security"
              linkText="Vercel Security"
            />
            <InfraCard
              title="Data Center"
              value="AWS us-east-1"
              detail="Washington D.C. / Northern Virginia region. Data processed within the United States."
            />
            <InfraCard
              title="SSL / TLS"
              value="TLS 1.3"
              detail="All data in transit is encrypted using TLS 1.3. Certificates auto-renewed via Let's Encrypt."
            />
            <InfraCard
              title="AI Provider — Content"
              value="OpenAI"
              detail="GPT-4 class models via OpenAI API for course content generation. Data is not used to train OpenAI models under the API data usage policy."
              link="https://openai.com/policies/api-data-usage-policies"
              linkText="OpenAI API Policy"
            />
            <InfraCard
              title="AI Provider — Voice (TTS)"
              value="Mistral AI"
              detail="Mistral AI API powers Kim's voice narration (text-to-speech) for lecture playback. Audio is generated on-demand and not stored. Data is not used to train Mistral models under the API usage policy."
              link="https://mistral.ai/terms/"
              linkText="Mistral AI Terms"
            />
            <InfraCard
              title="Authentication"
              value="Access Code Protected"
              detail="Platform access is controlled via unique access codes. No personal data is collected without consent."
            />
            <InfraCard
              title="GDPR / FERPA"
              value="Compliant Design"
              detail="No student PII is stored. Session data is ephemeral and not linked to identifiable individuals."
            />
          </div>
        </section>

        {/* Incident Response & Business Continuity */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Incident Response &amp; Business Continuity
          </h2>
          <p className="text-gray-600 mb-6">
            Automation Now, LLC maintains a formal Incident Response Plan aligned with{' '}
            <strong>NIST SP 800-61 Rev. 2</strong> (Computer Security Incident Handling Guide).
            All security events are triaged, contained, and remediated through a structured
            four-phase process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-xl p-5 bg-white">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
                4-Phase Response Process
              </div>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div><strong>Preparation</strong> — Security controls, access management, and monitoring baselines established</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div><strong>Detection &amp; Analysis</strong> — Automated alerts and manual review to identify and classify incidents</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div><strong>Containment, Eradication &amp; Recovery</strong> — Isolate affected systems, remove threat, restore services</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div><strong>Post-Incident Activity</strong> — Lessons learned, documentation, and control improvements</div>
                </li>
              </ol>
            </div>
            <div className="border border-gray-200 rounded-xl p-5 bg-white">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
                Notification &amp; Continuity Commitments
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">▸</span>
                  <span><strong>24-Hour Notification</strong> — Affected parties notified within 24 hours of a confirmed security incident</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">▸</span>
                  <span><strong>RTO Target</strong> — Recovery Time Objective of 4 hours for critical platform services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">▸</span>
                  <span><strong>Vercel Infrastructure</strong> — Leverages Vercel&apos;s built-in redundancy and global edge network for business continuity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">▸</span>
                  <span><strong>Reference Standard</strong> — NIST SP 800-61 Rev. 2 Computer Security Incident Handling Guide</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Retention & Deletion Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Data Retention &amp; Deletion Policy
          </h2>
          <p className="text-gray-600 mb-6">
            The CALE platform is designed with a <strong>zero-retention architecture</strong>.
            No personally identifiable information (PII) is collected, stored, or retained from
            learner sessions. This design ensures compliance with{' '}
            <strong>FERPA</strong> (Family Educational Rights and Privacy Act) and{' '}
            <strong>GDPR</strong> (General Data Protection Regulation) by default.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfraCard
              title="Session Data"
              value="Ephemeral Only"
              detail="All learner session data is held in memory for the duration of the session only. No session data is written to persistent storage or databases."
            />
            <InfraCard
              title="PII Storage"
              value="Zero PII Retained"
              detail="No student names, email addresses, or identifiers are collected. Access codes are non-identifiable tokens that cannot be linked to individuals."
            />
            <InfraCard
              title="AI Conversation Logs"
              value="Not Stored"
              detail="AI-generated responses and learner inputs are processed in real-time and not logged, stored, or used for model training. OpenAI and Mistral AI API policies prohibit training on API data."
            />
            <InfraCard
              title="FERPA Compliance"
              value="By Design"
              detail="Because no education records are created or stored, CALE does not generate FERPA-covered records. Institutional partners retain full control of their learner data."
            />
            <InfraCard
              title="GDPR Compliance"
              value="By Design"
              detail="No personal data is processed within the meaning of GDPR Article 4. The zero-retention design eliminates data subject rights obligations related to platform usage."
            />
            <InfraCard
              title="Data Deletion"
              value="Automatic"
              detail="Upon session termination, all in-memory session context is automatically cleared. No manual deletion requests are required as no persistent data is created."
            />
          </div>
        </section>

        {/* NIST Cybersecurity Framework Alignment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            NIST Cybersecurity Framework (CSF) Alignment
          </h2>
          <p className="text-gray-600 mb-6">
            The CALE platform security posture is mapped to the{' '}
            <strong>NIST Cybersecurity Framework (CSF) 2.0</strong> five core functions.
            This alignment demonstrates our commitment to a structured, risk-based approach
            to cybersecurity consistent with federal standards.
          </p>
          <div className="space-y-4">
            <NistFunctionRow
              function="Identify"
              color="purple"
              description="Asset Management &amp; Risk Assessment"
              controls={[
                'Platform asset inventory maintained (Vercel, OpenAI API, Mistral AI API, GitHub)',
                'Third-party vendor security assessments conducted for all AI providers',
                'Annual risk assessment aligned with NIST SP 800-30',
              ]}
            />
            <NistFunctionRow
              function="Protect"
              color="blue"
              description="Access Control &amp; Data Security"
              controls={[
                'Access code authentication prevents unauthorized platform access',
                'TLS 1.3 encryption for all data in transit',
                'Zero-retention architecture eliminates data-at-rest exposure',
                'Vercel SOC 2 Type II infrastructure provides physical and logical access controls',
              ]}
            />
            <NistFunctionRow
              function="Detect"
              color="yellow"
              description="Anomaly &amp; Event Monitoring"
              controls={[
                'Vercel platform monitoring and alerting for uptime and performance anomalies',
                'OpenAI and Mistral AI API usage monitoring for abuse detection',
                'Access code usage patterns reviewed for anomalous activity',
              ]}
            />
            <NistFunctionRow
              function="Respond"
              color="orange"
              description="Incident Response Execution"
              controls={[
                'Formal Incident Response Plan per NIST SP 800-61 Rev. 2',
                '24-hour affected party notification commitment',
                'Documented containment and eradication procedures',
                'Post-incident review and lessons learned process',
              ]}
            />
            <NistFunctionRow
              function="Recover"
              color="green"
              description="Recovery Planning &amp; Improvements"
              controls={[
                '4-hour Recovery Time Objective (RTO) for critical services',
                'Vercel global edge network provides automatic failover and redundancy',
                'Post-incident improvement cycle integrated into quarterly security reviews',
              ]}
            />
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Reference: NIST Cybersecurity Framework 2.0 — National Institute of Standards and Technology (NIST), U.S. Department of Commerce.{' '}
            <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
              nist.gov/cyberframework ↗
            </a>
          </p>
        </section>

        {/* About the Platform */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            About the CALE Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is CALE?</h3>
              <p className="text-gray-600 leading-relaxed">
                CALE (Collaborative AI Learning Environment) is a proprietary AI-powered interactive
                learning platform developed by Automation Now, LLC. It transforms static course
                content into dynamic, multi-agent learning experiences where AI agents take on
                distinct roles — Analyst, Architect, Skeptic, Facilitator — to guide learners
                through real-world automation scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Who is it for?</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">▸</span>
                  <span><strong>Federal Agencies</strong> — AI literacy and automation readiness training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">▸</span>
                  <span><strong>Corporations</strong> — RPA, AI, and process automation workforce upskilling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">▸</span>
                  <span><strong>Colleges &amp; Universities</strong> — Technology and business curriculum integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">▸</span>
                  <span><strong>Individuals</strong> — Self-paced professional development in automation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Contact &amp; Procurement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">General Inquiries</h3>
              <p className="text-gray-600 text-sm mb-2">For course delivery, licensing, and partnership inquiries:</p>
              <a href="https://www.automationnow.org" className="text-blue-600 underline font-medium">
                www.automationnow.org
              </a>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Federal Procurement</h3>
              <p className="text-gray-600 text-sm mb-2">
                Automation Now, LLC is registered in SAM.gov and eligible for federal contract awards.
                Reference our CAGE Code and UEI for procurement documentation.
              </p>
              <div className="text-sm font-mono text-blue-800 space-y-1">
                <div>CAGE: <strong>KESEQWKHCDJ3</strong></div>
                <div>UEI: <strong>1WYM2</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility & VPAT Section */}
        <section className="mb-12" aria-labelledby="a11y-section-heading">
          <h2
            id="a11y-section-heading"
            className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200"
          >
            Accessibility &amp; VPAT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VPAT Download Card */}
            <div className="border border-purple-200 rounded-xl p-6 bg-purple-50">
              <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-2">
                Accessibility Conformance Report
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                VPAT 2.5 &mdash; Section 508
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our Voluntary Product Accessibility Template (VPAT) documents CALE platform
                conformance with WCAG 2.1 Level AA and Section 508 of the Rehabilitation Act.
                Required by federal agencies under FAR 39.2 for ICT procurement.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/Automation_Now_LLC_CALE_VPAT_ACR.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors"
                  aria-label="Download the CALE Platform VPAT PDF document"
                >
                  &#8595; Download VPAT (PDF)
                </a>
                <Link
                  href="/accessibility"
                  className="inline-flex items-center gap-2 border border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  aria-label="View the full Accessibility Statement page"
                >
                  Accessibility Statement &rarr;
                </Link>
              </div>
            </div>
            {/* Standards Reference Card */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
                Standards &amp; References
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Federal Accessibility Standards
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <a href="https://www.section508.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Section 508 &mdash; Rehabilitation Act &#8599;
                  </a>
                </li>
                <li>
                  <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    WCAG 2.1 Level AA (W3C) &#8599;
                  </a>
                </li>
                <li>
                  <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    ADA Title III &mdash; 2024 Web Rule &#8599;
                  </a>
                </li>
                <li>
                  <a href="https://www.acquisition.gov/far/39.201" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    FAR 39.2 &mdash; ICT Accessibility &#8599;
                  </a>
                </li>
                <li>
                  <a href="https://www.access-board.gov/ict/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    U.S. Access Board ICT Standards &#8599;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Automation Now, LLC. All rights reserved.
            &nbsp;|&nbsp;
            <a href="https://www.automationnow.org" className="underline text-blue-700">
              automationnow.org
            </a>
            &nbsp;|&nbsp;
            <span>SAM.gov UEI: 1WYM2 &nbsp;|&nbsp; CAGE: KESEQWKHCDJ3</span>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Hosted on Vercel (SOC 2 Type II) &nbsp;·&nbsp; Content AI: OpenAI &nbsp;·&nbsp; Voice AI: Mistral AI &nbsp;·&nbsp;
            Platform domain: learn.automationnow.org
          </p>
        </footer>
      </div>
    </main>
  );
}

function CredentialCard({
  label,
  value,
  detail,
  badge,
  badgeColor,
}: {
  label: string;
  value: string;
  detail: string;
  badge?: string;
  badgeColor?: 'green' | 'blue';
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white">
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl font-bold text-gray-900 font-mono">{value}</span>
        {badge && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              badgeColor === 'green'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">{detail}</p>
    </div>
  );
}

function InfraCard({
  title,
  value,
  detail,
  link,
  linkText,
}: {
  title: string;
  value: string;
  detail: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white">
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{title}</div>
      <div className="text-base font-bold text-gray-900 mb-2">{value}</div>
      <p className="text-sm text-gray-500 mb-2">{detail}</p>
      {link && linkText && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">
          {linkText} ↗
        </a>
      )}
    </div>
  );
}

function NistFunctionRow({
  function: fn,
  color,
  description,
  controls,
}: {
  function: string;
  color: 'purple' | 'blue' | 'yellow' | 'orange' | 'green';
  description: string;
  controls: string[];
}) {
  const colorMap = {
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    green: 'bg-green-100 text-green-800 border-green-200',
  };
  const dotMap = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
  };
  return (
    <div className={`border rounded-xl p-5 ${colorMap[color]}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`w-3 h-3 rounded-full mt-1.5 ${dotMap[color]}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-base font-bold">{fn}</span>
            <span className="text-sm font-semibold">— {description}</span>
          </div>
          <ul className="space-y-1">
            {controls.map((control, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="mt-1 opacity-60">·</span>
                <span dangerouslySetInnerHTML={{ __html: control }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
