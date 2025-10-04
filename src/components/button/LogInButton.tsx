"use client";
import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogInButton() {
  const t = useTranslations();
  const { data } = useSession();
  if (data) {
    return (
      <Button
        className="flex items-center font-description-5 font-semibold text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors"
      >
        <FaUserGraduate className="h-4 w-4" />
      </Button>
    );
  }
  return (
    <Button
      onClick={() => signIn("keycloak")}
      className="flex items-center font-description-5 font-semibold text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors"
    >
      <FaUserGraduate className="h-4 w-4" />
      <span className="ml-0">{t("log-in")}</span>
    </Button>
  );
}
