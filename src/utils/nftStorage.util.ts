import { NFTStorage, File } from "nft.storage";

export const nftStorageUpload = async (
  file: File,
  name: string,
  description: string
) => {
  const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || "";
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  return nftstorage.store({
    image: file,
    name,
    description,
  });
};
