import { IconSearch } from "@tabler/icons-react";

interface SearchbarProps {
    value: string,
    handleSearch: any,
    placeholder: string,
    classname: string,
    iconcolor: string

}

const Searchbar: React.FC<SearchbarProps> = ({ value, handleSearch, placeholder, classname, iconcolor }) => {
    return (
        <div className="relative">
            <span className="absolute  flex items-center top-2 pl-3">
                <IconSearch color={iconcolor} />
            </span>
            <input
                type="text"
                placeholder={placeholder}
                className={`w-full pl-10 pr-4 py-2 rounded-full mb-4 border border-gray-300 focus:outline-none focus:border focus:border-black ${classname}`}
                value={value}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Searchbar;