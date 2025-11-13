import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils/cn";

// --- CONSTANTS ---
// (These are unchanged)

const LINK_SECTIONS = [
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
] as const;

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Discord", href: "https://discord.com", icon: FaDiscord },
] as const;

// --- TYPE HELPER ---

// Infer the type from the constant for strong typing in the component
type LinkSection = (typeof LINK_SECTIONS)[number];

// --- MAIN COMPONENT (UPDATED) ---

export function Footer() {
  return (
    <footer className="w-full px-6 py-12">
      {/* This new wrapper centers your content within the full-width footer.
        It has the 'max-w-5xl' and 'mx-auto' classes removed from the <footer_ tag.
      */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Top section: Brand info and navigation links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <BrandInfo />
          {LINK_SECTIONS.map((section) => (
            <FooterLinkColumn key={section.title} section={section} />
          ))}
        </div>

        {/* Bottom section: Copyright and social links */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6 mt-10 pt-8">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Weava. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENTS ---
// (These are unchanged)

/**
 * Renders the brand logo and tagline.
 */
function BrandInfo() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <Link href="/" aria-label="Weava Homepage">
        <Image
          src="/weava-logo.svg"
          alt="Weava"
          width={617.31}
          height={274.97}
          className="w-8 h-8"
          // 'priority' prop removed
        />
      </Link>
      <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
        Create dynamic, choice-driven narratives that evolve through your
        decisions.
      </p>
    </div>
  );
}

/**
 * Renders a single column of footer links.
 */
function FooterLinkColumn({ section }: { section: LinkSection }) {
  const { title, links } = section;

  return (
    <nav className="flex flex-col gap-4" aria-label={title}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Renders the list of social media icon links.
 */
function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full",
            "text-foreground/60 hover:text-foreground",
            "transition-colors duration-200"
          )}
          aria-label={`Visit our ${label} page`}
        >
          <Icon size={18} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
