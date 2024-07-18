import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface SearchButtonProps {
  placeholder?: string;
}

export const SearchButton = ({ placeholder }: SearchButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchInfo, setSearchInfo] = useState<string>("");

  const onSearch = (value: string) => {
    console.log(value);
    setOpen(false);
  };

  if (!open) {
    return (
      <div
        className="cursor-pointer text-primary-foreground/50 transition duration-500 hover:text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        <Search />
      </div>
    );
  } else
    return (
      <div className="relative text-primary-foreground/50 transition duration-500 hover:text-primary-foreground">
        <Input
          type="text"
          value={searchInfo}
          onChange={(e) => setSearchInfo(e.target.value)}
          className="h-10 bg-zinc-400 pr-8 text-base text-white"
          placeholder={placeholder}
        />
        <Search
          className="absolute right-2 top-5 -translate-y-1/2 cursor-pointer text-primary-foreground transition duration-500 hover:text-primary-foreground/50"
          onClick={() => onSearch(searchInfo)}
        />
      </div>
    );
};

export const NotifyButton = () => {
  return (
    <div className="cursor-pointer text-primary-foreground/50 transition duration-500 hover:text-primary-foreground">
      <Bell />
    </div>
  );
};
