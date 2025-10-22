import {Address} from "viem";

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";

const NUMMORA_TOKEN_ADDRESS = ((ENVIRONMENT === "dev" ? 
    process.env.NEXT_PUBLIC_DEV_NUMMORA_TOKEN_ADDRESS : process.env.NEXT_PUBLIC_PROD_NUMMORA_TOKEN_ADDRESS)
    || "0xNUMMORA_TOKEN_ADDRESS") as Address;

const NUMMORA_CORE_ADDRESS = ((ENVIRONMENT === "dev" ?
    process.env.NEXT_PUBLIC_DEV_NUMMORA_CORE_ADDRESS : process.env.NEXT_PUBLIC_PROD_NUMMORA_CORE_ADDRESS) 
    || "0xNUMMORA_CORE_ADDRESS") as Address;

const STABLECOIN_ADDRESS = ((ENVIRONMENT === "dev" ?
        process.env.NEXT_PUBLIC_DEV_STABLECOIN_ADDRESS : process.env.NEXT_PUBLIC_PROD_STABLECOIN_ADDRESS)
    || "0xSTABLECOIN_ADDRESS_ADDRESS") as Address;

const BACKEND_URL = (ENVIRONMENT === "dev" ?
        process.env.NEXT_PUBLIC_DEV_BACKEND_URL : process.env.NEXT_PUBLIC_PROD_BACKEND_URL)
    || "http://backend.url";

const DIVVI_CONSUMER = (process.env.NEXT_PUBLIC_DIVVI_CONSUMER || "0xDIVVI_CONSUMER") as Address;

const SELF_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://self.api.url";

const SELF_CALLBACK = process.env.NEXT_PUBLIC_SELF_CALLBACK || "http://self.callback.url";

const SELF_SCOPE = process.env.NEXT_PUBLIC_SELF_SCOPE || "self_scope";

export {
    ENVIRONMENT,
    NUMMORA_TOKEN_ADDRESS,
    NUMMORA_CORE_ADDRESS,
    STABLECOIN_ADDRESS,
    BACKEND_URL,
    DIVVI_CONSUMER,
    SELF_API_URL,
    SELF_CALLBACK,
    SELF_SCOPE
}