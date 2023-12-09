import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import SuccessIcon from "../Icon/SuccessIcon";
type StatusModalTypes = {
  isOpen: boolean;
  isLoading: boolean;
  title?: string;
  description?: string;
  onOpenChange: () => void;
  isFooter: boolean;
};
const StatusModal = ({
  onOpenChange,
  isLoading,
  isOpen,
  title,
  description,
  isFooter,
}: StatusModalTypes) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody className={!isFooter ? `pt-12 pb-20` : `py-16`}>
              <div className="mb-3 flex justify-center">
                {isLoading ? <span className="loader" /> : <SuccessIcon />}
              </div>
              <div className="flex flex-col justify-center text-center space-y-2">
                <h3 className="my-auto text-black text-base font-semibold">
                  {title}
                </h3>
                <p className="my-auto text-sm font-light">
                  {description}
                </p>
              </div>
            </ModalBody>
            {isFooter && (
              <ModalFooter className=" text-center pb-6">
                {isLoading ? (
                  <p className="w-full text-[#A3A3A3] text-sm font-normal cursor-pointer">
                    Confirm this transaction in your wallet
                  </p>
                ) : (
                  <p className="w-full text-[#0052FF] text-sm font-normal cursor-pointer">
                    View on Etherscan
                  </p>
                )}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default StatusModal;
