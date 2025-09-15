import {temporalLoans} from "@/api/loan/temporalLoans";

export const useTemporalLoan = () => {
    
    const getTemporalLoans = async () => 
        await temporalLoans();
    
    return {
        getTemporalLoans
    };
}