"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-daime-dark px-6 py-8">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <p className="font-serif-jp text-lg" style={{ color: "#C8B090" }}>
          DaiMe
        </p>
        <p className="text-xs text-daime-seed/50">
          {t("copyright")} · {t("privacy")}
        </p>
      </div>
    </footer>
  );
}
