import './createVideogame.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavigationBar from '../navigationBar/navigationBar';
import {getGenres} from '../../actions/index';

function CreateVideogame(){
    const [videogame, setVideogame] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: 0,
        platforms: [],
        genres: []
    });
    const genres = useSelector(e => e.genres);
    const dispatch = useDispatch();
    const plataformasDisponibles = ["PC","PlayStation 5","PlayStation 4","Xbox One","Xbox Series S/X", "Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo","Web"];
    
    useEffect(() => {
        dispatch(getGenres())
    },[])

    function inputChange(e){
        setVideogame(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        })
    }

    function addGenre (id) {
        setVideogame({...videogame, genres: [...videogame.genres, id]});
    }

    function addPlatform (platform){
        setVideogame({...videogame, platforms: [...videogame.platforms, platform]});
    }

    async function handleSubmit(e){
        e.preventDefault();
        await axios.post("http://localhost:3001/videogame", videogame);
        alert("Se agregó el videogame a la DB.");
    }

    return (
        <div>
            <NavigationBar/>
            <p>Estoy dentro de la creación de Videogames</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">name</label>
                    <input
                    type="text"
                    name="name"
                    value={videogame.name}
                    onChange={inputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">description</label>
                    <input
                    type="text"
                    name="description"
                    value={videogame.description}
                    onChange={inputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">releaseDate</label>
                    <input
                    type="text"
                    name="releaseDate"
                    value={videogame.releaseDate}
                    onChange={inputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">rating</label>
                    <input
                    type="number"
                    name="rating"
                    value={videogame.rating}
                    onChange={inputChange}
                    />
                </div>
                <div>Add platforms
                    <div>
                    {plataformasDisponibles.map(e => {
                        return (
                            <span>
                                <span className="seudoBoton" onClick={() => addPlatform(e)}>{e}</span>
                            </span>
                        )
                    })}
                    </div>
                </div>
                <div>Add genres
                    <div>
                    {genres.map(e => {
                        return (
                            <span>
                                <span className="seudoBoton" onClick={() => addGenre(e.id)}>{e.name}</span>
                            </span>
                        )
                    })}
                    </div>                    
                </div>
                <input type="submit" value="Create videogame"/>
            </form>            
        </div>
    )
}

export default CreateVideogame;