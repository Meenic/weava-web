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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Hide header on scroll down, show on scroll up
    if (previous !== undefined && latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isMenuOpen) {
      const scrollY = window.scrollY;
      const body = document.body;

      const originalPosition = body.style.position;
      const originalTop = body.style.top;
      const originalWidth = body.style.width;
      const originalOverflow = body.style.overflow;

      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      body.style.overflow = "hidden";

      body.dataset.scrollY = scrollY.toString();
      body.dataset.originalPosition = originalPosition;
      body.dataset.originalTop = originalTop;
      body.dataset.originalWidth = originalWidth;
      body.dataset.originalOverflow = originalOverflow;
    } else {
      const body = document.body;
      const scrollY = body.dataset.scrollY;

      body.style.position = body.dataset.originalPosition || "";
      body.style.top = body.dataset.originalTop || "";
      body.style.width = body.dataset.originalWidth || "";
      body.style.overflow = body.dataset.originalOverflow || "";

      delete body.dataset.scrollY;
      delete body.dataset.originalPosition;
      delete body.dataset.originalTop;
      delete body.dataset.originalWidth;
      delete body.dataset.originalOverflow;

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      if (typeof window === "undefined") return;

      const body = document.body;
      const scrollY = body.dataset.scrollY;

      if (body.style.position === "fixed") {
        body.style.position = body.dataset.originalPosition || "";
        body.style.top = body.dataset.originalTop || "";
        body.style.width = body.dataset.originalWidth || "";
        body.style.overflow = body.dataset.originalOverflow || "";

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
        }
      }

      delete body.dataset.scrollY;
      delete body.dataset.originalPosition;
      delete body.dataset.originalTop;
      delete body.dataset.originalWidth;
      delete body.dataset.originalOverflow;
    };
  }, [isMenuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
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
          {/* Logo */}
          <Link
            href={"/"}
            className="block"
            onClick={isMenuOpen ? closeMenu : undefined}
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
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Hamburger menu button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden hover:!bg-transparent flex flex-col gap-2"
              onClick={toggleMenu}
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
              <Button size={"sm"} className="rounded-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" onClick={closeMenu}>
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu content */}
            <div className="flex flex-col h-full pt-20 overflow-y-auto">
              <div className="flex-1 flex flex-col items-center justify-start gap-10 p-6">
                {/* Nav links */}
                <nav className="flex flex-col items-center gap-6 w-full">
                  {navItems.map((item) => (
                    <div key={item.label} className="w-full max-w-xs">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="block text-center px-4 py-2 text-lg font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5 w-full"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </nav>

                {/* Sign In button */}
                <div className="w-full max-w-xs">
                  <Button
                    size={"lg"}
                    onClick={closeMenu}
                    className="rounded-full px-6 py-3 text-lg w-full"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
