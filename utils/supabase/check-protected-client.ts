import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const checkProtectedClient = () => {
  const supabase = createClient();

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/sign-in");
    }
  };

  return checkUser();
};
