"use client";

import Image from "next/image";
import bgImage from "@/assets/images/hrms-bg1.jpeg";
import logo from "@/assets/images/hrms-logo1.png";
import { useState, useEffect, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const glowLayers = [
  "pointer-events-none absolute -left-[780px] top-1/2 -translate-y-1/2 h-[2200px] w-[2200px] rounded-full bg-[#ffe7eb] opacity-15 blur-[120px]",
  "pointer-events-none absolute top-[-300px] left-[180px] h-[760px] w-[760px] rounded-full bg-[#fff2f5] opacity-15 blur-[120px]",
  "pointer-events-none absolute right-[20px] top-[220px] h-[600px] w-[600px] rounded-full bg-[#fff4ef] opacity-12 blur-[120px]",
  "pointer-events-none absolute bottom-[-520px] right-[-80px] h-[760px] w-[760px] rounded-full bg-[#fff4e7] opacity-10 blur-[120px]",
];

const featureCards = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description: "Sub-second response times across all modules",
    iconClasses: "bg-[#FFE8E5] text-[#EF4B3C]",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "SOC 2 certified with end-to-end encryption",
    iconClasses: "bg-amber-100 text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time insights and predictive reporting",
    iconClasses: "bg-emerald-100 text-emerald-600",
  },
] as const;

const authButtons: { label: string; icon: ReactNode }[] = [
  {
    label: "Single Sign-On (SSO)",
    icon: (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-900">
        <ShieldCheck className="h-4 w-4" />
      </span>
    ),
  },
  {
    label: "Continue with Google",
    icon: <FcGoogle className="h-5 w-5" />,
  },
  {
    label: "Continue with GitHub",
    icon: <FaGithub className="h-5 w-5" />,
  },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Respect user motion preferences
    try {
      const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) {
        setMounted(true);
        return;
      }
    } catch (e) {
      // ignore and animate by default
    }

    // small delay for smoother perceived motion when navigating
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // ignore
    }
  }, [mounted]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (_data: LoginForm) => {
    // TODO: connect to authentication API
  };

  return (
    <main
      className={`relative min-h-screen bg-[#FFF8F7] flex items-center justify-center px-6 py-6 lg:py-8 transition-transform duration-700 ease-out ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {glowLayers.map((classes, index) => (
          <div key={index} className={classes} />
        ))}
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#FFF1F5] via-[#FFF8FA] to-transparent" />
      </div>
      <div className="relative z-20 mx-auto w-full max-w-[980px] overflow-hidden rounded-[22px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.10)] ring-1 ring-slate-100/40 border border-[#F4F4F4]">
        <div className="relative z-10 grid h-full min-h-[680px] grid-cols-1 items-stretch lg:grid-cols-[1.02fr_0.98fr]">
            <section className="relative h-full min-h-full overflow-hidden border-b border-slate-200/70 bg-[#FFF1F5] lg:border-b-0 lg:border-r lg:border-r-slate-200/70">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,190,210,0.40),transparent_72%)]" />
                <Image
                  src={bgImage}
                  alt="HRMS watermark"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-contain object-center opacity-[0.18] scale-[1.25] blur-[0.5px]"
                  priority
                />
              </div>
            <div className="relative z-10 flex flex-col px-5 py-4">
              <div className="mb-1">
                <Image
                  src={logo}
                  alt="CofomoTech Logo"
                  priority
                  className="h-34 w-auto object-contain"
                />
              </div>

              <div className="mt-1">
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#EF4B3C]">
                  Enterprise Platform
                </p>
                <h1 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Power your business
                  <br />
                  with <span className="text-[#EF4B3C]">intelligent tech</span>
                </h1>
                <p className="mt-3 max-w-[430px] text-base leading-7 text-slate-600">
  A unified platform for modern enterprises — streamline workflows,
  collaborate in real-time, and scale with confidence.
</p>
              </div>

              <div className="mt-5 space-y-3">
                {featureCards.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-center gap-3 rounded-2xl border-1 border-black/20 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.iconClasses}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h2 className="text-[15px] font-semibold text-slate-900">{feature.title}</h2>
                        <p className="text-[13px] text-slate-500">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-3">
            <div className="mx-auto max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#EF4B3C]">
                Secure Access
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Welcome back
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Sign in to your HRMS account
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-3 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-[#EF4B3C] focus:ring-4 focus:ring-[#FDE9E7]"
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="mb-3 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-[#EF4B3C] focus:ring-4 focus:ring-[#FDE9E7]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-2 text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      className="h-4 w-4 rounded border-slate-300 text-[#EF4B3C] focus:ring-[#EF4B3C]"
                    />
                    Remember me
                  </label>
                  <button type="button" className="text-sm font-semibold text-[#EF4B3C] transition hover:text-[#D84735]">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#EF4B3C] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D84735] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>

                <div className="relative py-3">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
                  <p className="relative mx-auto w-fit bg-white px-4 text-sm text-slate-500">
                    or continue with
                  </p>
                </div>

                {authButtons.map((button) => (
                  <button
                    key={button.label}
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {button.icon}
                    {button.label}
                  </button>
                ))}
              </form>

              <p className="mt-4 text-center text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <button type="button" className="font-semibold text-[#EF4B3C] transition hover:text-[#D84735]">
                  Contact your administrator
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
