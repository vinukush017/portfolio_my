// components/SocialBar.tsx
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const socialLinks = [
  {
    icon: <FaGithub />,
    link: "https://github.com/your-github",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    link: "https://linkedin.com/in/vinaykushwah017",
    label: "LinkedIn",
  },
//   {
//     icon: <FaInstagram />,
//     link: "https://instagram.com/your-instagram",
//     label: "Instagram",
//   },
];

const contactLinks = [
  {
    icon: <MdPhone />,
    link: "tel:+918871797891",
    label: "Phone",
  },
  {
    icon: <MdEmail />,
    link: "mailto:vinay.kushwah89@gmail.com",
    label: "Email",
  }
];

const SocialBar = () => {
  return (
    <div className="fixed bottom-0 left-6 z-50 hidden md:flex flex-col items-center gap-4 text-white-500">
      {/* Contact Icons */}
      {contactLinks.map((item, index) => (
        <a
          key={index}
          href={item.link}
          title={item.label}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:-translate-y-1"
        >
          {React.cloneElement(item.icon, { size: 20 })}
        </a>
      ))}

      {/* Social Icons */}
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          title={item.label}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:-translate-y-1"
        >
          {React.cloneElement(item.icon, { size: 18 })}
        </a>
      ))}

      {/* Divider */}
      {/* <div className="w-px h-10 bg-gray-400" /> */}

      {/* Bottom Line */}
      <div className="w-px h-20 bg-white mt-2" />
    </div>
  );
};

export default SocialBar;
