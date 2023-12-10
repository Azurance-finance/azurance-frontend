import TableInsurance from "@/components/Table/tableInsurance";
import TopBanner from "@/components/TopBanner";
import Head from "next/head";
import React from "react";

type Azurance = {
  id: string,
  name: string,
  symbol: string,
  apr: number,
  percentage: number,
  totalBuyer: number,
  totalSeller: number,
  totalSupply: number,

  token: string;
  tokenSymbol: string;
  tokenLogo: string;

  buyerToken: string;
  sellerToken: string;

  balance: number,
  duration: string,
  logo: string,
}

const Liquidity = () => {

  return (
    <>
      <Head>
        <title>Azurance - Liquidity</title>
      </Head>
      <div>
        <TopBanner
          title="Your Insurance"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={true}
        />
        <TableInsurance />
      </div>
    </>

  );
};

export default Liquidity;
