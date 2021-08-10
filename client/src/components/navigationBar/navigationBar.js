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
                <NavLink to="/createVideogame" >Create videogame</NavLink>
            </span>
            <span>
                <NavLink to="/searchByName"> Barra de busqueda </NavLink>
            </span>                    
        </div>
    )
}

export default NavigationBar;