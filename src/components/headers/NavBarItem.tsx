import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface NavBarItemProps {
  label: string;
  url?: string;
}

export const WindownNavBarItem = ({
  label,
  url = "/homepage",
}: NavBarItemProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      className="text-primary-foreground/50 transition duration-500 hover:bg-transparent hover:text-primary-foreground hover:underline"
      onClick={() => navigate(url)}
    >
      {label}
    </Button>
  );
};
