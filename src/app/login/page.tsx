"use client";

import { useState } from "react";
import { login } from "./actions/login";
import { LoginButton } from "./components/LoginButton";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (formData: FormData) => {
    setError("");
    const error = await login(formData);
    error && setError(error);
  };

  return (
    <div className="container flex min-h-dvh items-center justify-center">
      <div className="card card-border w-full max-w-sm">
        <div className="card-header">
          <h2 className="card-title">Iniciar Sesión</h2>
        </div>
        <div className="card-body">
          <form action={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="label-text">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="ejemplo@confortfresh.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label-text">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <LoginButton />
          </form>
        </div>
        {error && (
          <div className="card-alert alert alert-error alert-soft" role="alert">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
      </div>
    </div>
  );
}
