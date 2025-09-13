import {Abi, Address} from "viem";

export interface ContractCallProps {
    ContractAddress: Address;
    abi: Abi | readonly unknown[];
    functionName: string;
    args?: readonly unknown[];
}