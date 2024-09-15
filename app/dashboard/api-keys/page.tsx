"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconButton } from "@/components/ui/iconButton";
import { PencilIcon, TrashIcon } from "lucide-react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useToast } from "@/hooks/use-toast";

enum ApiKeyType {
  OpenAI = "OPENAI_API_KEY",
  Google = "GOOGLE_GENERATIVE_AI_API_KEY",
}

export interface ApiKey {
  key: string;
  value: string;
}

export default function ApiKeysPage() {
  const { toast } = useToast();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newApiValue, setNewApiValue] = useState("");
  const [selectedApiKey, setSelectedApiKey] = useState<string | undefined>(
    undefined
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load API keys from cookies when component mounts
    const loadedKeys = Object.values(ApiKeyType)
      .map((keyType) => ({
        key: keyType,
        value: (getCookie(keyType) as string) || "",
      }))
      .filter((key) => key.value !== "");
    setApiKeys(loadedKeys);
  }, []);

  const handleSave = () => {
    if (
      selectedApiKey &&
      selectedApiKey?.trim() !== "" &&
      newApiValue.trim() !== ""
    ) {
      // Set the cookie
      setCookie(selectedApiKey, newApiValue, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      // Update the state
      setApiKeys((prevKeys) => {
        const newKeys = prevKeys.filter((key) => key.key !== selectedApiKey);
        return [...newKeys, { key: selectedApiKey, value: newApiValue }];
      });
      setNewApiValue("");
      setSelectedApiKey(undefined);
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API Key",
        variant: "destructive",
      });
    }
  };

  const deleteApiKey = (key: string) => {
    // Remove the cookie
    deleteCookie(key);

    // Update the state
    setApiKeys((prevKeys) => prevKeys.filter((apiKey) => apiKey.key !== key));
    setSelectedApiKey(undefined);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-4 w-3/4 flex space-x-12">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">API Keys</h1>

        <div className="space-y-4">
          {apiKeys
            .sort((a, b) => a.key.localeCompare(b.key))
            .map((apiKey) => (
              <div
                key={apiKey.key}
                className="flex items-center space-x-4 p-2 border rounded"
              >
                <div className="flex-grow flex gap-2 items-center justify-between">
                  <p className="font-semibold">{apiKey.key}</p>
                  <p className="text-sm text-gray-500">
                    {apiKey.value.slice(0, 4) + "•".repeat(8)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <IconButton
                    onClick={() => {
                      setSelectedApiKey(apiKey.key);
                      setNewApiValue(apiKey.value);
                    }}
                    variant="outline"
                    size="sm"
                    icon={PencilIcon}
                  />
                  <IconButton
                    onClick={() => deleteApiKey(apiKey.key)}
                    variant="destructive"
                    size="sm"
                    icon={TrashIcon}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Add new API Key</h1>
        <div className="mb-4 flex flex-col items-start gap-4">
          <Select
            onValueChange={(value) => {
              setSelectedApiKey(value);
              setNewApiValue(""); // Clear textarea when a new API key is selected
            }}
            value={selectedApiKey}
          >
            <SelectTrigger className="w-full flex">
              <SelectValue placeholder="Select API Key" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ApiKeyType).map((apiKeyType) => (
                <SelectItem key={apiKeyType} value={apiKeyType}>
                  <div className="w-full flex">{apiKeyType}</div>
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
      </div>
    </div>
  );
}
