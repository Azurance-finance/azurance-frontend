import React from "react";
const columns = [
  {
    field: "insuranceName",
    headerName: "Insurance Name",
    sortable: false,
    width: "15%",
  },
  { field: "asset", headerName: "Asset", sortable: false, width: "15%" },
  { field: "benefit", headerName: "Benefit", sortable: true, width: "8%" },
  {
    field: "utilization",
    headerName: "Utilization",
    sortable: false,
    width: "15%",
  },
  {
    field: "totalSupply",
    headerName: "Total Supply",
    sortable: false,
    width: "10%",
  },
  {
    field: "expiration",
    headerName: "Expiration",
    sortable: true,
    width: "30%",
  },
];

const columnsInsurance = [
  {
    field: "insuranceName",
    headerName: "Insurance Name",
    sortable: false,
    width: "15%",
  },
  { field: "asset", headerName: "Asset", sortable: false, width: "15%" },
  { field: "yield", headerName: "Yield", sortable: true, width: "10%" },
  {
    field: "totalSupply",
    headerName: "Total Supply",
    sortable: false,
    width: "15%",
  },
  {
    field: "utilization",
    headerName: "Utilization",
    sortable: false,
    width: "10%",
  },
  {
    field: "expiration",
    headerName: "Expiration",
    sortable: true,
    width: "30%",
  },
];

const columnsStake = [
  {
    field: "insuranceName",
    headerName: "Insurance Name",
    sortable: false,
    width: "25%",
  },
  { field: "asset", headerName: "Asset", sortable: false, width: "25%" },
  {
    field: "buyerBalance",
    headerName: "Buyer Balance",
    sortable: false,
    width: "15%",
  },
  {
    field: "sellerBalance",
    headerName: "Seller Balance",
    sortable: true,
    width: "15%",
  },

  {
    field: "claimDate",
    headerName: "Claim Date",
    sortable: true,
    width: "20%",
  },
];

const columnsToken = [
  {
    field: "token",
    headerName: "Token",
    sortable: false,
    width: "20%",
  },
  { field: "balance", headerName: "Balance", sortable: false, width: "20%" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const azurance = [
  {
    id: "1",
    insuranceName: "Allianz",
    symbol: "ALV",
    price: 1417.23,
    apr: 4.5,
    percentage: 35.2,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 2594.11,
    duration: "13 May 2024",
    logo: "insurances/ALV.png",
  },
  {
    id: "2",
    insuranceName: "AON",
    symbol: "AON",
    price: 1509.23,
    apr: 4.3,
    percentage: 50.26,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 12654.25,
    duration: "13 May 2024",
    logo: "insurances/AON.png",
  },
  {
    id: "3",
    insuranceName: "AXA",
    symbol: "AXA",
    price: 1498.12,
    apr: 4.1,
    percentage: 31.23,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 4423.97,
    duration: "13 May 2024",
    logo: "insurances/AXA.png",
  },
  {
    id: "4",
    insuranceName: "Thailife",
    symbol: "THA",
    price: 1650.01,
    apr: 3.8,
    percentage: 49.83,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 79811.62,
    duration: "13 May 2024",
    logo: "insurances/THA.png",
  },
  {
    id: "5",
    insuranceName: "AIA",
    symbol: "AIA",
    price: 1715.89,
    apr: 3.8,
    percentage: 25.8,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 9652.49,
    duration: "13 May 2024",
    logo: "insurances/AIA.png",
  },
  {
    id: "6",
    insuranceName: "MTL",
    symbol: "MTL",
    price: 1417.23,
    apr: 3.8,
    percentage: 25.8,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 9652.49,
    duration: "13 May 2024",
    logo: "insurances/MTL.png",
  },
];

const stake = [
  {
    id: "1",
    insuranceName: "Allianz",
    symbol: "ALV",
    price: 1417.23,
    apr: 4.5,
    percentage: 35.2,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 2594.11,
    token: "Dai Stablecoin",
    tokenSymbol: "DAI",
    tokenLogo: "tokens/DAI.png",
    balance: 102.35,
    duration: "13 May 2024",
    logo: "insurances/ALV.png",
  },
  {
    id: "2",
    insuranceName: "AON",
    symbol: "AON",
    price: 1509.23,
    apr: 4.3,
    percentage: 50.26,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 12654.25,
    token: "Dai Stablecoin",
    tokenSymbol: "DAI",
    tokenLogo: "tokens/DAI.png",
    balance: 102.35,
    duration: "13 May 2024",
    logo: "insurances/AON.png",
  },
  {
    id: "3",
    insuranceName: "AXA",
    symbol: "AXA",
    price: 1498.12,
    apr: 4.1,
    percentage: 31.23,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 4423.97,
    token: "Ethereum",
    tokenSymbol: "ETH",
    tokenLogo: "tokens/ETH.png",
    balance: 102.35,
    duration: "13 May 2024",
    logo: "insurances/AXA.png",
  },
  {
    id: "4",
    insuranceName: "Thailife",
    symbol: "THA",
    price: 1650.01,
    apr: 3.8,
    percentage: 49.83,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 79811.62,
    token: "Tether",
    tokenSymbol: "Compound",
    tokenLogo: "tokens/USDT.png",
    balance: 102.35,
    duration: "13 May 2024",
    logo: "insurances/THA.png",
  },
  {
    id: "5",
    insuranceName: "AIA",
    symbol: "AIA",
    price: 1715.89,
    apr: 3.8,
    percentage: 25.8,
    totalBuyer: 1000,
    totalSeller: 2441,
    totalSupply: 9652.49,
    token: "Ethereum",
    tokenSymbol: "ETH",
    tokenLogo: "tokens/ETH.png",
    balance: 102.35,
    duration: "13 May 2024",
    logo: "insurances/AIA.png",
  },
];

const tokens = [
  {
    tokenName: "DAI",
    tokenSymbol: "DAI",
    tokenAddress: "0xEa5363305017B2A6fD0d72Ba830513c678a2f1fE",
    tokenLogo: "tokens/DAI.png",
    tokenDecimal: 18,
  },
  {
    tokenName: "WETH",
    tokenSymbol: "WETH",
    tokenAddress: "0x68cF7D5CEC3f8Cd69d7Bd842e1665818E46E2126",
    tokenLogo: "tokens/WETH.png",
    tokenDecimal: 18,
  },
  {
    tokenName: "USDT",
    tokenSymbol: "USDT",
    tokenAddress: "0x38430d2703246F986685F68E2817CB370F5f3CCD",
    tokenLogo: "tokens/USDT.png",
    tokenDecimal: 18,
  },
];

export {
  columns,
  azurance,
  stake,
  tokens,
  statusOptions,
  columnsStake,
  columnsInsurance,
  columnsToken,
};
