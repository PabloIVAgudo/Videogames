import './navigationBar.css';
import {NavLink} from 'react-router-dom';

function NavigationBar() {
    return (
        <div>
            <span className="navigationLink">
                <NavLink to="/home" >Home</NavLink>
            </span>            
            <span className="navigationLink">
                <NavLink to="/createVideogame" >Crear Videojuego</NavLink>
            </span>          
        </div>
    )
}

export default NavigationBar;