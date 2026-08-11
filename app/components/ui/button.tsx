import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "w-full rounded-xl py-3 font-semibold transition-all duration-300",
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}