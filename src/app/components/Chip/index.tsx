"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  text: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

interface ChipListProps {
  value?: string;
  data: Array<{ text: string; value: string }>;
  onChange: (value: string) => void;
}

const Chip: React.FC<Props> & { List: typeof ChipList } = ({
  id,
  text,
  value,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(value)}
      className={classNames(
        "w-fit h-18 px-3 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer",
        {
          "text-slate-500 bg-gray-100": !isActive,
          "text-white bg-primary": isActive,
        }
      )}
    >
      {text}
    </div>
  );
};

const ChipList: React.FC<ChipListProps> = ({ value, data, onChange }) => {
  const [active, setActive] = useState(value ?? "");

  useEffect(() => {
    onChange(active);
  }, [active]);

  const handleClick = (id: string) => {
    setActive((prev) => {
      if (prev === id) return "";
      return id;
    });
  };

  return (
    <div className="w-full overflow-x-scroll flex space-x-3 no-scrollbar">
      {data.map((item, index) => (
        <Chip
          key={index}
          {...item}
          id={index}
          isActive={active === item.value}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

Chip.List = ChipList;

export default Chip;
