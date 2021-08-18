import s from './navigationBar.module.css';
import {NavLink, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getVideogames} from '../../actions/index';

function NavigationBar() {
    const dispatch = useDispatch();

    return (
        <div className={s.barra}>
            <span className={s.navigationLink}>
                <Link to="/home" ><button className={s.botonHome} onClick={() => dispatch(getVideogames())}>Home</button></Link>
            </span>            
            <span className={s.navigationLink}>
                <NavLink to="/createVideogame" ><button className={s.botonHome}>Create Videogame</button></NavLink>
            </span>                   
        </div>
    )
}

export default NavigationBar;