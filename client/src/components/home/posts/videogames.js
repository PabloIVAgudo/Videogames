import s from './videogames.module.css';
import {Link} from 'react-router-dom';

function Videogames ({videogamesMostrados, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <div className={s.tablaVideogames}>
            {videogamesMostrados.map(e => (
                <Link key={e.id} className={s.link} to={`/videogameDetail/${e?.id}`}>
                    <span className={s.unVideogame} key={e.id}>
                        <img className={s.tamañoImagen} src={e.image} alt="Image does not exist"/>
                        <div className={s.overlay}>
                            <p className={s.name}>{e.name}</p>
                            <p className={s.genres}>{e.genres.map(g => g.name).join(', ')}</p>
                        </div>                        
                    </span>
                </Link>
            ))}
        </div>
    )
}
export default Videogames;