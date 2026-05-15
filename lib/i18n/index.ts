"use client";

import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { uz } from "./locales/uz";

export type Locale = "en" | "ru" | "uz";

const locales = { en, ru, uz };

export function getTranslations(locale: Locale = "en") {
  return locales[locale] ?? locales.en;
}

export { en, ru, uz };
