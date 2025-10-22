"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/actions/auth";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const requirements = [
    { label: "8+ characters", test: (p: string) => p.length >= 8 },
    { label: "Uppercase", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Lowercase", test: (p: string) => /[a-z]/.test(p) },
    { label: "Number", test: (p: string) => /[0-9]/.test(p) },
  ];

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});

    const result = await signUpAction(formData);

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
              Start creating
              <br />
              amazing stories
            </h1>
            <p className="text-base text-foreground/70 max-w-md leading-relaxed font-medium">
              Join thousands of storytellers bringing their narratives to life
              with AI.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "5 free stories to get started",
              "No credit card required",
              "Upgrade anytime",
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
                Create account
              </h2>
              <p className="text-sm text-foreground/60 font-medium">
                Get started with your free account
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
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="h-11 bg-card/50 backdrop-blur-sm border-border/40 focus:border-[#8F00FF]/40 transition-colors"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.name[0]}
                  </p>
                )}
              </div>

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
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    className="h-11 pr-10 bg-card/50 backdrop-blur-sm border-border/40 focus:border-[#8F00FF]/40 transition-colors"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {password && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {requirements.map((req, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-1 rounded-full font-semibold transition-colors ${
                          req.test(password)
                            ? "bg-[#8F00FF]/10 text-[#8F00FF]"
                            : "bg-foreground/5 text-foreground/50"
                        }`}
                      >
                        {req.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#8F00FF] hover:bg-[#7A00E0] text-foreground font-semibold transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2" />
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
                  Already have an account?
                </span>
              </div>
            </div>

            <Link href="/sign-in" className="block">
              <Button
                variant="outline"
                className="w-full h-11 font-semibold border-border/40 hover:bg-foreground/5 transition-colors"
                type="button"
              >
                Sign in instead
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-foreground/50 mt-8 font-medium">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-[#8F00FF] hover:underline font-semibold"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#8F00FF] hover:underline font-semibold"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
