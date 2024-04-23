"use client";

import {
  IoBatteryCharging,
  IoBatteryDead,
  IoBatteryFull,
  IoBatteryHalf,
} from "react-icons/io5";
import { useBattery } from "react-use";

export default function BatteryLevel() {
  const { level, charging } = useBattery();
  const levelPercent =
    typeof level === "number" ? Math.floor(level * 100) : "00";
  const getBatteryIcon = () => {
    if (typeof level !== "number") {
      return <IoBatteryFull className="text-3xl " />;
    } else if (levelPercent >= 80 && charging) {
      return <IoBatteryCharging className="text-3xl text-blue-600" />;
    } else if (levelPercent > 10 && charging) {
      return <IoBatteryCharging className="text-3xl text-green-600" />;
    } else if (levelPercent <= 10 && charging) {
      return <IoBatteryCharging className="text-3xl text-red-600" />;
    } else if (levelPercent >= 80) {
      return <IoBatteryFull className="text-3xl text-blue-600" />;
    } else if (levelPercent > 10) {
      return <IoBatteryHalf className="text-3xl text-green-600" />;
    } else if (levelPercent <= 10) {
      return <IoBatteryDead className="text-3xl text-red-600" />;
    }
  };
  return (
    <div className="fixed right-12 top-4 z-[300] hidden flex-row items-center justify-center gap-x-1 lg:flex">
      {getBatteryIcon()}
      <p className="select-none">{levelPercent + "%"}</p>
    </div>
  );
}
