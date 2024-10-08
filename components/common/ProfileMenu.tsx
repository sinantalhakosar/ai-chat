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
import { motion } from "framer-motion";

interface Props {
  userEmail: User['email'];
}

export const ProfileMenu = ({ userEmail }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar>
            <AvatarImage src="/images/profile.svg" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-50 dark:bg-[#202020] flex flex-col p-2"
        side="bottom"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>

          <DropdownMenuSeparator className="dark:bg-white" />
          <div className="flex flex-col gap-1 mt-2">
            <DropdownMenuItem
              className="cursor-pointer dark:hover:bg-[#4C4C4C]"
              asChild
            >
              <Link
                href="/dashboard/api-keys"
                className="cursor-pointer flex items-center gap-2"
              >
                <Key className="mr-2 h-5 w-5" />
                Manage API Keys
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer dark:hover:bg-[#4C4C4C]"
              asChild
            >
              <Link
                href="/dashboard/reset-password"
                className="cursor-pointer flex items-center gap-2"
              >
                <LockKeyhole className="mr-2 h-5 w-5" />
                Reset Password
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => signOutAction()}
              className="cursor-pointer flex items-center dark:hover:bg-[#4C4C4C] gap-2"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </DropdownMenuItem>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};