import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(4).max(16).nonempty("Ім'я користувача обов'язкове"),
  password: z.string().min(4).max(20).nonempty("Пароль користувача обов'язковий"),
});

export default function AuthorizationForm({ isLogin }: { isLogin: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState([""]);

  const fieldError: FieldErrors<FieldValues> & {
    username: { message: string };
    password: { message: string };
  } = errors as any;

  const onSubmit = async ({ username, password }: any) => {
    setSubmitting(true);

    try {
      const request = await fetch(`http://localhost:3005/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const response = await request.json();

      if (request.status === 201) {
        localStorage.setItem("token", response.access_token);

        location.href = "/";
      } else if (request.status === 404 || request.status === 401 || request.status === 409) {
        setAuthErrorMessage([response.message]);
      } else if (request.status === 400) {
        setAuthErrorMessage(response.message);
      }

      setTimeout(() => setAuthErrorMessage([]), 1000 * 3);
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <p className="text-center font-bold text-2xl">{isLogin ? "Авторизація" : "Реєстрація"}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ім'я користувача</span>
            </label>
            <input
              type="text"
              placeholder="Yilong Ma"
              className={`input input-bordered ${errors.username ? "input-error" : ""}`}
              {...register("username")}
            />
            {errors.username && <p className="text-xs text-error">{fieldError.username.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Пароль</span>
            </label>
            <input
              type="password"
              placeholder="Ваш пароль"
              className={`input input-bordered ${errors.password ? "input-error" : ""}`}
              {...register("password")}
            />
            {errors.password && <p className="text-xs text-error">{fieldError.password.message}</p>}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn ${submitting ? "btn-disabled" : "btn-primary"} hover:btn-warning`}
              disabled={submitting}
            >
              {submitting ? "Авторизація..." : isLogin ? "Увійти" : "Реєстрація"}
            </button>

            <p className="text-[#ED4245] text-right mt-5 select-none">{authErrorMessage.join(", ")}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
