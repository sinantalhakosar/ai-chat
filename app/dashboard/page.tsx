import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Dashboard } from "./Dashboard";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <Dashboard userEmail={user.email} />;
}
