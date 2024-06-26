"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  text: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

interface ChipListProps {
  data: Array<{ text: string; value: string }>;
  onChange: (value: string) => void;
}

const Chip: React.FC<Props> & { List: typeof ChipList } = ({
  id,
  text,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
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

const ChipList: React.FC<ChipListProps> = ({ data, onChange }) => {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    onChange(active !== -1 ? data[active].value : "");
  }, [active]);

  const handleClick = (id: number) => {
    setActive((prev) => {
      if (prev === id) return -1;
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
          isActive={active === index}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

Chip.List = ChipList;

export default Chip;
