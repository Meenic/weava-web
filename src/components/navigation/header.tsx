"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [{ label: "Pricing", href: "/pricing" }];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    document.body.style.cssText = `position: fixed; top: -${scrollY}px; width: 100%; overflow: hidden;`;

    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6"
      animate={{ y: isHidden ? "-120%" : "0%", opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <header
        className={`${
          isMenuOpen
            ? "bg-transparent backdrop-blur-none"
            : "bg-background/40 backdrop-blur-md"
        } z-[70] rounded-full h-14 max-w-md w-[calc(100%-2rem)] pointer-events-auto`}
      >
        <div className="flex items-center justify-between h-full px-4">
          <Link
            href="/"
            className="block"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
            aria-label="Homepage"
          >
            <Image
              src="/weava_logo.svg"
              alt="Weava Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger menu button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden hover:!bg-transparent flex flex-col gap-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <motion.div
                className="w-5 h-0.5 bg-foreground"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 5 : 0,
                }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
              />
              <motion.div
                className="w-5 h-0.5 bg-foreground"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -5 : 0,
                }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
              />
            </Button>

            {/* Sign In button */}
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" className="rounded-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full pt-20 overflow-y-auto">
              <div className="flex-1 flex flex-col items-center justify-start gap-10 p-6">
                <nav className="flex flex-col items-center gap-6 w-full">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center px-4 py-2 text-lg font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5 w-full max-w-xs"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <Button
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full px-6 py-3 text-lg w-full max-w-xs"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
