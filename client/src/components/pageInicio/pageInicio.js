import './pageInicio.css';
import {Link} from 'react-router-dom';

function PageInicio() {
  return (
    <div className="PageInicio">
        <Link to="/home">
            <button>Ir a home</button>
        </Link>
    </div>
  );
}

export default PageInicio;