import { IconButton } from "@/components/ui/iconButton";
import { getProviderIcon, mapProviderToName } from "@/utils/mapProviderToName";
import { useDashboard } from "../../contexts/DashboardContext";
import { availableProviders } from "@/types/Common.types";

export default function ProviderList() {
  const { selectedProvider, setSelectedProvider } = useDashboard();

  return (
    <div className="flex flex-col items-center space-y-4">
      {availableProviders.map((provider) => (
        <div
          key={provider}
          className="flex flex-col items-center p-2 rounded-lg transition-colors duration-200"
          onClick={() => setSelectedProvider(provider)}
        >
          <IconButton
            icon={getProviderIcon(provider)}
            active={selectedProvider === provider}
          />
          <span className="mt-2 text-sm font-medium">
            {mapProviderToName(provider)}
          </span>
        </div>
      ))}
    </div>
  );
}
