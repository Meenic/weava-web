import Link from "next/link";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Templates", href: "#templates" },
  { label: "Examples", href: "#examples" },
];

const resourceLinks = [
  { label: "Documentation", href: "#docs" },
  { label: "API Reference", href: "#api" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Blog", href: "#blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

const socialItems = [
  { label: "Twitter", href: "https://twitter.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Discord", href: "https://discord.com", icon: FaDiscord },
];

const allLinkSections = [
  { title: "Product", links: productLinks },
  { title: "Resources", links: resourceLinks },
  { title: "Legal", links: legalLinks },
];

export function Footer() {
  return (
    <div className="flex justify-center">
      <footer className="bg-background/40 backdrop-blur-md rounded-2xl max-w-4xl w-[calc(100%-2rem)] p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href={"/"}
              className="block w-8 h-8 bg-[#8F00FF] rounded-full"
              aria-label="Homepage"
            />
            <p className="text-sm text-foreground/70 max-w-md">
              Create dynamic, choice-driven narratives that evolve through your
              decisions.
            </p>
            <div className="flex items-center gap-2 mt-2">
              {socialItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5"
                      aria-label={item.label}
                    >
                      <IconComponent size={18} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {allLinkSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold [font-family:var(--font-geist-mono)] text-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-3 border-t border-foreground/10">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Weava. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
