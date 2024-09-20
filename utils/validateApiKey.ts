import { Provider } from "@/types/Common.types";
import { getCookie } from "cookies-next";
import { mapProviderToApiKeyName } from "@/utils/mapProviderToApiKeyName";

// only checks if the cookie exists for now
export const validateApiKey = (provider: Provider) => {
    return getCookie(mapProviderToApiKeyName(provider)) !== undefined
};
