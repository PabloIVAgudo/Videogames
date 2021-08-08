import './videogames.css'

function Videogames ({videogamesMostrados, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <div className="tablaVideogames">
            {videogamesMostrados.map(e => (
                <span className="unVideogame" key={e.id}>
                    <img className="tamañoImagen" src={e.image} alt="Image not found"/>
                    <p>{e.name}</p>
                    <p>{e.genres}</p>
                </span>
            ))}
        </div>
    )
}
export default Videogames;