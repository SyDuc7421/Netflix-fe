import { useCurrentUser } from "../hooks/userHooks";
import { AAccount, AddAccount } from "../components/auth/AvatarAccout";

const ChooseAccountPage = () => {
  const { username } = useCurrentUser();

  const onCreateAnAccount = () => {};
  const onMoveOnAccount = () => {};

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-primary text-primary-foreground">
      <h1 className="-mt-10 text-4xl tracking-tight">Who is watching?</h1>
      <div className="grid grid-cols-2 items-stretch justify-center justify-items-center gap-6 lg:grid-cols-3">
        <AddAccount onClick={onCreateAnAccount} />
        <AAccount label={username} onClick={onMoveOnAccount} />
      </div>
    </div>
  );
};

export default ChooseAccountPage;
