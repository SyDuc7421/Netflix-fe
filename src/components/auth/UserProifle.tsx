import { LogOut, Mail, Settings, Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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

export const UserProfile = () => {
  const { username, email } = useCurrentUser();
  const { logoutFunction: logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" alt="@avatar" />
          <AvatarFallback className="text-primary bg-primary-foreground font-bold hover:opacity-85">
            {username.split("")[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" sideOffset={12} align="end">
        <DropdownMenuLabel>Welcome, {username}</DropdownMenuLabel>

        <DropdownMenuLabel className="flex items-center">
          <Mail className="mr-2 w-4 h-4" />
          <span> {email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <User className="mr-2 w-4 h-4" />
          <span>Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <Star className="mr-2 w-4 h-4" />
          <span>Favorites</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <Settings className="mr-2 w-4 h-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
