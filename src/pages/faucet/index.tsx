import TableFaucet from "@/components/Table/tableFaucet";
import TopBanner from "@/components/TopBanner";
import { tokens } from "@/constants/mockTableData";
import React from "react";

const Faucet = () => {
  return (
    <>
      <head>
        <title>Azurance - Claim</title>
      </head>
      <div>
        <TopBanner
          title="Faucet"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={false}
        />
        <TableFaucet dataTable={tokens} />
      </div>
    </>
  );
};

export default Faucet;
