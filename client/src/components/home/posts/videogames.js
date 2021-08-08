import './videogames.css'

function Videogames ({videogamesMostrados, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <ul>
            {videogamesMostrados.map(e => (
                <li key={e.id}>
                    <img src={e.image}/>
                    <p>{e.name}</p>
                    <p>{e.genres}</p>
                </li>
            ))}
        </ul>
    )
}
export default Videogames;