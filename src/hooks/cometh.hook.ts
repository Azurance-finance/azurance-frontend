import { ComethContext } from "@/contexts/cometh.context";
import { WalletType } from "@/store/wallet/wallet.type";
import { useWalletStore } from "@/store/wallet/wallet.store";
import { ComethProvider } from "@cometh/connect-sdk";
import { useContext, useState } from "react";

export const useCometh = () => {
  const { instance, instanceProvider, setInstanceProvider, setInstance } =
    useContext(ComethContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccesss, setIsSuccess] = useState(false);
  const { setWalletAddress, setWalletType, setCurrentChainId } =
    useWalletStore();

  const comethConnect = async (walletAddress?: `0x${string}`) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      if (walletAddress) {
        await instance?.connect(walletAddress);
      } else {
        await instance?.connect();
      }
      if (setInstance && setInstanceProvider && instance) {
        setInstance(instance);
        const instanceProvider = new ComethProvider(instance);
        setInstanceProvider(instanceProvider);
        setWalletAddress(instance.getAddress());
        setWalletType(WalletType.cometh);
        setIsSuccess(true);
        setCurrentChainId("0x13881");
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error cometh:", e);
    }
  };

  const signIn = (walletAddress: `0x${string}`) => comethConnect(walletAddress);

  const signUp = () => comethConnect();

  const signOut = async () => {
    try {
      setIsLoading(true);
      if (instance && setInstance && setInstanceProvider) {
        setWalletAddress("");
        setWalletType(WalletType.none);
        await instance.logout();
        const instanceProvider = new ComethProvider(instance);
        setInstance(instance);
        setInstanceProvider(instanceProvider);
        setIsSuccess(false);
        setCurrentChainId("");
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return {
    isSuccesss,
    setIsSuccess,
    isLoading,
    comethProvider: instanceProvider,
    instance,
    signIn,
    signUp,
    signOut,
  };
};
