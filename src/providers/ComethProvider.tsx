import {
  ComethProvider as Provider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { useEffect, useState } from "react";

import { ComethContext } from "@/contexts/cometh.context";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { WalletType } from "@/store/wallet/wallet.type";
import { Spinner } from "@nextui-org/spinner";

const API_KEY = process.env.NEXT_PUBLIC_COMETH_API_KEY || "";

export default function ComethProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instance, setInstance] = useState<ComethWallet>();
  const [instanceProvider, setInstanceProvider] = useState<Provider>();
  const { walletAddress, walletType } = useWalletStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const walletAdaptor = new ConnectAdaptor({
      chainId: SupportedNetworks.MUMBAI,
      apiKey: API_KEY,
    });

    const instance = new ComethWallet({
      authAdapter: walletAdaptor,
      apiKey: API_KEY,
    });

    (async () => {
      if (walletAddress.length > 0 && walletType === WalletType.cometh) {
        try {
          await instance.connect(walletAddress);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }

      const instanceProvider = new Provider(instance);
      setInstance(instance);
      setInstanceProvider(instanceProvider);
      setLoading(false);
    })();
    console.log("connect cometh instance");
  }, []);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  return (
    <ComethContext.Provider
      value={{
        instance: instance,
        instanceProvider: instanceProvider,
        setInstanceProvider,
        setInstance,
      }}
    >
      {children}
    </ComethContext.Provider>
  );
}
