"use client";

import { useTheme } from "next-themes";
import { Moon, Monitor, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", icon: Sun,     label: "Light"  },
  { value: "dark",  icon: Moon,    label: "Dark"   },
  { value: "system",icon: Monitor, label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="h-8 w-[88px] rounded-lg border bg-secondary/50" />;
  }

  return (
    <div className="flex items-center rounded-lg border bg-secondary/50 p-0.5 gap-0.5">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex size-7 items-center justify-center rounded-md transition-all duration-150",
            theme === value
              ? "bg-card shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={label}
          title={label}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
