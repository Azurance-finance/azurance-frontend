import TableStake from "@/components/Table/tableStake";
import TopBanner from "@/components/TopBanner";
import { stake } from "@/constants/mockTableData";
import React from "react";

const Claim = () => {
  return (
    <>
      <head>
        <title>Azurance - Claim</title>
      </head>
      <div>
        <TopBanner
          title="Your Stake"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={false}
        />
        <TableStake dataTable={stake} />
      </div>
    </>

  );
};

export default Claim;
