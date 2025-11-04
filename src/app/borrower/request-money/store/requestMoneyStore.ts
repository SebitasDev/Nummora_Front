import { create } from "zustand";

interface RequestMoneyState {
    amountRequest: number;
    setAmountRequest: (x: number) => void;

    numberOfQuotes: number;
    setNumberOfQuotes: (x: number) => void;

    numberOfMonths: number;
    setNumberOfMonths: (x: number) => void;

    descriptionOfRequest: string | undefined;
    setDescriptionOfRequest: (x: string | undefined) => void;
}


export const useRequestMoneyStore = create<RequestMoneyState>((set) => ({
    amountRequest: 1,
    setAmountRequest: (x) => set({ amountRequest: x }),

    numberOfQuotes: 1,
    setNumberOfQuotes: (x) => set({ numberOfQuotes: x }),

    numberOfMonths: 1,
    setNumberOfMonths: (x) => set({ numberOfMonths: x }),

    descriptionOfRequest: "",
    setDescriptionOfRequest: (x) => set({ descriptionOfRequest: x }),
}));