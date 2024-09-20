import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Model } from "@/types/Common.types";
import { ProfileMenu } from "@/components/common/ProfileMenu";
import { useMediaQuery } from "react-responsive";
import { User } from "@supabase/supabase-js";

interface Props {
  modelList: Array<Model>;
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  userEmail: User["email"];
}

export const ConversationInfoTab = ({
  modelList,
  selectedModel,
  setSelectedModel,
  userEmail,
}: Props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="mb-4 w-full flex justify-between pl-8 sm:pl-0">
      <div></div>
      <div className={isDesktop ? "w-1/3" : "w-3/4"}>
        <Select
          onValueChange={(value) => {
            setSelectedModel(value as Model);
          }}
          value={selectedModel}
        >
          <SelectTrigger>
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

      <ProfileMenu userEmail={userEmail} />
    </div>
  );
};
