'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SponsorsForm() {
  const t = useTranslations('sponsors');
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeRole, setRepresentativeRole] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sponsorshipType, setSponsorshipType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = {
      companyName,
      representativeName,
      representativeRole,
      contactEmail,
      contactPhone,
      sponsorshipType,
    };

    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar datos');
      }
      const result = await response.json();
      setMessage(result.message || 'Formulario enviado exitosamente.');
      setCompanyName('');
      setRepresentativeName('');
      setRepresentativeRole('');
      setContactEmail('');
      setContactPhone('');
      setSponsorshipType('');
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setMessage('Ocurrió un error al enviar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden py-28 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 text-black min-h-screen"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-300 opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-indigo-200 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
          {t('sponsorsTitle')}
        </h2>
        <p className="text-center mb-12 text-base sm:text-lg lg:text-xl">
          {t('sponsorsSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block mb-1 font-semibold">
              {t('companyNameLabel')}
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('companyNamePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="representativeName" className="block mb-1 font-semibold">
              {t('representativeNameLabel')}
            </label>
            <input
              id="representativeName"
              type="text"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              placeholder={t('representativeNamePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="representativeRole" className="block mb-1 font-semibold">
              {t('representativeRoleLabel')}
            </label>
            <input
              id="representativeRole"
              type="text"
              value={representativeRole}
              onChange={(e) => setRepresentativeRole(e.target.value)}
              placeholder={t('representativeRolePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block mb-1 font-semibold">
              {t('contactEmailLabel')}
            </label>
            <input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder={t('contactEmailPlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="contactPhone" className="block mb-1 font-semibold">
              {t('contactPhoneLabel')}
            </label>
            <input
              id="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder={t('contactPhonePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="sponsorshipType" className="block mb-1 font-semibold">
              {t('sponsorshipTypeLabel')}
            </label>
            <input
              id="sponsorshipType"
              type="text"
              value={sponsorshipType}
              onChange={(e) => setSponsorshipType(e.target.value)}
              placeholder={t('sponsorshipTypePlaceholder')}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 hover:bg-blue-600 text-white border shadow-md shadow-gray-500 border-blue-700 px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition"
            >
              {loading ? 'Enviando...' : t('sponsorsCta')}
            </button>
          </div>
          {message && (
            <div className="text-center mt-4">
              <p className={message.includes('error') ? 'text-red-600' : 'text-green-600'}>{message}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
