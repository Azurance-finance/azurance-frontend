import {
    ActiveInsuranceDocument,
    ActiveInsuranceQuery,
    InactiveInsuranceDocument,
    InactiveInsuranceQuery,
    execute,
} from "../../.graphclient";

export function queryActiveInsurance(limit: number, offset: number): Promise<ActiveInsuranceQuery | undefined> {
    return execute(ActiveInsuranceDocument, { $first: offset, $limit: limit }).then(result => result.data);
}

export function queryInactiveInsurance(limit: number, offset: number): Promise<InactiveInsuranceQuery | undefined> {
    return execute(InactiveInsuranceDocument, { $first: offset, $limit: limit }).then(result => result.data);
}