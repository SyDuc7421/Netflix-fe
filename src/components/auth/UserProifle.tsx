import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronDown, LogOut, Mail, Settings, Star, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useCurrentUser } from "../../hooks/userHooks";
import { useLogout } from "../../hooks/authHook";
import { cn } from "../../lib/utils";

export const UserProfile = () => {
  const { username, email } = useCurrentUser();
  const { logoutFunction: logout } = useLogout();

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <DropdownMenu onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger>
        <div className="group flex items-center gap-1">
          <img
            src="/src/assets/images/default-blue.png"
            alt="@avatar"
            className="h-8 w-8 cursor-pointer rounded-sm border border-transparent opacity-85 transition duration-500 group-hover:border-white group-hover:opacity-100 lg:h-10 lg:w-10"
          />
          <ChevronDown
            className={cn(
              "text-primary-foreground/50 transition duration-500 group-hover:text-primary-foreground",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" sideOffset={12} align="end">
        <DropdownMenuLabel>Welcome, {username}</DropdownMenuLabel>

        <DropdownMenuLabel className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span> {email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/choosing-account")}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center">
          <Star className="mr-2 h-4 w-4" />
          <span>Favorites</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
