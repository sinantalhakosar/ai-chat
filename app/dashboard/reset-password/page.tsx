import { FormMessage, Message } from "@/components/common/FormMessage";
import ResetPasswordForm from "@/components/dashboard/reset-password/ResetPasswordForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex flex-col items-center sm:w-1/2 h-screen gap-4 mt-4">
      <div className="w-full flex items-center justify-start bg-[#202020] rounded-2xl px-8 py-4 gap-2">
        <ArrowLeft />
        <Link href="/dashboard" className="hover:underline">
          Back to chat
        </Link>
      </div>

      <div className="bg-[#202020] rounded-2xl w-full p-8 flex flex-col gap-8 sm:gap-2">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <ResetPasswordForm />
        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
