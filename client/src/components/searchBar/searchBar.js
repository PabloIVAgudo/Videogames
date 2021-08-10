import './searchBar.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {getVideogameByName} from '../../actions/index';
import NavigationBar from '../navigationBar/navigationBar'

function SearchBar (){
    const [name, setName] = useState("")
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
            <NavigationBar />         
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
                    <button type="submit">BUSCAR</button>                            
            </div>            
            </form> 
            <div className="tablaVideogamesSearched">
                {videogameByName.map(e => (
                <span className="unVideogameSearched" key={e.id}>
                    <img className="tamañoImagenSearched" src={e.image} alt="Image not found"/>
                    <p>{e.name}</p>
                    <p>{e.genres.map(g => g.name).join(',')}</p>
                    <Link to={`/videogameDetail/${e?.id}`}>
                        <button>Detalles</button>
                    </Link>
                </span>
            ))}
            </div>
        </div>
    )
}

export default SearchBar;