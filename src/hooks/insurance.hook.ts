import {
  queryActiveInsurance,
  queryInactiveInsurance,
} from "@/gql/insurance.query";
import { InsuranceType } from "@/store/insurance/insurance.type";
import { useCallback, useMemo, useState } from "react";
import { useSecondsPerBlock } from "./web3.hook";

export const useInsurances = (limit = 100, offset = 0, filter = "Ongoing") => {
  const [insurances, setInsurances] = useState<InsuranceType[]>([]);
  const { secondsPerBlock } = useSecondsPerBlock();

  const fetchInsurances = useCallback(async () => {
    const result =
      filter === "Ongoing"
        ? await queryActiveInsurance(limit, offset)
        : await queryInactiveInsurance(limit, offset);
    if (result)
      setInsurances(
        result.insurancePools.map((item) => ({
          ...item,
          name: item.buyerToken.name.replace("-BUY", ""),
          symbol: item.buyerToken.symbol.replace("-BUY", ""),
          maturityTime: item.maturityTimestamp,
          staleTime: item.staleTimestamp,
        }))
      );
  }, [limit, offset, filter]);

  const computedInsurances = useMemo(() => {
    return insurances.map((item) => ({
      ...item,
      maturityTime: item.maturityTimestamp,
      staleTime: item.staleTimestamp,
    }));
  }, [insurances, secondsPerBlock]);

  return {
    insurances: computedInsurances,
    fetchInsurances,
  };
};
