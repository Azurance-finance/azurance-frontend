import TableInsurance from "@/components/Table/tableInsurance";
import TopBanner from "@/components/TopBanner";
import { azurance } from "@/constants/mockTableData";
import React from "react";

const Insurance = () => {
  return (
    <div>
      <TopBanner
        title="Your Insurance"
        description="Decentralized insurance platform that providing flexible conditions on-chain"
        isCreateInsurance={true}
      />
      <TableInsurance dataTable={azurance} />
    </div>
  );
};

export default Insurance;
