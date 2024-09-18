import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { availableProviders } from "@/data/aiModelsAndProviders";
import { Provider } from "@/types/Common.types";
import { mapProviderToApiKeyName } from "@/utils/mapProviderToName";

interface Props {
  selectedProvider?: Provider;
  setSelectedProvider: (key: Provider) => void;
  newApiValue: string;
  setNewApiValue: (value: string) => void;
  handleSave: () => void;
}

export const ApiKeyUpsert = ({
  selectedProvider,
  setSelectedProvider,
  newApiValue,
  setNewApiValue,
  handleSave,
}: Props) => {
  return (
    <div className="mb-4 flex flex-col items-start gap-4">
      <Select
        onValueChange={(value) => {
          setSelectedProvider(value as Provider);
          setNewApiValue(""); // Clear textarea when a new API key is selected
        }}
        value={selectedProvider}
      >
        <SelectTrigger className="w-full flex">
          <SelectValue placeholder="Select API Key" />
        </SelectTrigger>
        <SelectContent>
          {availableProviders.map((provider) => (
            <SelectItem key={provider} value={provider}>
              <div className="w-full flex">
                {mapProviderToApiKeyName(provider)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        value={newApiValue}
        onChange={(e) => setNewApiValue(e.target.value)}
        placeholder="Enter API Key value"
        className="w-full mt-2 mb-2"
      />

      <Button onClick={handleSave} variant="default" className="ml-auto">
        Add Key
      </Button>
    </div>
  );
};
