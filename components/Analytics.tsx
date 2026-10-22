import Script from "next/script";

// Google Analytics 4, only when NEXT_PUBLIC_GA_ID is set. Consent Mode defaults
// to "denied" (cookieless pings only) until a consent banner is added.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
