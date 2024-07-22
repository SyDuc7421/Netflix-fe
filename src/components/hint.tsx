import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
}

export const Hint = ({
  children,
  label,
  align,
  alignOffset,
  side,
  sideOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
          className="w-fit p-0"
        >
          <span className="rounded-md bg-primary-foreground px-4 py-2 text-base font-bold text-primary">
            {label}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
