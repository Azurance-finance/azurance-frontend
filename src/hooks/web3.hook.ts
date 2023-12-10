import { useCallback, useEffect, useState } from "react";
import { useProvider } from "./provider.hook";
import { useWalletStore } from "@/store/wallet/wallet.store";

export const useSecondsPerBlock = (initialVal = 5) => {
    const { provider } = useProvider();
    const currentChainId = useWalletStore();

    const [secondsPerBlock, setSecondsPerBlock] = useState(initialVal);

    const getSecondsPerBlock = useCallback(async () => {
        if (provider) {
            const block = await provider.getBlock('pending');
            const firstBlock = await provider.getBlock(0);

            const timeDiff = block.timestamp - firstBlock.timestamp

            const secondsPerBlock = timeDiff / block.number;
            setSecondsPerBlock(secondsPerBlock);
        }
    }, [provider, currentChainId]);

    useEffect(() => {
        getSecondsPerBlock();
    }, [provider, currentChainId]);


    return {
        secondsPerBlock,
        getSecondsPerBlock
    }
}