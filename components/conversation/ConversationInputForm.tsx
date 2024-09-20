"use client";

import { IconButton } from "@/components/ui/IconButton";
import { Send, Square } from "lucide-react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import { getProviderLogo } from "@/utils/getProviderLogo";
import { Provider } from "@/types/Common.types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isDesktop: boolean;
  selectedProvider: Provider;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isResponseLoading: boolean;
  loading: boolean;
  error: Error | undefined;
  stop: () => void;
}

export const ConversationInputForm = ({
  handleMessageSubmit,
  isDesktop,
  selectedProvider,
  input,
  handleInputChange,
  isResponseLoading,
  loading,
  error,
  stop,
}: Props) => {
  const providerLogoUrl = getProviderLogo(selectedProvider, true);

  return (
    <form
      onSubmit={handleMessageSubmit}
      className={cn(
        isDesktop ? "mb-3" : "mb-3",
        "mt-auto flex flex-col items-center justify-center relative w-full"
      )}
    >
      <div className="relative w-full">
        <div className="relative">
          <Image
            src={providerLogoUrl}
            alt="AI Chat Assistant"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />

          <Input
            className="dark:bg-slate-100 text-black pl-10 pr-20 dark:placeholder:text-zinc-700"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleMessageSubmit(e as unknown as FormEvent<HTMLFormElement>);
              }
            }}
          />
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
          {isResponseLoading ? (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <IconButton
                type="button"
                icon={Square}
                size="sm"
                onClick={() => stop()}
                iconClassName="text-black"
              />
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <IconButton
                type="submit"
                icon={Send}
                size="sm"
                disabled={loading || error !== undefined}
                iconClassName="text-black"
              />
            </motion.div>
          )}
        </div>
      </div>
    </form>
  );
};
