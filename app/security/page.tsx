import { Shield, Lock, Eye, FileCheck, Server, Database, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enterprise-grade security dengan compliance standards tertinggi untuk melindungi data bisnis Anda
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ComplianceBadge
              icon={<Award className="w-12 h-12" />}
              title="SOC 2 Type II"
              status="In Progress"
              description="Security audit ongoing"
            />
            <ComplianceBadge
              icon={<Shield className="w-12 h-12" />}
              title="GDPR Compliant"
              status="Certified"
              description="EU data protection"
            />
            <ComplianceBadge
              icon={<FileCheck className="w-12 h-12" />}
              title="ISO 27001"
              status="Roadmap 2025"
              description="Information security"
            />
            <ComplianceBadge
              icon={<Lock className="w-12 h-12" />}
              title="PCI DSS Level 1"
              status="Midtrans Certified"
              description="Payment security"
            />
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Multi-Layer Security Architecture
            </h2>
            <p className="text-xl text-gray-600">
              Perlindungan berlapis untuk data dan sistem Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SecurityFeature
              icon={<Lock className="w-8 h-8" />}
              title="Encryption at Rest & Transit"
              details={[
                "AES-256 encryption untuk data at rest",
                "TLS 1.3 untuk data in transit",
                "Key rotation otomatis setiap 90 hari",
                "Hardware Security Modules (HSM)"
              ]}
            />
            <SecurityFeature
              icon={<Eye className="w-8 h-8" />}
              title="Access Control & Authentication"
              details={[
                "Row-Level Security (RLS)",
                "Multi-Factor Authentication (MFA)",
                "Single Sign-On (SSO) ready",
                "Role-Based Access Control (RBAC)"
              ]}
            />
            <SecurityFeature
              icon={<FileCheck className="w-8 h-8" />}
              title="Audit & Monitoring"
              details={[
                "Real-time security monitoring",
                "Comprehensive audit logs",
                "Automated threat detection",
                "24/7 security operations center"
              ]}
            />
            <SecurityFeature
              icon={<Database className="w-8 h-8" />}
              title="Data Protection"
              details={[
                "Automatic daily backups",
                "Point-in-time recovery",
                "Geo-redundant storage",
                "Data retention policies"
              ]}
            />
            <SecurityFeature
              icon={<Server className="w-8 h-8" />}
              title="Infrastructure Security"
              details={[
                "AWS/GCP infrastructure",
                "DDoS protection",
                "Web Application Firewall (WAF)",
                "Network isolation & VPC"
              ]}
            />
            <SecurityFeature
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="Compliance & Privacy"
              details={[
                "GDPR compliant",
                "Indonesian Law No. 27/2022",
                "Data Processing Agreement (DPA)",
                "Regular security audits"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Data Residency */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Data Residency & Sovereignty
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Data Centers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Singapore (Primary):</strong> Southeast Asia operations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Jakarta (Coming Soon):</strong> Indonesia-specific data residency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Data sovereignty:</strong> Control where your data resides</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Handling</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Data never leaves your selected region</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Option untuk on-premise deployment (Enterprise)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Compliance with local data protection laws</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Incident Response & Support
            </h2>
            <p className="text-xl text-gray-600">
              Tim security kami siap 24/7 untuk merespons insiden
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">&lt;15min</div>
              <div className="text-gray-600 font-semibold mb-4">Initial Response Time</div>
              <p className="text-gray-600 text-sm">
                Security incidents direspon dalam 15 menit untuk Enterprise plans
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600 font-semibold mb-4">Security Operations</div>
              <p className="text-gray-600 text-sm">
                Monitoring dan response team aktif sepanjang waktu
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-semibold mb-4">Uptime SLA</div>
              <p className="text-gray-600 text-sm">
                Guarantee uptime dengan kompensasi jika tidak tercapai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 md:p-12">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Security Concerns or Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Kami sangat serius terhadap security. Jika Anda menemukan vulnerability atau memiliki pertanyaan security, silakan hubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:security@oasisbipro.com" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                security@oasisbipro.com
              </a>
              <Link href="/legal/privacy" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Privacy Policy
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Responsible disclosure program available. Bug bounty rewards for verified vulnerabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComplianceBadge({ icon, title, status, description }: { icon: React.ReactNode; title: string; status: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-primary-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <div className="text-sm font-semibold text-green-600 mb-2">{status}</div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}

function SecurityFeature({ icon, title, details }: { icon: React.ReactNode; title: string; details: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
