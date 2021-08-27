import s from './videogames.module.css';
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';

function Videogames ({videogamesMostrados, loading, opcion}) {
    if(loading){
        return <div className={s.loader}><Loader type="Circles" color="#fafafa" height={100} width={100}/></div>
    }
    if(videogamesMostrados[0] === "No match"){
        return <div><h1 className={s.opcion}>There's no videogame with that name.</h1></div>
    }
    return (
        <div>
            {opcion.length === 0 ? 
                <div className={s.tablaVideogames}>
                {videogamesMostrados.map(e => (
                    <Link key={e.id} className={s.link} to={`/videogameDetail/${e?.id}`}>
                        <span className={s.unVideogame} key={e.id}>
                            <img className={s.tamañoImagen} src={e.image} alt="Image does not exist"/>
                            <div className={s.overlay}>
                                <p className={s.name}>{e.name}</p>
                                <p className={s.genres}>{e.genres.map(g => g.name).join(', ')}</p>
                                <p className={s.genres}>{e.rating} / 5</p>
                            </div>                        
                        </span>
                    </Link>
                ))}
                </div> :
                <div>
                    <h1 className={s.opcion}>{opcion}</h1>
                    <div className={s.tablaVideogames}>
                    {videogamesMostrados.map(e => (
                        <Link key={e.id} className={s.link} to={`/videogameDetail/${e?.id}`}>
                        <span className={s.unVideogame} key={e.id}>
                            <img className={s.tamañoImagen} src={e.image} alt="Image does not exist"/>
                            <div className={s.overlay}>
                                <p className={s.name}>{e.name}</p>
                                <p className={s.genres}>{e.genres.map(g => g.name).join(', ')}</p>
                                <p className={s.genres}>{e.rating} / 5</p>
                            </div>                        
                        </span>
                        </Link>
                    ))}
                </div>
                </div>
            }
        </div>        
    )
}
export default Videogames;