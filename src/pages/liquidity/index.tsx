import TableInsurance from "@/components/Table/tableInsurance";
import TopBanner from "@/components/TopBanner";
import { queryActiveInsurance, queryInactiveInsurance } from "@/gql/insurance.query";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { storage } from "@/utils/firebaseStorage";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

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

  // const azurance: any = [];
  const { currentChainId } = useWalletStore();
  const [azurance, setAzurance] = useState<Azurance[]>([]);
  const [filter, setFilter] = useState("Ongoing");


  // TODO: Fix logo image template 
  const getDownloadURLWithBackup = async (currentChainId: string, address: string) => {
    try {
      return await getDownloadURL(ref(storage, `files/${currentChainId}-${address}.png`));
    } catch (e) {
      return `/insurances/AIA.png`
    }
  }


  useEffect(() => {

    const LIMIT = 100;
    const OFFSET = 0;

    const promise = filter === 'Ongoing' ? queryActiveInsurance(LIMIT, OFFSET) : queryInactiveInsurance(LIMIT, OFFSET)

    promise.then(result => {
      if (result) {

        const promises = result.insurancePools.map(async pool => {

          const downloadUrl = await getDownloadURLWithBackup(currentChainId, pool.id);

          return {
            id: pool.id,
            name: pool.buyerToken.name.replace('-BUY', ''),
            symbol: pool.buyerToken.symbol.replace('-BUY', ''),
            // TODO: Fetch APR and calculate
            apr: pool.multiplier / Math.pow(10, pool.multiplierDecimals),
            percentage: 0,
            totalBuyer: pool.buyerShares,
            totalSeller: pool.sellerShares,
            totalSupply: pool.totalShares,

            token: pool.underlyingToken.name,
            tokenSymbol: pool.underlyingToken.symbol,
            tokenLogo: downloadUrl,
            tokenAddress: pool.underlyingToken.id,

            buyerToken: pool.buyerToken.symbol,
            sellerToken: pool.sellerToken.symbol,

            balance: 0,
            // TODO: Calculate block number to time and convert to this format
            duration: "13 May 2024",
            logo: downloadUrl,
          }

        });

        Promise.all(promises).then(result => setAzurance([...result]))
      }
    })

  }, [currentChainId, filter]);

  return (
    <>
      <head>
        <title>Azurance - Liquidity</title>
      </head>
      <div>
        <TopBanner
          title="Your Insurance"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={true}
        />
        <TableInsurance insuranceList={azurance} filter={filter} onChangeFilter={setFilter} />
      </div>
    </>

  );
};

export default Liquidity;
