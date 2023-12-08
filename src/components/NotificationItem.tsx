import React from "react";
import { Avatar } from "@nextui-org/react";

interface IProps {
  name: string;
  time: string;
  message: string;
}

export default function NotificationItem({ name, time, message }: IProps) {
  return (
    <div className="border-b p-3 hover:bg-pink-100 py-4">
      <div className="flex items-center">
        <Avatar name={name[0]} />
        <div className="ml-3">
          <p className="text-sm">{message}</p>
          <p className="text-gray-400 text-xs">{time}</p>
        </div>
      </div>
    </div>
  );
}
