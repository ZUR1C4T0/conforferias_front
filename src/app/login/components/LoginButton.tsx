import { useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-block">
      {pending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          Iniciar Sesión{" "}
          <span className="icon-[tabler--login-2] size-4.5 shrink-0"></span>
        </>
      )}
    </button>
  );
}
