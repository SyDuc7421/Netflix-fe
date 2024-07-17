import { UserProfile } from "../components/auth/UserProifle";
import { useCurrentUser } from "../hooks/userHooks";

const HomePage = () => {
  const { username } = useCurrentUser();

  return (
    <div className="relative h-full w-full bg-primary text-primary-foreground">
      Welcome, {username ? username : "Account Name"}
      <div className="absolute right-4 top-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default HomePage;
