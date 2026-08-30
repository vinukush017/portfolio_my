export const SECTION_LINKS = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

export type NavigationSectionId = (typeof SECTION_LINKS)[number]["id"];

export type SectionId = NavigationSectionId | "home";

const HEADER_OFFSET = 88;

export const scrollToSection = (sectionId: SectionId) => {
  const section = document.getElementById(sectionId);

  if (!section) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const top =
    section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  const nextHash = sectionId === "home" ? "#" : `#${sectionId}`;

  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
};
