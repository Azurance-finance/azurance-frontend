import { ComethSigner } from "@cometh/connect-sdk";
import { JsonRpcSigner } from "@ethersproject/providers";

export const signMessage = async (
  message: string,
  signer: ComethSigner | JsonRpcSigner
) => {
  return signer.signMessage(message);
};
