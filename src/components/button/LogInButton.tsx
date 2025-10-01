import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function LogInButton() {
  const t = useTranslations();
  return (
    <button className="flex items-center font-description-5 font-medium text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors">
      <FaUserGraduate className="h-4 w-4" />
      <span className="ml-2">{t("log-in")}</span>
    </button>
  );
}
