import './searchBar.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {getVideogameByName} from '../../actions/index';

function SearchBar (){
    const [name, setName] = useState("");
    const dispatch = useDispatch();
   
    function handleChangeSearch(event) {        
        setName(event.target.value);       
    }
    
    function handleSearch(event) {        
        event.preventDefault();
        dispatch(getVideogameByName(name));                   
        setName("");
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="searchByName"/>
                <input
                    type="text"
                    id="searchByName"
                    autoComplete= "off"
                    value={name}
                    placeholder="Enter name..."
                    onChange={(e) => handleChangeSearch(e)}
                />                
                <button type="submit">SEARCH</button>         
            </form>       
        </div>
    )
}

export default SearchBar;