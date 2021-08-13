import './navigationBar.css';
import {NavLink} from 'react-router-dom';

function NavigationBar() {
    return (
        <div className="barra">
            <span className="navigationLink">
                <NavLink to="/home" >Home</NavLink>
            </span>            
            <span className="navigationLink">
                <NavLink to="/createVideogame" >Create videogame</NavLink>
            </span>                   
        </div>
    )
}

export default NavigationBar;