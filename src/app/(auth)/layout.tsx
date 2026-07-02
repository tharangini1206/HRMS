import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      {children}
    </div>
  );
}