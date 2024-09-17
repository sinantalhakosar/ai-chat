"use client";

import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";
import { Provider } from "@/types/Common.types";
import { ApiKeyList } from "@/components/dashboard/api-keys/ApiKeyList";
import { ApiKeyUpsert } from "@/components/dashboard/api-keys/ApiKeyUpsert";
import { mapProviderToApiKeyName } from "@/utils/mapProviderToName";
import { availableProviders } from "@/data/aiModelsAndProviders";

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
    <div className="p-4 flex flex-col gap-4 w-full">
      <div className="mb-8">
        <p>
          This page allows you to manage your API keys, which are essential for
          utilizing the Chat functionality.
          <br />
          For security purposes, your API keys are securely stored in your
          browser&apos;s cookies and are accessible only to you.
          <br />
          This ensures that your sensitive information remains private and
          protected.
        </p>
      </div>
      <div className="flex space-x-12">
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

        <ApiKeyUpsert
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          newApiValue={newApiValue}
          setNewApiValue={setNewApiValue}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
