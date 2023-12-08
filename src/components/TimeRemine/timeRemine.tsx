import { Divider } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowRightIcon } from "../../../public/icons/ArrowRightIcon";
import { Duration } from "./duration";
import { ClaimDate } from "./claimDate";

interface TimeRemineProps {
  timeData: number;
  type?: string;
}

export default function TimeRemine({ timeData, type }: TimeRemineProps) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeOver, setTimeOver] = useState(false);
  const [isDate, setIsDate] = useState("");
  const [isTime, setIsTime] = useState("");

  const getRemaningTime = () => {
    const now = new Date().valueOf();
    const _time = new Date(timeData * 1000 - now).valueOf();
    const _formatTimeData = new Date(timeData * 1000);
    setIsDate(format(_formatTimeData, "dd MMM yyyy"));
    setIsTime(format(_formatTimeData, "p"));
    if (now >= new Date(timeData * 1000).valueOf()) {
      setTimeOver(true);
    } else {
      setTimeOver(false);
    }
    const days = Math.floor(_time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((_time / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((_time / (60 * 1000)) % 60);
    const seconds = Math.floor((_time / 1000) % 60);
    setRemainingTime({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    if (timeData) {
      const handler = setInterval(() => {
        getRemaningTime();
      }, 1000);

      return () => clearInterval(handler);
    }
  }, [timeData, getRemaningTime]);

  const renderTimeRemine = () => {
    if (type === "stake") {
      return <ClaimDate remainingTime={remainingTime} />;
    } else {
      return (
        <Duration
          remainingTime={remainingTime}
          isDate={isDate}
          isTime={isTime}
        />
      );
    }
  };

  return (
    <div>
      {timeOver ? (
        <p className="text-red-500 font-medium">TIME OVER</p>
      ) : (
        renderTimeRemine()
      )}
    </div>
  );
}
