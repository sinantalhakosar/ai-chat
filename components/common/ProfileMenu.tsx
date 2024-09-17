import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Link from "next/link";
import { Key, LockKeyhole, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { User } from "@supabase/supabase-js";

export const ProfileMenu = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-50">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href="/dashboard/api-keys"
            className="cursor-pointer flex items-center"
          >
            <Key className="mr-2 h-4 w-4" />
            Manage API Keys
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Link
            href="/dashboard/reset-password"
            className="cursor-pointer flex items-center"
          >
            <LockKeyhole className="mr-2 h-4 w-4" />
            Reset Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => signOutAction()}
          className="cursor-pointer flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
