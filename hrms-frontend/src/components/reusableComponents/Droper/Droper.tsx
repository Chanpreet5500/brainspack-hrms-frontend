"use client";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";

interface DroperProps {
  open: boolean;
  setOpen: any;
}
const Droper: React.FC<DroperProps> = ({ open, setOpen }) => {
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
