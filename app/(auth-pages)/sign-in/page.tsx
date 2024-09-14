"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage as UiFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinFormSchema, SigninFormValues } from "@/types/Auth.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <FormMessage message={searchParams} />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Sign in to your account
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
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <UiFormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-blue-600 hover:text-blue-400"
                href="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
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
          </form>
        </Form>
        <p className="mt-2 text-center text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:text-blue-400 underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
