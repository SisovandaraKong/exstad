import React from "react";

type Props = {
  total: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const ProgramSearch: React.FC<Props> = ({ total, searchValue, setSearchValue }) => {
  return (
    <div className="flex  justify-between items-center mb-4">
      <h3 className="font-medium text-[20px] text-foreground">
        Total {total} Courses Found
      </h3>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Your Course..."
        className="bg-white text-black rounded-full border border-primary p-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default ProgramSearch;
