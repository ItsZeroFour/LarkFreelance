import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LarkinsStage } from "@/components/larkins/LarkinsStage";

export const metadata: Metadata = {
  title: "Larkins - coming soon",
  description:
    "Larkins - AI-ассистент нового поколения для вашего бизнеса. Интеллектуальный слой агентства Lark Freelance.",
  alternates: { canonical: "/larkins" },
  openGraph: {
    type: "website",
    url: "/larkins",
    title: "Larkins - coming soon · Lark Freelance",
    description:
      "Larkins - AI-ассистент нового поколения для вашего бизнеса.",
  },
};

/** /larkins - dedicated cinematic teaser page. */
export default function LarkinsPage() {
  return (
    <>
      <Navbar />
      <main>
        <LarkinsStage />
      </main>
      <Footer />
    </>
  );
}
