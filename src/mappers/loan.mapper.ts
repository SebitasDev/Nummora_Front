import {createMap, forMember, mapFrom, Mapper} from "@automapper/core";
import {FinanceLoanDto} from "@/interfaces/financeLoanDto";
import {FinanceLoanPayload} from "@/api/loan/financeLoan";
import { bigintToString } from "./helpers/bigintToString";
import {sameType} from "@/mappers/helpers/sameType";

export const financeLoanProfile = (mapper: Mapper) => {
    createMap(mapper,
        FinanceLoanDto, 
        FinanceLoanPayload,
        bigintToString<FinanceLoanDto, FinanceLoanPayload>('amount', d => d.amount),
        bigintToString<FinanceLoanDto, FinanceLoanPayload>('interest', d => d.interest),
        bigintToString<FinanceLoanDto, FinanceLoanPayload>('installments', d => d.installments),
        bigintToString<FinanceLoanDto, FinanceLoanPayload>('platformFee', d => d.platformFee),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('lender', d => d.lender),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('borrower', d => d.borrower),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('token', d => d.token),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('dataHash', d => d.dataHash),
    );
    
}