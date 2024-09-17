"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import Link from "next/link";
import { SmtpMessage } from "../../../components/SmtpMessage";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage as UiFormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { signinFormSchema, SigninFormValues } from "@/types/Auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/useToast";

export default function Signup({ searchParams }: { searchParams: Message }) {
  const { toast } = useToast();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninFormValues) => {
    try {
      await signUpAction(values);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again.",
        variant: "destructive",
      });
    }
  };

  if ("message" in searchParams) {
    return <FormMessage message={searchParams} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <FormMessage message={searchParams} />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Create your account
        </h2>
        <Form {...form}>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <UiFormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <UiFormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-center text-sm text-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <SmtpMessage />
      </div>
    </div>
  );
}
