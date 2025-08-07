// src/components/JsonLd.tsx
import React from "react";
import { Helmet } from "react-helmet";

const JsonLd: React.FC = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vinay Kushwah",
    "url": "https://vinay-kushwah.vercel.app/",
    "image": "https://vinay-kushwah.vercel.app/VINAY_LOGO.png",
    "sameAs": [
      "https://linkedin.com/in/vinaykushwah017",
      "https://github.com/vinaykushwah017",
      "https://x.com/Vinay__17"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance / Open Source"
    },
    "description":
      "Vinay Kushwah's portfolio – frontend developer building modern and aesthetic websites with clean UI/UX.",
    "email": "mailto:kushwah.vinay89@gmail.com"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

export default JsonLd;
