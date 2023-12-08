import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import MainLayout from "@/components/Layout/MainLayout";
import ComethProvider from "@/providers/ComethProvider";
import MetaMaskProvider from "@/providers/MetaMaskProvider";
import ApolloClientProvider from "@/providers/ApolloClientProvider";
import ClientOnly from "@/components/ClientOnly";

import {
  createClient as createGraphClient,
  Provider as GraphPovider,
} from "urql";
import { graphExchange } from "@graphprotocol/client-urql";
import * as GraphClient from "../../.graphclient";
import { graphUrl } from "@/configs/graph.config";

const graphClient = createGraphClient({
  url: graphUrl,
  exchanges: [graphExchange(GraphClient)],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <GraphPovider value={graphClient}>
        <ApolloClientProvider>
          <NextUIProvider>
            <MetaMaskProvider>
              <ComethProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </ComethProvider>
            </MetaMaskProvider>
          </NextUIProvider>
        </ApolloClientProvider>
      </GraphPovider>
    </ClientOnly>
  );
}
