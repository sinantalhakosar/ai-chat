"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/common/FormMessage";
import Link from "next/link";
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
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="bg-[#202020] rounded-2xl p-8 w-4/5 sm:w-full">

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
                      autoComplete="new-password"
                      className="dark:bg-[#4C4C4C] rounded-lg dark:placeholder:text-[#BDBDBD]"
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
                    Signing Up...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm text-foreground flex flex-wrap gap-2">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>

        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
