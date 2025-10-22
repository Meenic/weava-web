"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/actions/auth";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});

    const result = await signInAction(formData);

    if (result && !result.success) {
      setErrors(result.errors);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex relative">
      {/* Top Fade Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#8F00FF]/20 to-transparent pointer-events-none" />

      {/* Left Side - Minimal Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#8F00FF]/5 to-transparent p-12 flex-col justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group w-fit">
          <Image
            src="/weava_logo.svg"
            alt="Weava"
            width={32}
            height={32}
            className="w-8 h-8 transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold [font-family:var(--font-geist-mono)]">
            Weava
          </span>
        </Link>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold [font-family:var(--font-geist-mono)] leading-[1.1]">
              Welcome back to
              <br />
              your stories
            </h1>
            <p className="text-base text-foreground/70 max-w-md leading-relaxed font-medium">
              Continue crafting dynamic narratives that evolve with every choice
              you make.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Access your story library",
              "AI-powered generation",
              "Seamless collaboration",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#8F00FF]/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#8F00FF]" />
                </div>
                <span className="text-sm font-medium text-foreground/80">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-foreground/50">
          © 2025 Weava. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/weava_logo.svg"
                alt="Weava"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-lg font-bold [font-family:var(--font-geist-mono)]">
                Weava
              </span>
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 [font-family:var(--font-geist-mono)]">
                Welcome back
              </h2>
              <p className="text-sm text-foreground/60 font-medium">
                Sign in to continue your story
              </p>
            </div>

            {errors._form && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  {errors._form[0]}
                </p>
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11 bg-card/50 backdrop-blur-sm border-border/40 focus:border-[#8F00FF]/40 transition-colors"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#8F00FF] hover:text-[#7A00E0] font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-11 pr-10 bg-card/50 backdrop-blur-sm border-border/40 focus:border-[#8F00FF]/40 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.password[0]}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#8F00FF] hover:bg-[#7A00E0] text-foreground font-semibold transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <ArrowRight />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-foreground/50 font-medium">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <Link href="/sign-up" className="block">
              <Button
                variant="outline"
                className="w-full h-11 font-semibold border-border/40 hover:bg-foreground/5 transition-colors"
                type="button"
              >
                Create account
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-1.5 h-1.5 bg-[#8F00FF] rounded-full" />
            <p className="text-xs text-foreground/50 font-medium">
              Protected by industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
