import './paginadoHome.css';
import {Link} from 'react-router-dom';

function Paginado ({videogamesPorPagina, videogamesTotales, paginado}) {
    const numeroDePaginas=[];
    for(var i= 1; i<=Math.ceil(videogamesTotales/videogamesPorPagina) ; i++){
        numeroDePaginas.push(i);
    }
    return (
        <div>
            {numeroDePaginas.map(e => (
                <span key={e}>
                    <Link to="/home">
                        <button onClick={() => paginado(e)}>{e}</button>
                    </Link>
                </span>
            ))}
        </div>
    )
}

export default Paginado;