"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  ja: "日本語",
  zh: "中文",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-white/80 p-1 font-sans shadow-md backdrop-blur"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() =>
              router.replace(pathname, { locale: loc, scroll: false })
            }
            aria-current={active ? "true" : undefined}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
            style={{
              backgroundColor: active ? "#4A7C59" : "transparent",
              color: active ? "#F5F0E8" : "#3B2F1E",
            }}
          >
            {LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
