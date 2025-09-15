import {createMap, Mapper} from "@automapper/core";
import {FinanceLoanDto} from "@/interfaces/financeLoanDto";
import {FinanceLoanPayload} from "@/api/loan/financeLoan";
import {sameType} from "@/mappers/helpers/sameType";

export const financeLoanProfile = (mapper: Mapper) => {
    createMap(mapper,
        FinanceLoanDto, 
        FinanceLoanPayload,
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('lender', d => d.lenderAddress),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('loanId', d => d.loanId),
        sameType<FinanceLoanDto, FinanceLoanPayload, string>('dataHash', d => d.dataHash),
    );
    
}