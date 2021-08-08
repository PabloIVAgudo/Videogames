import './searchBar.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState,useEffect} from 'react';
import {getVideogameByName} from '../../actions/index';

function SearchBar (){
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    const videogameByName = useSelector(e => e.videogameByName);

    useEffect(() => {
        dispatch(getVideogameByName(name))
    },[dispatch]);

    function handleChange(event) {
        setName(event.target.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getVideogameByName(name));
    }

    return (
        <span>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name"/>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={name}
                    placeholder="Ingrese nombre..."
                    onChange={handleChange}
                />
                <button type="submit">BUSCAR</button>
            </div>            
            </form>
        </span>
    )
}

export default SearchBar;