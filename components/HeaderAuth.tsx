import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export const HeaderAuth = async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 items-center">
      {!hasEnvVars && (
        <div>
          <Badge variant="default" className="font-normal pointer-events-none">
            Please update .env.local file with anon key and url
          </Badge>
        </div>
      )}
      <Button asChild size="default" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="default" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
};
