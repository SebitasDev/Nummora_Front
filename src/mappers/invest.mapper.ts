import {createMap, Mapper} from "@automapper/core";
import {FinanceLoanDto} from "@/interfaces/financeLoanDto";
import {FinanceLoanPayload} from "@/api/loan/financeLoan";
import {sameType} from "@/mappers/helpers/sameType";
import {InvestDto} from "@/interfaces/investDto";
import {InvestPayload} from "@/api/investment/invest";

export const investProfile = (mapper: Mapper) => {
    createMap(mapper,
        InvestDto,
        InvestPayload,
        sameType<InvestDto, InvestPayload, number>('amount', d => d.amount),
        sameType<InvestDto, InvestPayload, string>('userAddress', d => d.userAddress),
        sameType<InvestDto, InvestPayload, string>('tokenAddress', d => d.tokenAddress),
        sameType<InvestDto, InvestPayload, string>('signature', d => d.signature),
    );

}