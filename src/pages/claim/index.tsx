import TableStake from "@/components/Table/tableStake";
import TopBanner from "@/components/TopBanner";
import Head from "next/head";
import React from "react";

const Claim = () => {
  return (
    <>
      <Head>
        <title>Azurance - Claim</title>
      </Head>
      <div>
        <TopBanner
          title="Your Stake"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={false}
        />
        <TableStake />
      </div>
    </>

  );
};

export default Claim;
