// src/components/JsonLd.tsx
import React from "react";
import { Helmet } from "react-helmet";

const JsonLd: React.FC = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vinay Kushwah",
    url: "https://vinay-kushwah.vercel.app/",
    image: "https://vinay-kushwah.vercel.app/VINAY_LOGO.png",
    sameAs: [
      "https://linkedin.com/in/vinaykushwah017",
      "https://github.com/vinukush017",
      "https://x.com/Vinay__17",
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Open Source",
    },
    description:
      "Vinay Kushwah's portfolio – frontend developer building modern and aesthetic websites with clean UI/UX.",
    email: "mailto:kushwah.vinay89@gmail.com",
    skills: [
      "React",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Framer Motion",
      "MongoDB",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "mailto:kushwah.vinay89@gmail.com",
      contactType: "Customer Support",
      url: "https://vinay-kushwah.vercel.app/#contact",
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vinay-kushwah.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://vinay-kushwah.vercel.app/#projects",
      },
      // Add more if needed
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    headline: "Frequently Asked Questions about Vinay Kushwah",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies do you use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "React, TypeScript, Tailwind, Node.js, and more.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Via the contact section or email at kushwah.vinay89@gmail.com.",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default JsonLd;
