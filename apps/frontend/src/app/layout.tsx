import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "@jj - Вантажні перевезення",
  description:
    "Перевезення грузів по Україні за доступними цінами. Швидко та надійно доставляємо ваші вантажі в будь-який куточок країни. Зверніться до нас, і ми зробимо все можливе, щоб забезпечити успішну доставку вашого грузу.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="lofi" lang="uk">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
