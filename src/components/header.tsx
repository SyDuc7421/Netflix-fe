import { useEffect, useState } from "react";
import { UserProfile } from "./auth/UserProifle";
import { NotifyButton, SearchButton } from "./headers/HeadersButton";
import { WindownNavBarItem } from "./headers/NavBarItem";
import { cn } from "../lib/utils";

const TOP_OFFSET = 68;

export const Headers = () => {
  const [showBackground, setShowBackground] = useState<boolean>(true);
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
        "fixed z-40 flex w-full flex-row items-center justify-between px-4 py-6 text-primary-foreground opacity-90 transition duration-500",
        showBackground ? "bg-primary" : "bg-transparent",
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          className="h-4 lg:h-7"
        />
        <div className="flex flex-row items-center gap-4">
          <WindownNavBarItem label="Home" />
          <WindownNavBarItem label="Series" />
          <WindownNavBarItem label="Films" />
          <WindownNavBarItem label="New & Popular" />
          <WindownNavBarItem label="My Favorites" url="/favorites" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-6">
        <SearchButton />
        <NotifyButton />
        <UserProfile />
      </div>
    </div>
  );
};
