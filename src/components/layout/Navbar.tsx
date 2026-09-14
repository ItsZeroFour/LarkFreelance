"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Номер раздела связывает меню со сквозной нумерацией страницы. */
const navLinks = [
  { label: "Услуги", href: "/#services", section: "services", num: "02" },
  { label: "Процесс", href: "/#process", section: "process", num: "03" },
  { label: "Работы", href: "/portfolio", section: "portfolio", num: "04" },
  { label: "Команда", href: "/#team", section: "team", num: "05" },
  { label: "Larkins", href: "/larkins", section: null, num: "soon" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const sheetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  // До 40px навбар прозрачный и без линии, после - подложка и линия.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => l.section)
      .filter((s): s is string => Boolean(s));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Скролл страницы блокируется, Esc закрывает, фокус запирается внутри.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="reading-progress fixed inset-x-0 top-0 z-[55]"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-hover ease-hover",
          scrolled || open ? "floating" : "",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-5">
          {/* Знак белый: рядом жёлтая кнопка, а жёлтый на экране один. */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Lark Freelance - на главную"
            className="flex items-center gap-3 text-text"
          >
            <Logo size={28} />
            <span className="font-display text-[length:var(--lark-size-body-l)] leading-none">
              Lark<span className="text-text-2"> Freelance</span>
            </span>
          </Link>

          <ul className="lark-navbar__links hidden lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "lark-navlink",
                    link.section !== null && active === link.section && "is-active",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/#contact">
              Обсудить проект
              <Icon name="arrow-right" scale="xs" />
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="lark-btn lark-btn--ghost lark-btn--icon"
            >
              <Icon name={open ? "close" : "menu"} scale="sm" />
            </button>
          </div>
        </nav>
      </header>

      {/* Мобильное меню - оверлей на всю высоту */}
      {open && (
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="fixed inset-0 z-40 flex flex-col bg-bg pt-16 lg:hidden"
        >
          <ul className="shell flex flex-col pt-4">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    animationDelay: `calc(var(--lark-motion-stagger) * ${i})`,
                  }}
                  className="flex min-h-[var(--lark-control-h)] items-center justify-between
                             gap-4 border-b border-border py-4 text-[length:var(--lark-size-body-l)]
                             text-text"
                >
                  {link.label}
                  <span className="lark-mono lark-mono--sm text-text-3">{link.num}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="shell mt-6">
            <Button href="/#contact" size="lg" fullWidth>
              Обсудить проект
              <Icon name="arrow-right" scale="xs" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
