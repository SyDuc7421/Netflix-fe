import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Plus } from "lucide-react";
import { addAccoutId } from "../../store/accountSlice";

interface AAccountProps {
  label: string;
  url?: string;
  accountId: string;
}

export const AAccount = ({ label, url, accountId }: AAccountProps) => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const chooseAccount = useCallback(() => {
    dispath(addAccoutId(accountId));
    navigate("/homepage");
  }, []);

  return (
    <div
      className="group flex flex-col items-center justify-center gap-2 text-center"
      onClick={chooseAccount}
    >
      <img
        src={url ? url : "/src/assets/images/default-blue.png"}
        alt="User"
        className="h-24 w-24 rounded-md border-2 border-transparent opacity-85 group-hover:cursor-pointer group-hover:border-white group-hover:opacity-100"
      />
      <span className="text-lg font-medium text-zinc-400 group-hover:text-zinc-50">
        {label}
      </span>
    </div>
  );
};

type AddAccountProps = {};

const AddAccount = React.forwardRef<HTMLLabelElement, AddAccountProps>(
  (props, ref: React.Ref<HTMLLabelElement>) => {
    return (
      <label
        ref={ref}
        {...props}
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-zinc-500 hover:border-white"
      >
        <Plus size={52} strokeWidth={1} className="-ms-3" />
      </label>
    );
  },
);

AddAccount.displayName = "AddAccountIcon";

export { AddAccount };
