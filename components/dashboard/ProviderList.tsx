import {
  getProviderImage,
  mapProviderToName,
} from "@/utils/mapProviderToName";
import { useDashboard } from "../../contexts/DashboardContext";
import { availableProviders, Provider } from "@/types/Common.types";
import { getProviderModalList } from "@/utils/getProviderModalList";
import Image from "next/image";

export default function ProviderList() {
  const {
    selectedProvider,
    setSelectedProvider,
    setSelectedModel,
    setSelectedChatId,
  } = useDashboard();

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);

    const modelList = getProviderModalList(provider);
    setSelectedModel(modelList[0]);
    setSelectedChatId(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 overflow-y-auto">
      {availableProviders.map((provider) => (
        <div
          key={provider}
          className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200"
          onClick={() => handleProviderClick(provider)}
        >
          <div
            className={`${selectedProvider === provider ? "bg-[#2f333c]" : ""} p-1 rounded-lg cursor-pointer`}
          >
            <Image
              src={getProviderImage(provider)}
              alt="AI Chat Assistant"
              width={30}
              height={30}
              className="rounded-lg max-w-full h-auto"
            />
          </div>

          <span className="mt-2 text-sm font-medium whitespace-nowrap">
            {mapProviderToName(provider)}
          </span>
        </div>
      ))}
    </div>
  );
}
