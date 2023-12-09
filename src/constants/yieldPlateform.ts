export const yieldPlatforms = [
  {
    name: "Lido Finance",
    url: "/",
    logo: "yield/Lido Finance.png",
    apy: 0.038
  },
  {
    name: "Compound",
    url: "/",
    logo: "yield/Compound.png",
    apy: 0.043
  },
  {
    name: "Saving DAI",
    url: "/",
    logo: "yield/Saving DAI.png",
    apy: 0.05
  },
];

type YieldPlatform = typeof yieldPlatforms[0];

export const yieldPlatformObj = yieldPlatforms.reduce((prev, cur) => {
  prev[cur.name] = cur;
  return prev;
}, {} as Record<string, YieldPlatform>)