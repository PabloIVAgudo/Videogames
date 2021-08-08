import './navigationBar.css';
import {NavLink} from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';

function NavigationBar() {
    return (
        <div className="barra">
            <span className="navigationLink">
                <NavLink to="/home" >Home</NavLink>
            </span>            
            <span className="navigationLink">
                <NavLink to="/createVideogame" >Crear Videojuego</NavLink>
            </span>
            <span>
                <SearchBar />
            </span>          
        </div>
    )
}

export default NavigationBar;