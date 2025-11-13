"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
  AnimatePresence, // <-- 1. Import AnimatePresence
} from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { RemoveScroll } from "react-remove-scroll"; // <-- 2. Import for scroll lock

// --- CONSTANTS ---

const NAV_ITEMS = [{ label: "Pricing", href: "/pricing" }] as const;
const SCROLL_THRESHOLD = 150;
const HEADER_HEIGHT = 56; // h-14 = 3.5rem = 56px

// --- CUSTOM HOOKS ---

/**
 * Hook to manage header visibility based on scroll direction.
 */
function useHeaderVisibility(threshold = SCROLL_THRESHOLD) {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (
      previous !== undefined &&
      latest > previous &&
      latest > threshold
    ) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return isHidden;
}

/**
 * Hook to handle side effects for closing the mobile menu.
 * (Closes on 'Escape' key and on window resize to desktop).
 */
function useMenuEvents(isOpen: boolean, closeMenu: () => void) {
  // Close menu on desktop resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) { // 768px is md breakpoint
        closeMenu();
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  // Close menu on escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);
}

// --- MAIN HEADER COMPONENT ---

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHidden = useHeaderVisibility(SCROLL_THRESHOLD);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Use the custom hook for all menu-related side effects
  useMenuEvents(isMenuOpen, closeMenu);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-70 flex justify-center px-6"
        style={{ marginTop: `${HEADER_HEIGHT / 4}px` }}
        animate={{
          y: isHidden ? "-120%" : "0%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <header
          className={cn(
            "rounded-full w-full max-w-64 sm:max-w-md transition-colors duration-300",
            isMenuOpen
              ? "bg-transparent backdrop-blur-none"
              : "bg-background/40 backdrop-blur-md"
          )}
          style={{ height: `${HEADER_HEIGHT}px` }}
        >
          <div className="flex items-center justify-between h-full px-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={isMenuOpen ? closeMenu : undefined}
              aria-label="Weava Homepage"
            >
              <Image
                src="/weava-logo.svg"
                alt="Weava"
                width={617.31}
                height={274.97}
                className="w-8 h-8"
                priority
              />
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop navigation */}
              <nav
                className="hidden md:flex items-center"
                aria-label="Main navigation"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu toggle */}
              <MenuToggle isOpen={isMenuOpen} onToggle={toggleMenu} />

              {/* Desktop Sign In button */}
              <div className="hidden md:flex">
                <Button size="sm" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENTS ---

/**
 * Animated hamburger button component.
 */
interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="md:hidden hover:bg-transparent flex flex-col gap-2 h-10 w-10"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <motion.span
        className="w-5 h-0.5 bg-foreground block"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
      <motion.span
        className="w-5 h-0.5 bg-foreground block"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
    </Button>
  );
}

/**
 * Mobile menu overlay and content.
 */
const mobileMenuContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const mobileMenuItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

interface MobileMenuProps {
  onClose: () => void;
}

function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-60 md:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Content wrapper for fade-in and scroll lock */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <RemoveScroll>
          <div className="flex flex-col h-full pt-20 overflow-y-auto">
            <motion.div
              className="flex-1 flex flex-col items-center justify-start gap-10 p-6"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Mobile navigation */}
              <nav
                className="flex flex-col items-center gap-6 w-full"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={mobileMenuItemVariants}
                    className="w-full max-w-xs"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-center px-4 py-2 text-lg font-medium text-foreground/80 hover:text-foreground rounded-full transition-colors duration-200 hover:bg-foreground/5"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Sign In button */}
              <motion.div
                variants={mobileMenuItemVariants}
                className="w-full max-w-xs"
              >
                <Button
                  size="lg"
                  onClick={onClose}
                  className="w-full"
                  asChild
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </RemoveScroll>
      </motion.div>
    </div>
  );
}