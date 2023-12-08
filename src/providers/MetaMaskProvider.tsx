import { MetaMaskProvider as MetaMask } from "@metamask/sdk-react";
export default function MetaMaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MetaMask
      debug={false}
      sdkOptions={{
        logging: {
          developerMode: false,
        },
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Shout Protocol",
          // url: window.location.host,
        },
      }}
    >
      {children}
    </MetaMask>
  );
}
