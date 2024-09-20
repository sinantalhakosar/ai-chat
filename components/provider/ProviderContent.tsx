import { Provider } from "@/types/Common.types";
import { mapProviderToName } from "@/utils/mapProviderToName";
import Image from "next/image";
import { Command, CommandItem, CommandList } from "@/components/ui/Command";
import { availableProviders } from "@/data/aiModelsAndProviders";
import { getProviderLogo } from "@/utils/getProviderLogo";

interface Props {
  handleProviderClick: (provider: Provider) => void;
}
export const ProviderContent = ({ handleProviderClick }: Props) => {
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
