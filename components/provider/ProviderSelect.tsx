import { mapProviderToName } from "@/utils/mapProviderToName";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import { useDashboard } from "@/contexts/DashboardContext";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { Provider } from "@/types/Common.types";
import { getProviderLogo } from "@/utils/getProviderLogo";
import { ProviderContent } from "@/components/provider/ProviderContent";
import { motion } from "framer-motion";

export const ProviderSelect = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [open, setOpen] = useState(false);

  const {
    selectedProvider,
    setSelectedProvider,
    setSelectedModel,
    setSelectedChatId,
  } = useDashboard();

  const selectedProviderLogoUrl = getProviderLogo(selectedProvider);
  const selectedProviderName = mapProviderToName(selectedProvider);

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);

    const modelList = getProviderModalList(provider);
    setSelectedModel(modelList[0]); // select first model by default
    setSelectedChatId(null); // for ux, no need to click new chat button on provider change

    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="bg-[#202020] rounded-2xl flex items-center justify-between gap-2 p-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Image
                src={selectedProviderLogoUrl}
                alt="AI Chat Assistant"
                width={30}
                height={30}
                className="rounded-lg max-w-full h-auto"
              />
              {selectedProviderName}
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <ProviderContent handleProviderClick={handleProviderClick} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <div className="bg-[#202020] rounded-2xl flex items-center justify-between gap-2 p-3 cursor-pointer">
          <div className="flex items-center gap-2">
            <Image
              src={selectedProviderLogoUrl}
              alt="AI Chat Assistant"
              width={30}
              height={30}
              className="rounded-lg max-w-full h-auto"
            />
            {selectedProviderName}
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <ProviderContent handleProviderClick={handleProviderClick} />
      </DrawerContent>
    </Drawer>
  );
};
