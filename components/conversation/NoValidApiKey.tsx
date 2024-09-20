import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/contexts/DashboardContext";
import { mapProviderToName } from "@/utils/mapProviderToName";

export const NoValidApiKey = () => {
  const { selectedProvider } = useDashboard();

  const providerName = mapProviderToName(selectedProvider);

  return (
    <div className=" flex justify-center items-center w-full h-screen">
      <div className="bg-[#202020] w-full sm:w-3/4 rounded-2xl flex flex-col justify-center items-center gap-4 p-4">
        <KeyRound size={32} className="text-red-500" />

        <p className="text-slate-50 text-lg text-center">
          No valid API key found for {providerName}
        </p>

        <Link href="/dashboard/api-keys">
          <Button className="bg-slate-700 text-slate-50">
            Manage API Keys
          </Button>
        </Link>
      </div>
    </div>
  );
};
