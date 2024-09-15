import { IconButton } from "@/components/ui/iconButton";
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
    <div className="w-1/2">
      <h1 className="text-2xl font-bold mb-4">API Keys</h1>

      <div className="space-y-4">
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
    <div className="flex items-center justify-between space-x-4 p-2 border rounded">
      <div className="flex-grow flex items-center justify-between gap-6">
        <p className="font-semibold">{mapProviderToApiKeyName(provider.key)}</p>
        <p className="text-sm text-gray-500">{maskApiKey(provider.value)}</p>
      </div>

      <div className="flex space-x-2">
        <IconButton
          onClick={() => {
            setSelectedProvider(provider.key);
            setNewApiValue(provider.value);
          }}
          variant="outline"
          size="sm"
          icon={PencilIcon}
        />

        <IconButton
          onClick={() => deleteApiKey(provider.key)}
          variant="destructive"
          size="sm"
          icon={TrashIcon}
        />
      </div>
    </div>
  );
};
