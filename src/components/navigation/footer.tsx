import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";

const linkSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Templates", href: "#templates" },
      { label: "Examples", href: "#examples" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Tutorials", href: "#tutorials" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Discord", href: "https://discord.com", icon: FaDiscord },
];

export function Footer() {
  return (
    <div className="flex justify-center px-4 pb-6 pt-12">
      <footer className="bg-background/40 backdrop-blur-md max-w-4xl w-full rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" aria-label="Homepage">
              <Image
                src="/weava_logo.svg"
                alt="Weava Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </Link>
            <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
              Create dynamic, choice-driven narratives that evolve through your
              decisions.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {linkSections.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold [font-family:var(--font-geist-mono)] text-foreground mb-1">
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 mt-2 border-t border-foreground/10">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Weava. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
