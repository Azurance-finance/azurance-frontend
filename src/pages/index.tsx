import TopBanner from "@/components/TopBanner";
import Table from "../components/Table/table";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Azurance - Products</title>
      </Head>
      <div>
        <TopBanner
          title="Azurance"
          description="Decentralized insurance platform that providing flexible conditions on-chain"
          isCreateInsurance={false}
        />
        <Table />
      </div>
    </>

  );
}
