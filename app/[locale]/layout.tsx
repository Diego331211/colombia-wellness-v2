import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COLOMBIA WELLNESS WEEK",
  description: "La Semana Más Importante del Bienestar en Latinoamérica",
  icons: {
    icon: "/favicon.ico",
  },
};

const locales = ["en", "es", "pt"];

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale } = await params;

  // Validar que el locale sea válido
  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    // Import asíncrono de las traducciones
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="relative">
      <body className={dmSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {/* Microsoft Clarity Script */}
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "tokkpa7dnh");
              `,
            }}
          />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
