"use client";

import { resetPasswordAction } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage as UiFormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  resetPasswordFormSchema,
  ResetPasswordFormValues,
} from "@/types/Auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";

export default function ResetPasswordForm() {
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPasswordAction(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast({
      title: "Copy paste disabled",
      description: "Copy pasting is disabled due to security reasons.",
      variant: "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">New Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="dark:bg-[#4C4C4C] rounded-lg dark:placeholder:text-[#BDBDBD]"
                  placeholder="Enter your new password"
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </FormControl>

              <UiFormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Confirm New Password</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  className="dark:bg-[#4C4C4C] rounded-lg dark:placeholder:text-[#BDBDBD]"
                  type="password"
                  placeholder="Confirm your new password"
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                />
              </FormControl>

              <UiFormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
