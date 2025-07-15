"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={pending}
      {...props}
    >
      {pending ? <span className="loading loading-dots"></span> : children}
    </button>
  );
}
