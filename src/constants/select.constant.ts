import {
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export const tabSelect = [
  {
    label: "Watchlist",
    value: "Watchlist",
    icon: StarIcon,
  },
  {
    label: "Ongoing",
    value: "Ongoing",
    icon: CheckCircleIcon,
  },
  {
    label: "Ended",
    value: "Ended",
    icon: XCircleIcon,
  },
];

export const tabClaimSelect = [
  {
    label: "Ongoing",
    value: "Ongoing",
    icon: CheckCircleIcon,
  },
  {
    label: "Claimable",
    value: "Claimable",
    icon: CheckCircleIcon,
  },
];
