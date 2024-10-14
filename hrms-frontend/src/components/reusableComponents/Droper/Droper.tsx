"use client";
import { appdroperdata, dangerdroperdata } from "@/constants/constants";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import { useState } from "react";

interface DroperProps {
  open: boolean;
  setopen: any;
}
const Droper: React.FC<DroperProps> = ({ open, setopen }) => {
  return (
    <>
      <div className="cursor-pointer">
        {open ? (
          <IconChevronCompactUp stroke={2} size={15} color="black" />
        ) : (
          <IconChevronCompactDown stroke={2} size={15} color="black" />
        )}
      </div>
    </>
  );
};
export default Droper;
