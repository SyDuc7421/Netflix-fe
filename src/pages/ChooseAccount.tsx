import { useCurrentUser } from "../hooks/userHooks";
import { AAccount, AddAccount } from "../components/auth/AvatarAccout";
import { EditAccountDialog } from "../components/account-dialog";
import { useCallback } from "react";

const ChooseAccountPage = () => {
  const { username } = useCurrentUser();
  // TODO: Call API get all account and display on screen

  const onCreateAnAccount = useCallback((value: string) => {
    console.log(value);
    // TODO: Call API create account
  }, []);
  const onMoveOnAccount = useCallback(() => {}, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-primary text-primary-foreground">
      <h1 className="-mt-10 text-4xl tracking-tight">Who is watching?</h1>
      <div className="grid grid-cols-2 items-stretch justify-center justify-items-center gap-6 lg:grid-cols-3">
        <EditAccountDialog
          label="Create an account"
          description="For the best experience, create a personal account that suits your interests"
          action="Add an account"
          onSave={onCreateAnAccount}
        >
          <AddAccount />
        </EditAccountDialog>

        <AAccount label={username} onClick={onMoveOnAccount} />
      </div>
    </div>
  );
};

export default ChooseAccountPage;
