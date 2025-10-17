"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/actions/auth";
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

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

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8F00FF] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <Link href="/" className="relative z-10">
          <Image
            src="/weava_logo.svg"
            alt="Weava"
            width={40}
            height={40}
            className="w-10 h-10 brightness-0 invert"
          />
        </Link>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start creating
            <br />
            amazing stories
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Join thousands of storytellers bringing their narratives to life
            with AI.
          </p>
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">5 free stories to get started</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Upgrade anytime</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2025 Weava. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/">
              <Image
                src="/weava_logo.svg"
                alt="Weava"
                width={36}
                height={36}
                className="w-9 h-9"
              />
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Create account</h2>
              <p className="text-sm text-foreground/60">
                Get started with your free account today
              </p>
            </div>

            {errors._form && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors._form[0]}</p>
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="h-10"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name[0]}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-10"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email[0]}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="h-10 pr-9"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
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
                  <p className="text-xs text-destructive">
                    {errors.password[0]}
                  </p>
                )}

                {password && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {requirements.map((req, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                          req.test(password)
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
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
                className="w-full h-10 bg-[#8F00FF] hover:bg-[#7A00E0] text-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
                {!isLoading && <ArrowRight />}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-foreground/50">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link href="/sign-in" className="block">
              <Button
                variant="outline"
                className="w-full h-10 font-medium"
                type="button"
              >
                Sign in instead
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-foreground/50 mt-8">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-[#8F00FF] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#8F00FF] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
