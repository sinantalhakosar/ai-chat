import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export const SmtpMessage = () => {
  return (
    <Alert className="mt-4">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription className="flex flex-col gap-2 break-words">
        <span>
          <strong>Note:</strong> Emails are limited to 4 per hour. Enable a
          custom SMTP endpoint to increase the rate limit.
        </span>
        <Link
          href="https://supabase.com/docs/guides/auth/auth-smtp"
          target="_blank"
          className="text-blue-600 hover:text-blue-400 flex items-center text-sm gap-1"
        >
          Learn more <ArrowUpRight size={14} />
        </Link>
      </AlertDescription>
    </Alert>
  );
};
