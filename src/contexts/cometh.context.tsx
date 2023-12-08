import { ComethWallet, ComethProvider } from "@cometh/connect-sdk";
import { Dispatch, SetStateAction, createContext } from "react";

interface ComethContextProps {
  instance: ComethWallet | undefined;
  instanceProvider: ComethProvider | undefined;
  setInstanceProvider?: Dispatch<SetStateAction<ComethProvider | undefined>>;
  setInstance?: Dispatch<SetStateAction<ComethWallet | undefined>>;
}

export const ComethContext = createContext<ComethContextProps>({
  instance: undefined,
  instanceProvider: undefined,
});
