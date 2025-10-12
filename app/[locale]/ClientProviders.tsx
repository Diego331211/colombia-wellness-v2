"use client";
import { NextIntlClientProvider } from "next-intl";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import { useEffect } from "react";
import posthog from "posthog-js";
import { ErrorBoundary } from "../../components/ErrorBoundary";


export default function ClientProviders({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !(window as any).__posthogInitialized
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      });
      (window as any).__posthogInitialized = true;
    }
  }, []);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {/* Microsoft Clarity Script */}
      <Script
        id="clarity-script"
        strategy="lazyOnload"
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
      {/* Ejemplo: botón para lanzar error y probar integración */}
      <ErrorBoundary componentName="Layout" propsToLog={{ locale }}>

        {children}
      </ErrorBoundary>
      <Footer />
    </NextIntlClientProvider>
  );
}
