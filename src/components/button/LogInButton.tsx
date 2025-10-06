"use client";
import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LogInButton() {
  const t = useTranslations();
  const { data } = useSession();
  if (data) {
    return (
      <Link href={`/${data.user.username}`}>
        {" "}
        <button className="flex items-center font-description-5 font-semibold text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors">
          <FaUserGraduate className="h-4 w-4" />
        </button>
      </Link>
    );
  }
  return (
    <button
      onClick={() => signIn("keycloak")}
      className="flex items-center font-description-5 font-semibold text-white px-4 py-1 border bg-accent hover:bg-accent-hover rounded-full transition-colors"
    >
      <FaUserGraduate className="h-4 w-4" />
      <span className="ml-2">{t("log-in")}</span>
    </button>
  );
}
