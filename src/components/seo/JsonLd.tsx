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
      "Full Stack Developer specializing in React.js, Next.js, Node.js, and TypeScript. Building scalable web applications with modern technologies.",
    email: "mailto:kushwah.vinay89@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressCountry: "IN",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Framer Motion",
      "MongoDB",
      "PostgreSQL",
      "Full Stack Development",
      "Web Development",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Framer Motion",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "AWS",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "mailto:kushwah.vinay89@gmail.com",
      contactType: "Professional Inquiry",
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
        item: "https://vinay-kushwah.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://vinay-kushwah.vercel.app/#projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: "https://vinay-kushwah.vercel.app/#about",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Skills",
        item: "https://vinay-kushwah.vercel.app/#skills",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Experience",
        item: "https://vinay-kushwah.vercel.app/#experience",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: "https://vinay-kushwah.vercel.app/#contact",
      },
    ],
  };
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vinay Kushwah Portfolio",
    url: "https://vinay-kushwah.vercel.app/",
    description: "Portfolio website of Vinay Kushwah, Full Stack Developer specializing in React.js, Next.js, Node.js, and TypeScript.",
    author: {
      "@type": "Person",
      name: "Vinay Kushwah",
    },
    publisher: {
      "@type": "Person",
      name: "Vinay Kushwah",
    },
    inLanguage: "en-US",
  };
  
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://vinay-kushwah.vercel.app/#portfolio",
    name: "Vinay Kushwah Portfolio",
    description: "A collection of innovative web applications and platforms built by Vinay Kushwah, showcasing expertise in full-stack development, modern frameworks, and user-centric design.",
    creator: {
      "@type": "Person",
      name: "Vinay Kushwah",
    },
    url: "https://vinay-kushwah.vercel.app/#projects",
    inLanguage: "en-US",
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
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default JsonLd;
