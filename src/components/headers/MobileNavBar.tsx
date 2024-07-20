import { useNavigate } from "react-router-dom";
import { ChevronDown, Columns3, Film, Home, Popcorn, Star } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const MobileNavBar = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-primary-foreground/50 transition duration-500 hover:bg-transparent hover:text-primary-foreground lg:hidden"
        >
          <span>Browser</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={18} className="space-y-1">
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/homepage")}
        >
          <Home className="mr-2 h-4 w-4" />
          <span>Home</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/homepage")}
        >
          <Columns3 className="mr-2 h-4 w-4" />
          <span>Series</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/homepage")}
        >
          <Film className="mr-2 h-4 w-4" />
          <span>Films</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/homepage")}
        >
          <Popcorn className="mr-2 h-4 w-4" />
          <span>New & Popular</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/homepage")}
        >
          <Star className="mr-2 h-4 w-4" />
          <span>My Favorites</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
