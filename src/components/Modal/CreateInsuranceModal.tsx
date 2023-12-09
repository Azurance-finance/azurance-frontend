import { CONTRACT_ADDRESS } from "@/constants/address.constant";
import { LINKS } from "@/constants/links.constant";
import { times } from "@/constants/time.constant";
import { tokens } from "@/constants/token";
import { yieldPlatformObj, yieldPlatforms } from "@/constants/yieldPlatform";
import { useCometh } from "@/hooks/cometh.hook";
import { useProvider } from "@/hooks/provider.hook";
import azuranceFactoryContractService from "@/services/contracts/azuranceFactoryContract";
import { useWalletStore } from "@/store/wallet/wallet.store";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
type CreateInsuranceModalTypes = {
  onOpenChange: () => void;
  isOpen: boolean;
};

const borderedStyle = {
  inputWrapper: `border-1 border-[#D0D5DD]`,
  label: `text-[#5B616E] text-sm font-normal`,
  helperWrapper: `text-[#5B616E] text-sm font-normal`,
};
const triggerStyle = {
  trigger: `border-1 border-[#D0D5DD]`,
  label: `text-[#808080] text-sm font-normal`,
};


const CreateInsuranceModal = ({
  isOpen,
  onOpenChange,
}: CreateInsuranceModalTypes) => {

  const { provider } = useProvider();
  const { currentChainId } = useWalletStore();

  const now = dayjs();
  const [creating, setCreating] = useState(false);
  const [insurance, setInsurance] = useState({
    name: "",
    symbol: "",
    benefitMultiplier: 0,
    expiration: "",
    token: "USDT",
    yieldPlatform: "Lido Finance",
    condition: "",
  });
  const futureDate = now.add(+insurance.expiration, "second");
  const formattedDate = futureDate.format("DD.MM.YYYY h:mm A");

  const handleCreateInsurance = useCallback(async () => {
    setCreating(true);

    try {
      const multiplerDecimals = 6;

      if (provider) {

        const signer = provider.getSigner();

        const block = await provider.getBlock('pending');

        const currentTs = Math.floor(new Date().valueOf() / 1000);
        const maturityTs = currentTs + Number(insurance.expiration)
        const staleTs = currentTs + Math.floor(Number(insurance.expiration) * 0.8);

        const contractAddress = CONTRACT_ADDRESS[currentChainId]['AzruanceFactory'];

        const multipler = insurance.benefitMultiplier * Math.pow(10, multiplerDecimals);
        const maturityBlock = Math.floor(maturityTs * block.number / block.timestamp);
        const staleBlock = Math.floor(staleTs * block.number / block.timestamp);
        const asset = CONTRACT_ADDRESS[currentChainId][insurance.token];
        const fee = 0;
        const feeTo = await signer.getAddress();
        const condition = insurance.condition;
        const name = insurance.name;
        const symbol = insurance.symbol;

        const tx = await azuranceFactoryContractService.createAzuranceContract(contractAddress, signer, multipler, maturityBlock, staleBlock, asset, fee, feeTo, condition, name, symbol);

        alert(`Submit transaction complete: ${tx.hash}`)
      }
    } catch (e) {
      console.error(e);
    }

    setCreating(false);
  }, [provider, currentChainId, insurance]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className=" text-lg font-semibold text-[#0F1419]">
                Create Insurance
              </h1>
              <p className=" text-sm text-[#A3A3A3] font-normal font">
                The created insurance is open for everyone
              </p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className=" space-y-12 overflow-y-scroll h-[420px] py-4 no-scrollbar">
                <Input
                  key="insurance-name"
                  size="lg"
                  radius="sm"
                  type="name"
                  variant="bordered"
                  label="Insurance Name"
                  labelPlacement="outside"
                  placeholder="Enter your insurance name"
                  classNames={borderedStyle}
                  value={insurance.name}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      name: e.target.value,
                    }));
                  }}
                />
                <Input
                  key="insurance-symbol"
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  label="Symbol"
                  labelPlacement="outside"
                  placeholder="Enter your symbol"
                  classNames={borderedStyle}
                  value={insurance.symbol}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      symbol: e.target.value,
                    }));
                  }}
                />
                <Input
                  key="multiplier"
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  label="Benefit Multiplier"
                  labelPlacement="outside"
                  placeholder="0"
                  description="Suggested: 0x, 10x, 20x, 30x. Maximum is 50x"
                  endContent="X"
                  classNames={borderedStyle}
                  type="number"
                  value={insurance.benefitMultiplier.toString()}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      benefitMultiplier: Number(e.target.value),
                    }));
                  }}
                />
                <Select
                  items={times}
                  labelPlacement="outside"
                  label="Insurance Expiration"
                  placeholder="Select date expiration"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  classNames={triggerStyle}
                  value={insurance.expiration}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      expiration: e.target.value,
                    }));
                  }}
                  renderValue={(items) => {
                    return items.map((item: any) => (
                      <div key={item.key} className="flex items-center gap-2">
                        <div className="flex w-full justify-between">
                          <p>{formattedDate}</p>
                          <p className=" text-base font-normal text-[#0F1419]">
                            {item.data.time}
                          </p>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(time) => (
                    <SelectItem key={time.timeExpire} textValue={time.time}>
                      <div className="flex gap-2 items-center">
                        <div className="flex w-full justify-between">
                          <p className="text-small">{time.time}</p>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                <Select
                  labelPlacement="outside"
                  label="Token"
                  placeholder="Select a token"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  classNames={triggerStyle}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      token: e.target.value,
                    }));
                  }}
                  defaultSelectedKeys={[insurance.token]}
                  startContent={
                    insurance.token && (
                      <picture>
                        <img
                          src={`tokens/${insurance.token.toUpperCase()}.png`}
                          width={24}
                          height={24}
                          alt=""
                          className="mr-2"
                        />
                      </picture>
                    )
                  }
                >
                  {tokens.map((token, index) => (
                    <SelectItem
                      key={token.tokenSymbol}
                      value={token.tokenSymbol}
                      startContent={
                        <picture>
                          <img
                            src={token.logo}
                            width={24}
                            height={24}
                            alt=""
                            className="mr-2"
                          />
                        </picture>
                      }
                    >
                      {token.tokenSymbol}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  labelPlacement="outside"
                  label="Yield Platform"
                  // placeholder="Select a yield platform"
                  description={`Estimated APY: ${(yieldPlatformObj[insurance.yieldPlatform].apy * 100).toLocaleString()}%`}
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  classNames={triggerStyle}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      yieldPlatform: e.target.value,
                    }));
                  }}
                  defaultSelectedKeys={[insurance.yieldPlatform]}
                  startContent={
                    insurance.yieldPlatform && (
                      <picture>
                        <img
                          src={`yield/${insurance.yieldPlatform.trim()}.png`}
                          width={24}
                          height={24}
                          alt=""
                          className="mr-2"
                        />
                      </picture>
                    )
                  }
                >
                  {yieldPlatforms.map((yieldPlatfrom, index) => (
                    <SelectItem
                      key={yieldPlatfrom.name}
                      value={yieldPlatfrom.name}
                      startContent={
                        <picture>
                          <img
                            src={yieldPlatfrom.logo}
                            width={24}
                            height={24}
                            alt=""
                            className="mr-2"
                          />
                        </picture>
                      }
                    >
                      {yieldPlatfrom.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  key="condition"
                  size="lg"
                  radius="sm"
                  type="name"
                  variant="bordered"
                  label="Condition Contract"
                  labelPlacement="outside"
                  placeholder="Contract address"
                  classNames={borderedStyle}
                  value={insurance.condition}
                  description={<a href={LINKS.conditionContractGuide} target="_blank">Get a condition contract here</a>}
                  onChange={(e) => {
                    setInsurance((prevInsurance) => ({
                      ...prevInsurance,
                      condition: e.target.value,
                    }));
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                onPress={onClose}
                className="w-1/2 border-1 border-[#D0D5DD] text-[#404040]"
              >
                Cancel
              </Button>
              <Button color="primary" isLoading={creating} onPress={handleCreateInsurance} className="w-1/2">
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateInsuranceModal;
