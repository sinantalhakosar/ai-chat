import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Chat from "./Chat";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex gap-4 justify-between w-full h-full">
      <div className="w-auto">Modals</div>
      <div className="flex-grow bg-[#202328] rounded-3xl flex gap-4">
        Chat list
        <Chat/>
      </div>
    </div>
  );
}
