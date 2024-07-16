import { UserProfile } from "../components/auth/UserProifle";

const HomePage = () => {
  return (
    <div className="relative h-full w-full bg-primary text-primary-foreground">
      Welcome, {"Account Name"}
      <div className="absolute right-4 top-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default HomePage;
