import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  from: z.string().nonempty("Пункт відправки обов'язковий"),
  to: z.string().nonempty("Пункт призначення обов'язковий"),
  weight: z
    .number()
    .min(0.1, "Вага вантажу повинна бути більшою за 0.1")
    .max(100, "Вага вантажу повинна бути не більшою за 100"),
  fullName: z.string().nonempty("Контактна особа обов'язкова"),
  phone: z.string().nonempty("Номер телефону обов'язковий"),
});

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState([""]);
  const [isSended, setIsSended] = useState(false);

  const fieldError: FieldErrors<FieldValues> & {
    from: { message: string };
    to: { message: string };
    weight: { message: string };
    fullName: { message: string };
    phone: { message: string };
  } = errors as any;

  const onSubmit = async ({ from, to, weight, fullName, phone }: any) => {
    setSubmitting(true);

    try {
      const request = await fetch("http://localhost:3005/user/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, weight, fullName, phone }),
      });

      const response = await request.json();

      if (request.status === 400) {
        setSubmitErrorText(response.message);
      } else {
        setSubmitErrorText([]);
        setIsSended(true);

        setTimeout(() => setIsSended(false), 1000 * 5);

        reset();
      }
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Пункт відправки</span>
            </label>
            <input
              type="text"
              placeholder="м. Київ"
              className={`input input-bordered ${errors.from ? "input-error" : ""}`}
              {...register("from")}
            />
            {errors.from && <p className="text-xs text-error">{fieldError.from.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Пункт призначення</span>
            </label>
            <input
              type="text"
              placeholder="м. Маріуполь"
              className={`input input-bordered ${errors.to ? "input-error" : ""}`}
              {...register("to")}
            />
            {errors.to && <p className="text-xs text-error">{fieldError.to.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Вага вантажу (тонн)</span>
            </label>
            <input
              type="number"
              placeholder="50"
              className={`input input-bordered ${errors.weight ? "input-error" : ""}`}
              {...register("weight", { valueAsNumber: true })}
            />
            {errors.weight && <p className="text-xs text-error">{fieldError.weight.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Контактна особа</span>
            </label>
            <input
              type="text"
              placeholder="Звенигора Олексій Юрійович"
              className={`input input-bordered ${errors.fullName ? "input-error" : ""}`}
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-xs text-error">{fieldError.fullName.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Номер телефону</span>
            </label>
            <input
              type="tel"
              placeholder="+38 (050) 180 40 50"
              className={`input input-bordered ${errors.phone ? "input-error" : ""}`}
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-error">{fieldError.phone.message}</p>}
          </div>

          <div className="form-control mt-6">
            {isSended ? (
              <button className="btn btn-success" disabled={true}>
                Дякуємо!
              </button>
            ) : (
              <button
                type="submit"
                className={`btn ${submitting ? "btn-disabled" : "btn-primary"} hover:btn-warning`}
                disabled={submitting}
              >
                {submitting ? "Відправка..." : "Створити запит"}
              </button>
            )}

            <p className="text-[#ED4245] text-right mt-5 select-none">{submitErrorText.join(", ")}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
