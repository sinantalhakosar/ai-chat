"use client";

import { Button, ButtonProps } from "./Button";
import { LucideIcon } from "lucide-react";

interface Props extends ButtonProps {
  icon: LucideIcon;
  text?: string;
  active?: boolean;
  onClick?: () => void;
  disableHover?: boolean;
}

export const IconButton = ({
  icon: Icon,
  active,
  onClick,
  disableHover,
  ...rest
}: Omit<Props, "text">) => {
  return (
    <Button
      variant="icon"
      size="icon"
      className={
        active ? "bg-[#2f333c]" : disableHover ? "" : "hover:bg-[#2f333c]"
      }
      onClick={onClick}
      {...rest}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
};

export const IconButtonWithText = ({
  icon: Icon,
  active,
  text,
  onClick,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <IconButton icon={Icon} active={active} onClick={onClick} />
      {text && <p className="text-xs">{text}</p>}
    </div>
  );
};
