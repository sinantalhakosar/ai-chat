import { getProviderLogo, mapProviderToName } from "@/utils/mapProviderToName";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Command, CommandItem, CommandList } from "../ui/Command";
import { useState } from "react";
import { availableProviders } from "@/data/aiModelsAndProviders";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/Drawer";
import { useDashboard } from "@/contexts/DashboardContext";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { Provider } from "@/types/Common.types";

export const ProviderSelect = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [open, setOpen] = useState(false);

  const {
    selectedProvider,
    setSelectedProvider,
    setSelectedModel,
    setSelectedChatId,
  } = useDashboard();

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
                src={getProviderLogo(selectedProvider)}
                alt="AI Chat Assistant"
                width={30}
                height={30}
                className="rounded-lg max-w-full h-auto"
              />
              {mapProviderToName(selectedProvider)}
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Content handleProviderClick={handleProviderClick} />
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
              src={getProviderLogo(selectedProvider)}
              alt="AI Chat Assistant"
              width={30}
              height={30}
              className="rounded-lg max-w-full h-auto"
            />
            {mapProviderToName(selectedProvider)}
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="">
        <Content handleProviderClick={handleProviderClick} />
      </DrawerContent>
    </Drawer>
  );
};

const Content = ({
  handleProviderClick,
}: {
  handleProviderClick: (provider: Provider) => void;
}) => {
  return (
    <Command className="border border-[#4C4C4C] dark:bg-[#202020] z-50 mb-1">
      <CommandList>
        {availableProviders.map((provider) => (
          <CommandItem
            key={provider}
            className="flex items-center gap-4 py-4 cursor-pointer"
            value={provider}
            onSelect={(value) => handleProviderClick(value as Provider)}
          >
            <Image
              src={getProviderLogo(provider)}
              alt="AI Chat Assistant"
              width={30}
              height={30}
              className="rounded-lg max-w-full h-auto"
            />
            <span className="whitespace-nowrap">
              {mapProviderToName(provider)}
            </span>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
