import { tokens } from "@/constants/token";
import { yieldPlatforms } from "@/constants/yieldPlateform";
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
import React, { useEffect, useState } from "react";
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
export const users = [
  {
    id: 1,
    time: "1 year",
    timeExpire: "1",
  },
  {
    id: 2,
    time: "2 years",
    timeExpire: "2",
  },
];
const CreateInsuranceModal = ({
  isOpen,
  onOpenChange,
}: CreateInsuranceModalTypes) => {
  const [isToken, setIsToken] = useState("USDT");
  const [isYield, setIsYield] = useState("Lido Finance");
  const [timeExpire, setTimeExpire] = useState("");

  const now = dayjs();

  const futureDate = now.add(+timeExpire, "year");

  const formattedDate = futureDate.format("DD.MM.YYYY h:mm A");
  console.log("timeExpire", timeExpire);

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
                This insurance doesn’t support lazy minting
              </p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className=" space-y-12 overflow-y-scroll h-[420px] py-4 no-scrollbar">
                <Input
                  key="outside"
                  size="lg"
                  radius="sm"
                  type="name"
                  variant="bordered"
                  label="Insurance Name"
                  labelPlacement="outside"
                  placeholder="Enter your insurance name"
                  classNames={borderedStyle}
                />
                <Input
                  key="outside"
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  label="Symbol"
                  labelPlacement="outside"
                  placeholder="Enter your symbol"
                  classNames={borderedStyle}
                />
                <Input
                  key="outside"
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
                />
                <Select
                  items={users}
                  labelPlacement="outside"
                  label="Insurance expiration"
                  placeholder="Select date expiration"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  onChange={(e) => setTimeExpire(e.target.value)}
                  classNames={triggerStyle}
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
                  {(user) => (
                    <SelectItem key={user.id} textValue={user.timeExpire}>
                      <div className="flex gap-2 items-center">
                        <div className="flex w-full justify-between">
                          <p className="text-small">{user.time}</p>
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
                  value={isToken}
                  onChange={(e) => {
                    setIsToken(e.target.value);
                  }}
                  defaultSelectedKeys={[isToken]}
                  startContent={
                    isToken && (
                      <picture>
                        <img
                          src={`tokens/${isToken.toUpperCase()}.png`}
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
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  classNames={triggerStyle}
                  onChange={(e) => {
                    setIsYield(e.target.value);
                  }}
                  defaultSelectedKeys={[isYield]}
                  startContent={
                    isYield && (
                      <picture>
                        <img
                          src={`yield/${isYield.trim()}.png`}
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
                  key="outside"
                  size="lg"
                  radius="sm"
                  type="name"
                  variant="bordered"
                  label="Condition"
                  labelPlacement="outside"
                  placeholder="Url"
                  classNames={borderedStyle}
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
              <Button color="primary" onPress={onClose} className="w-1/2">
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
