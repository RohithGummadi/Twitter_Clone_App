import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as _ from "lodash";
import User from "../components/user";

export default function SearchBar() {
    const [searchResults, setSearchResult] = useState([]);
    const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);
    const ref = useRef(null)
    const [visible, setVisible] = useState(true)

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent) => {
            //@ts-ignore
            if(ref.current && !ref.current.contains(e.target)){
                setVisible(false)
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    async function fetchSearchResults(searchText: string) {
        const res = await fetch("/api/search?q=" + searchText);
        if (res.ok) {
            const json = await res.json();
            setVisible(true)
            setSearchResult(json.data);
            console.log(json.data);
        }else{
            setSearchResult([])
            setVisible(false)
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        debouncedFetchSearchResults(e.target.value);
        console.log(searchResults);
    }

    function handleClick(e: React.MouseEvent<HTMLInputElement>){
        setVisible(true)
    }

    return (
        <div className="flex flex-row max-w-md w-full justify-end relative" ref={ref}>
            <input onChange={handleChange} onClick={handleClick} type="change" className="p-2 rounded-lg bg-gray-700 my-2 max-w-xs" placeholder="Search"/>

            {visible && searchResults.length>0 && (
                <ul className="flex flex-col bg-gray-700 absolute p-2 rounded-lg top-14 w-full max-w-sm right-2">
                {
                    searchResults.map((res: UserI)=>{
                        return (
                            <li key={res.id} className="my-3" onClick={()=>{setVisible(false)}}>
                                <User user={res}/>
                            </li>
                        );

                    })
                }
            </ul>

            )}

        </div>
    );
}
