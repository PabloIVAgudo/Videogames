import s from './pageInicio.module.css';
import {Link} from 'react-router-dom';

function PageInicio() {
  return (
    <div className={s.landingPage}>
        <Link to="/home">
            <img className={s.botonToHome} src="https://i.ibb.co/MScgNwQ/start-Button.png"/>
        </Link>
    </div>
  );
}

export default PageInicio;