import s from './searchBar.module.css';
import {useDispatch} from 'react-redux';
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
        if(name === ""){
            return alert("Search field should not be empty");
        }
        dispatch(getVideogameByName(name));                   
        setName("");
    }

    return (
        <div className={s.bodySearch}>
            <div className={s.searchbar}>
                <form onSubmit={handleSearch}>
                    <label htmlFor="searchByName"/>
                    <input
                        className={s.inputSearch}
                        type="text"
                        id="searchByName"
                        autoComplete= "off"
                        value={name}
                        placeholder=" Enter name..."
                        onChange={(e) => handleChangeSearch(e)}
                    />                
                    <button className={s.botonSubmit} type="submit">Search</button>         
                </form>       
            </div>
        </div>
        
    )
}

export default SearchBar;