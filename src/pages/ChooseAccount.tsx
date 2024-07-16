import { useCallback, useEffect } from "react";

import { AAccount, AddAccount } from "../components/auth/AvatarAccout";
import { EditAccountDialog } from "../components/account-dialog";

import { useAccounts, useCreateAccount } from "../hooks/accountHook";

const ChooseAccountPage = () => {
  const { data: accounts, query: getAccounts } = useAccounts();
  const { mutation: createAccount } = useCreateAccount();

  const onCreateAnAccount = useCallback(async (value: string) => {
    await createAccount({ accountName: value });
  }, []);

  // Get all account data of user.
  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-primary text-primary-foreground">
      <h1 className="-mt-10 text-4xl tracking-tight">Who is watching?</h1>
      <div className="grid grid-cols-2 items-stretch justify-center justify-items-center gap-6 lg:grid-cols-3">
        <EditAccountDialog
          label="Create an account"
          description="For the best experience, create a personal account that suits your interests."
          action="Add an account"
          onSave={onCreateAnAccount}
        >
          <AddAccount />
        </EditAccountDialog>
        {accounts &&
          accounts.map((account) => (
            <AAccount
              key={account._id}
              label={account.name}
              accountId={account._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChooseAccountPage;
