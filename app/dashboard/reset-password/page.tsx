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
    <div className="flex flex-col gap-4 w-4/5 bg-[#303236] rounded-3xl items-center py-8">
      <div className="w-3/4 flex justify-start items-center gap-2 hover:cursor-pointer">
        <ArrowLeft />
        <Link href="/dashboard" className="hover:underline">
          Back to chat
        </Link>
      </div>

      <div className="w-full max-w-md pb-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <ResetPasswordForm />
        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
