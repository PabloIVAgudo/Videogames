import './searchBar.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {getVideogameByName} from '../../actions/index';

function SearchBar ({busqueda}){
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const videogameByName = useSelector(e => e.videogameByName);
   
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
            <div>
                <label htmlFor="searchByName"/>
                <input
                    type="text"
                    id="searchByName"
                    autoComplete="off"
                    value={name}
                    placeholder="Ingrese nombre..."
                    onChange={handleChangeSearch}
                />                
                <button onClick={() => busqueda(videogameByName)} type="submit">BUSCAR</button>                
            </div>            
            </form>       
        </div>
    )
}

export default SearchBar;