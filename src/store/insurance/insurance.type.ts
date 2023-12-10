import { ActiveInsuranceQuery } from "../../../.graphclient";

export type InsuranceType = ActiveInsuranceQuery['insurancePools'][number] & {
    name: string,
    symbol: string,
    maturityTime: number,
    staleTime: number
}