"use client";

import { Button, ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props extends ButtonProps {
  icon: LucideIcon;
  text?: string;
  active?: boolean;
  disableHover?: boolean;
  iconClassName?: string;
}

export const IconButton = ({
  icon: Icon,
  active,
  onClick,
  disableHover,
  iconClassName,
  ...rest
}: Omit<Props, "text">) => {
  return (
    <Button variant="icon" size="icon" onClick={onClick} {...rest}>
      <Icon className={cn("h-5 w-5", iconClassName)} />
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
