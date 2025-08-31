"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

/**
 * Flexible CTA button.
 * - Accepts `className` to style per context (e.g., frosted vs glassy).
 * - Pass any normal button props (`onClick`, `disabled`, etc.).
 */
export function ActionButton({
  label,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        "text-sm font-medium rounded-md",
        "transition-colors duration-200",
        className
      )}
    >
      {label}
    </button>
  );
}
