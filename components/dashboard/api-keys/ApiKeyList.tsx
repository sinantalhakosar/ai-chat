import { IconButton } from "@/components/ui/IconButton";
import { Provider } from "@/types/Common.types";
import { mapProviderToApiKeyName } from "@/utils/mapProviderToName";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Props {
  providers: { key: Provider; value: string }[];
  setSelectedProvider: (key: Provider) => void;
  setNewApiValue: (value: string) => void;
  deleteApiKey: (key: Provider) => void;
}

function maskApiKey(apiKey: string) {
  return apiKey.slice(0, 4) + "•".repeat(8);
}

export const ApiKeyList = ({
  providers,
  setSelectedProvider,
  setNewApiValue,
  deleteApiKey,
}: Props) => {
  return (
    <div className="w-full">
      {providers
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((provider) => (
          <ApiKeyItem
            key={provider.key}
            provider={provider}
            setSelectedProvider={setSelectedProvider}
            setNewApiValue={setNewApiValue}
            deleteApiKey={deleteApiKey}
          />
        ))}
    </div>
  );
};

interface ApiKeyItemProps {
  provider: { key: Provider; value: string };
  setSelectedProvider: (key: Provider) => void;
  setNewApiValue: (value: string) => void;
  deleteApiKey: (key: Provider) => void;
}

const ApiKeyItem = ({
  provider,
  setSelectedProvider,
  setNewApiValue,
  deleteApiKey,
}: ApiKeyItemProps) => {
  return (
    <div className="flex flex-col items-start w-full gap-4 mb-4">
      <p className="font-semibold">{mapProviderToApiKeyName(provider.key)}</p>
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-sm text-gray-500">{maskApiKey(provider.value)}</p>

        <div>
          <IconButton
            onClick={() => {
              setSelectedProvider(provider.key);
              setNewApiValue(provider.value);
            }}
            size="sm"
            icon={PencilIcon}
          />

          <IconButton
            onClick={() => deleteApiKey(provider.key)}
            size="sm"
            icon={TrashIcon}
          />
        </div>
      </div>
    </div>
  );
};
