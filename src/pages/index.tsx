import TopBanner from "@/components/TopBanner";
import Table from "../components/Table/table";

export default function Home() {
  return (
    <>
      <head>
        <title>Azurance - Products</title>
      </head>
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
