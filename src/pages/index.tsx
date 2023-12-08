import TopBanner from "@/components/TopBanner";
import Table from "../components/Table/table";
import { azurance } from "@/constants/mockTableData";

export default function Home() {
  return (
    <div>
      <TopBanner
        title="Azurance"
        description="Decentralized insurance platform that providing flexible conditions on-chain"
        isCreateInsurance={false}
      />
      <Table data={azurance} />
    </div>
  );
}
