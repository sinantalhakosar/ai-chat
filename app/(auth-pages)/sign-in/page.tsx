"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/common/FormMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage as UiFormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinFormSchema, SigninFormValues } from "@/types/Auth.types";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function SignIn({ searchParams }: { searchParams: Message }) {
  const { toast } = useToast();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninFormValues) {
    try {
      await signInAction(values);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="bg-[#202020] rounded-2xl p-8 w-4/5 sm:w-full">

        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Sign in to your account
        </h2>

        <Form {...form}>
          <form
            className="mt-8 flex flex-col gap-4"
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
                      {...field}
                      type="text"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="dark:bg-[#4C4C4C] rounded-lg dark:placeholder:text-[#BDBDBD]"
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
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="dark:bg-[#4C4C4C] rounded-lg dark:placeholder:text-[#BDBDBD]"
                    />
                  </FormControl>
                  <UiFormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-blue-600 hover:underline"
                href="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-slate-700 hover:bg-slate-600"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm text-foreground whitespace-nowrap">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>

        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
