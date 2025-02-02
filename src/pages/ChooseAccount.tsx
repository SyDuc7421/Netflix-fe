import { useCallback, useEffect, useState } from "react";

import { AAccount, AddAccount } from "../components/auth/AvatarAccout";
import { EditAccountDialog } from "../components/account-dialog";

import { useAccounts, useCreateAccount } from "../hooks/accountHook";
import { Hint } from "../components/hint";

const ChooseAccountPage = () => {
  const [refresh, setRefresh] = useState(0);

  const { data: accounts, query: getAccounts } = useAccounts();
  const { isSuccess, mutation: createAccount } = useCreateAccount();

  const onCreateAnAccount = useCallback(
    async (value: string) => {
      await createAccount({ accountName: value });
      if (isSuccess) {
        setRefresh((prev) => prev + 1);
      }
    },
    [createAccount, isSuccess],
  );

  // Get all account data of user.
  useEffect(() => {
    getAccounts();
  }, [refresh, isSuccess]);

  return (
    <div className="w-sreen flex h-screen flex-col items-center justify-center gap-8 bg-primary text-primary-foreground">
      <h1 className="-mt-10 text-4xl tracking-tight">Who is watching?</h1>
      <div className="grid grid-cols-2 items-stretch justify-center justify-items-center gap-6 lg:grid-cols-3">
        {accounts.length < 6 && (
          <EditAccountDialog
            label="Create an account"
            description="For the best experience, create a personal account that suits your interests."
            action="Add an account"
            onSave={onCreateAnAccount}
          >
            <Hint label="Add a new account" side="left">
              <AddAccount />
            </Hint>
          </EditAccountDialog>
        )}

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
