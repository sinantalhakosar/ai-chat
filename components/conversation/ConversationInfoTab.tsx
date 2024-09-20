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
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
              {modelList.map((model, index) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <SelectItem value={model}>
                    <div className="w-full flex">{model}</div>
                  </SelectItem>
                </motion.div>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <ProfileMenu userEmail={userEmail} />
    </div>
  );
};
