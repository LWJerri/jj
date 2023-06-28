"use client";

import OrderForm from "@/components/OrderForm";
import { userValidation } from "@/components/userValidation";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    userValidation(localStorage);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/452/396/863/euro-truck-simulator-ets2-euro-truck-simulator-2-wallpaper-preview.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="hero min-h-screen backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold text-[#7b03df] break-all">Вантажні перевезення 🔥🔥</h1>
            <p className="py-6">
              Перевезення грузів по Україні за доступними цінами. Швидко та надійно доставляємо ваші вантажі в будь-який
              куточок країни. Зверніться до нас, і ми зробимо все можливе, щоб забезпечити успішну доставку вашого
              грузу.
            </p>
          </div>

          <OrderForm />
        </div>
      </div>
    </div>
  );
}
