import {
  BellIcon as SolidBellIcon,
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";

export const FEED_TYPE_MENU = {
  All: "-1",
  TT: "1",
  Spark: "2",
  Compound: "3",
  Ape: "4",
  FileCoin: "5",
};

export const MENU = [
  {
    name: "Products",
    // icon: HomeIcon,
    // solidIcon: SolidHomeIcon,
    path: "/",
  },
  {
    name: "Liquidity",
    // icon: BellIcon,
    // solidIcon: SolidBellIcon,
    path: "/liquidity",
  },
  {
    name: "Claim",
    // icon: UserIcon,
    // solidIcon: SolidUserIcon,
    path: "/claim",
  },
  {
    name: "Faucet",
    // icon: UserIcon,
    // solidIcon: SolidUserIcon,
    path: "/faucet",
  },
];
