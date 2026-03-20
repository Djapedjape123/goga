import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SEO({ 
  title, 
  description, 
  type = 'website', // 'website' je podrazumevano, ali za pojedinačnu mašinu ćemo slati 'product'
  image = 'https://masine.ai/og-image.jpg', // Podrazumevana slika ako ne pošaljemo drugu
  schema // Ovde ćemo slati onaj JSON kod koji Google obožava
}) {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  // Detektujemo trenutni jezik i generišemo tačan URL
  const currentLang = i18n.language || 'sr';
  const siteUrl = 'https://masine.ai';
  const currentUrl = `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      {/* 1. OSNOVNI TAGOVI */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* 2. HREFLANG (Višejezičnost) - Kaže Google-u na kojim sve jezicima postoji ova stranica */}
      <link rel="alternate" hreflang="sr" href={currentUrl} />
      <link rel="alternate" hreflang="en" href={currentUrl} />
      <link rel="alternate" hreflang="x-default" href={currentUrl} />

      {/* 3. OPEN GRAPH (Za savršeno deljenje na Facebook, LinkedIn, Viber, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Masine.ai" />
      <meta property="og:locale" content={currentLang === 'sr' ? 'sr_RS' : 'en_US'} />

      {/* 4. TWITTER CARDS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 5. STRUCTURED DATA (JSON-LD) - Magija za Google Rich Snippets */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}