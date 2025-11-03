import * as React from "react";
const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClass =
      variant === "destructive"
        ? "bg-red-600 text-white hover:bg-red-700"
        : variant === "outline"
        ? "border border-gray-300 text-gray-800 hover:bg-gray-100"
        : variant === "ghost"
        ? "text-gray-600 hover:bg-gray-50"
        : "bg-blue-600 text-white hover:bg-blue-700";

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-all",
          variantClass,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

