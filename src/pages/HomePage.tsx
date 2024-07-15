import { UserProfile } from "../components/auth/UserProifle";
import { useCurrentUser } from "../hooks/userHooks";

const HomePage = () => {
  const { username } = useCurrentUser();

  return (
    <div className="relative w-full h-full bg-primary text-primary-foreground">
      Welcome, {username}
      <div className="absolute top-4 right-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default HomePage;
