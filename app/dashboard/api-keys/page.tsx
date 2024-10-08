"use client";

import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";
import { Provider } from "@/types/Common.types";
import { ApiKeyList } from "@/components/api-keys/ApiKeyList";
import { ApiKeyUpsert } from "@/components/api-keys/ApiKeyUpsert";
import { mapProviderToApiKeyName } from "@/utils/mapProviderToApiKeyName";
import { availableProviders } from "@/data/aiModelsAndProviders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApiKeysPage() {
  const { toast } = useToast();

  const [providers, setProviders] = useState<
    { key: Provider; value: string }[]
  >([]);

  const [newApiValue, setNewApiValue] = useState("");

  const [selectedProvider, setSelectedProvider] = useState<
    Provider | undefined
  >(undefined);

  const isValidApiKey =
    selectedProvider &&
    selectedProvider?.trim() !== "" &&
    newApiValue.trim() !== "";

  useEffect(() => {
    const loadedKeys = availableProviders
      .map((keyType) => ({
        key: keyType,
        value: (getCookie(mapProviderToApiKeyName(keyType)) as string) || "",
      }))
      .filter((key) => key.value !== "");

    setProviders(loadedKeys);
  }, []);

  const handleSave = () => {
    if (isValidApiKey) {
      const maxAge = 30 * 24 * 60 * 60; // 30 days
      const apiKeyName = mapProviderToApiKeyName(selectedProvider);

      setCookie(apiKeyName, newApiValue, {
        maxAge,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setProviders((prevKeys) => {
        const newKeys = prevKeys.filter((key) => key.key !== selectedProvider);
        return [...newKeys, { key: selectedProvider, value: newApiValue }];
      });

      setNewApiValue("");
      setSelectedProvider(undefined);
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API Key",
        variant: "destructive",
      });
    }
  };

  const deleteApiKey = (key: Provider) => {
    const apiKeyName = mapProviderToApiKeyName(key);
    deleteCookie(apiKeyName);

    setProviders((prevKeys) => prevKeys.filter((apiKey) => apiKey.key !== key));
    setSelectedProvider(undefined);
  };

  return (
    <div className="flex flex-col items-center sm:w-1/2 h-screen gap-4 mt-4">
      <div className="w-full flex items-center justify-start bg-[#202020] rounded-2xl px-8 py-4 gap-2">
        <ArrowLeft />
        <Link href="/dashboard" className="hover:underline">
          Back to chat
        </Link>
      </div>

      <div className="bg-[#202020] rounded-2xl w-full p-8">
        <h1 className="text-2xl font-bold mb-4">Add new API Key</h1>

        <ApiKeyUpsert
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          newApiValue={newApiValue}
          setNewApiValue={setNewApiValue}
          handleSave={handleSave}
        />
      </div>

      <div className="bg-[#202020] rounded-2xl w-full p-8">
        <h1 className="text-2xl font-bold mb-4">API Key List</h1>

        {providers.length > 0 ? (
          <ApiKeyList
            providers={providers}
            setSelectedProvider={setSelectedProvider}
            setNewApiValue={setNewApiValue}
            deleteApiKey={deleteApiKey}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-1/2">
            <p className="text-lg font-semibold">No API keys found</p>
            <p className="text-sm text-gray-500">
              Add your first API key to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
