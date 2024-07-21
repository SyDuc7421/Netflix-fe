import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { UserProfile } from "./auth/UserProifle";

import { NotifyButton, SearchButton } from "./headers/HeadersButton";
import { MobileNavBar } from "./headers/MobileNavBar";
import { WindownNavBar } from "./headers/WindownNavBar";

const TOP_OFFSET = 68;

export const Headers = () => {
  const [showBackground, setShowBackground] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        "fixed z-40 flex h-16 w-full flex-row items-center justify-between px-4 py-6 text-primary-foreground opacity-90 transition duration-500",
        showBackground ? "bg-primary" : "bg-transparent",
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          className="h-5 lg:h-7"
        />
        <WindownNavBar />
        <MobileNavBar />
      </div>
      <div className="flex flex-row items-center gap-6">
        <SearchButton />
        <NotifyButton />
        <UserProfile />
      </div>
    </div>
  );
};
