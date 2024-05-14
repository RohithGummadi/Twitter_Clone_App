import { ChangeEvent, useState } from "react";
import * as _ from "lodash";

export default function SearchBar() {
    const [searchResults, setSearchResult] = useState([]);
    const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

    async function fetchSearchResults(searchText: string) {
        const res = await fetch("/api/search?q=" + searchText);
        if (res.ok) {
            const json = await res.json();
            setSearchResult(json.data);
            console.log(json.data);
        } 
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        debouncedFetchSearchResults(e.target.value);
        console.log(searchResults);
    }

    return (
        <div>
            <input onChange={handleChange} type="change" className="p-2 rounded-lg bg-gray-700 my-2" placeholder="Search"/>
        </div>
    );
}
