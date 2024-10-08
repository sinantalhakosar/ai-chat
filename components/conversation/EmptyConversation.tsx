import { useDashboard } from "@/contexts/DashboardContext";
import { getProviderLogo } from "@/utils/getProviderLogo";
import { Files, Sparkles, Split } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export const EmptyConversation = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const { selectedProvider } = useDashboard();

  const providerLogoUrl = getProviderLogo(selectedProvider);

  return (
    <div className=" flex justify-center items-center w-full h-screen">
      <div className="bg-[#202020] w-4/5 sm:w-3/4 2xl:w-1/2 rounded-2xl flex flex-col justify-center items-center gap-4 p-4">
        <Image
          src={providerLogoUrl}
          alt="AI Chat Assistant"
          width={30}
          height={30}
          className="rounded-lg max-w-full h-auto"
        />

        <p className="text-slate-50 text-lg text-center">
          How can I help you today?
        </p>

        <p className="text-slate-400 text-md text-center">
          Innovative application that showcases an AI-powered chat interface
          with dynamic visualizations
        </p>

        {isDesktop && (
          <div className="flex gap-2">
            <div className="rounded-2xl bg-[#4C4C4C] p-4 flex flex-col gap-2 items-center">
              <Files className="text-[#72c65c]" size={32} />
              <p className="text-slate-50 text-md whitespace-nowrap">
                Multiple Providers
              </p>
              <p className="text-slate-400 text-sm text-center">
                Users can select between multiple providers
              </p>
            </div>

            <div className="rounded-2xl bg-[#4C4C4C] p-4 flex flex-col gap-2 items-center">
              <Split className="text-[#72c65c]" size={32} />
              <p className="text-slate-50 text-md whitespace-nowrap">
                Multiple Models
              </p>
              <p className="text-slate-400 text-sm text-center">
                Users can select between multiple models
              </p>
            </div>

            <div className="rounded-2xl bg-[#4C4C4C] p-4 flex flex-col gap-2 items-center">
              <Sparkles className="text-[#72c65c]" size={32} />
              <p className="text-slate-50 text-md whitespace-nowrap">
                Dynamic Visualizations
              </p>
              <p className="text-slate-400 text-sm text-center">
                Users can select between multiple visualizations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
