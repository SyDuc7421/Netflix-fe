import { Plus } from "lucide-react";

interface AAccountProps {
  label: string;
  url?: string;
  onClick: () => void;
}

export const AAccount = ({ label, url, onClick }: AAccountProps) => {
  return (
    <div
      className="group flex flex-col items-center justify-center gap-2 text-center"
      onClick={onClick}
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

interface AddAccoutProps {
  onClick: () => void;
}

export const AddAccount = ({ onClick }: AddAccoutProps) => {
  return (
    <div
      className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-zinc-500 hover:border-white"
      onClick={onClick}
    >
      <Plus size={52} strokeWidth={1} className="-ms-3" />
    </div>
  );
};
