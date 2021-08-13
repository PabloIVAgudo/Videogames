import './videogames.css';
import {Link} from 'react-router-dom';

function Videogames ({videogamesMostrados, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <div className="tablaVideogames">
            {videogamesMostrados.map(e => (
                <span className="unVideogame" key={e.id}>
                    <img className="tamañoImagen" src={e.image} alt="Image does not exist"/>
                    <p>{e.name}</p>
                    <p>{e.genres.map(g => g.name).join(', ')}</p>
                    <Link to={`/videogameDetail/${e?.id}`}>
                        <button>Detalles</button>
                    </Link>
                </span>
            ))}
        </div>
    )
}
export default Videogames;