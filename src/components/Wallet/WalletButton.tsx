import React from "react";
import { Button } from "@nextui-org/react";

interface IWalletButton {
  onOpen: () => void;
}

export default function WalletButton({ onOpen }: IWalletButton) {
  return (
    <Button
      onPress={onOpen}
      color="primary"
      className="text-white font-semibold"
    >
      Connect Wallet
    </Button>
  );
}
