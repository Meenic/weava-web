"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/actions/auth";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});

    const result = await signInAction(formData);

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#8F00FF] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

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
            Welcome back to
            <br />
            your stories
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            Continue crafting dynamic narratives that evolve with every choice
            you make.
          </p>
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
              <h2 className="text-2xl font-bold mb-1">Sign in</h2>
              <p className="text-sm text-foreground/60">
                Enter your credentials to access your account
              </p>
            </div>

            {errors._form && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors._form[0]}</p>
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#8F00FF] hover:underline font-medium"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="h-10 pr-9"
                    disabled={isLoading}
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
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-[#8F00FF] hover:bg-[#7A00E0] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-foreground/50">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <Link href="/sign-up" className="block">
              <Button
                variant="outline"
                className="w-full h-10 font-medium"
                type="button"
              >
                Create account
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-foreground/50 mt-8">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}
