export const AZURANCE_CHECKER_ABI = [
    {
        "type": "function",
        "name": "checkUnlockClaim",
        "inputs": [
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "checkUnlockTerminate",
        "inputs": [
            {
                "name": "target",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
] as const;
