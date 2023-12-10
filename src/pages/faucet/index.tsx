import TableFaucet from "@/components/Table/tableFaucet";
import TopBanner from "@/components/TopBanner";
import { tokens } from "@/constants/mockTableData";
import Head from "next/head";
import React from "react";

const Faucet = () => {
  return (
    <>
      <Head>
        <title>Azurance - Claim</title>
      </Head>
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
