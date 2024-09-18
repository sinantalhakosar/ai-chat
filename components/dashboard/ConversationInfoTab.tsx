import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Model, Provider } from "@/types/Common.types";

interface Props {
  selectedProvider: Provider;
  modelList: Array<Model>;
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
}

export const ConversationInfoTab = ({
  selectedProvider,
  modelList,
  selectedModel,
  setSelectedModel,
}: Props) => {
  return (
    <div className="mb-4 mt-2 flex items-center gap-2 justify-center">
      <div className="flex items-center gap-2 w-1/3">
        <h1 className="whitespace-nowrap">Model:</h1>

        <div className="w-full">
          <Select
            onValueChange={(value) => {
              setSelectedModel(value as Model);
            }}
            value={selectedModel}
          >
            <SelectTrigger className="w-full flex">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>

            <SelectContent>
              {modelList.map((model) => (
                <SelectItem key={model} value={model}>
                  <div className="w-full flex">{model}</div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
