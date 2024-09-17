import { FormMessage, Message } from "@/components/common/FormMessage";
import ResetPasswordForm from "@/components/dashboard/reset-password/ResetPasswordForm";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <FormMessage message={searchParams} />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Reset your password
        </h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
