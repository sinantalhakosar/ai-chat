import { AlertCircle, Check, CheckCircle, CheckCircle2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" color="green" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message.success}</AlertDescription>
        </Alert>
      )}
      {"error" in message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" color="red" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message.error}</AlertDescription>
        </Alert>
      )}
      {"message" in message && (
        <Alert variant="default">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
