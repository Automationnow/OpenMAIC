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
            className="text-sm text-blue-600 hover:underline font-medium"
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
              <a href="https://www.automationnow.org" className="text-blue-600 hover:underline font-medium">
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

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Automation Now, LLC. All rights reserved.
            &nbsp;|&nbsp;
            <a href="https://www.automationnow.org" className="hover:underline text-blue-600">
              automationnow.org
            </a>
            &nbsp;|&nbsp;
            <span>SAM.gov UEI: 1WYM2 &nbsp;|&nbsp; CAGE: KESEQWKHCDJ3</span>
          </p>
          <p className="mt-2 text-xs text-gray-400">
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
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
          {linkText} ↗
        </a>
      )}
    </div>
  );
}
