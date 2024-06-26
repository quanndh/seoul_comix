import { IoIosSearch } from "react-icons/io";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className=" w-full h-12 flex items-center space-x-2 px-3 py-2 shadow-md rounded-xl">
      <IoIosSearch fontSize={28} className="text-gray-400" />
      <input
        className="w-full h-full border-none outline-none text-gray-400"
        placeholder="맛집 이름을 검색해보세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
