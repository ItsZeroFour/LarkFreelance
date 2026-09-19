import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Freelancers } from "@/components/sections/Freelancers";

export const metadata: Metadata = {
  title: "Работа в Lark",
  description:
    "Lark Freelance зовёт в команду точечно: разработчиков, дизайнеров и AI-инженеров, которые доводят до результата.",
  alternates: { canonical: "/join" },
  openGraph: {
    type: "website",
    url: "/join",
    title: "Работа в Lark - Lark Freelance",
    description:
      "Закрытый круг людей, которые умеют доводить до результата. Отбор, а не поток.",
  },
};

/**
 * /join - найм. Раньше блок стоял на главной между FAQ и контактами и
 * перехватывал путь заказчика к заявке. Теперь у него своя страница, а на
 * главной освободилось место перед формой.
 */
export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main>
        <Freelancers className="pt-28 sm:pt-32 lg:pt-36" />
      </main>
      <Footer />
    </>
  );
}
