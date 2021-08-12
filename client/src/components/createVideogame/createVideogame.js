import './createVideogame.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavigationBar from '../navigationBar/navigationBar';
import {getGenres} from '../../actions/index';

function validate (input){
    let error={};
    if(!input.name){
        error.name = "Name required";
    }else if(/[{}<>#$%&~^`/*+]/g.test(input.name)){
        error.name = "Name is invalid";
    }
    if(!input.description){
        error.description = "Description required";
    }else if(/[{}<>#$&~^`/*+]/g.test(input.description)){
        error.description = "Description is invalid";
    }
    if(!input.rating){
        error.rating = "Rating required";
    }else if(!/\d+.\d+/.test(input.rating)){
        error.rating = "Rating is invalid. Should add two digits of the fractional part";
        if(input.rating > 5.00){
            error.rating = "Rating is invalid. Rating must be below 5.00";
        }
        if(input.rating < 0.00){
            error.rating = "Rating is invalid. Rating must be above 0.00";
        }
    }
    return error;
}

function CreateVideogame(){
    const [videogame, setVideogame] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: 0.00,
        platforms: [],
        genres: []
    });
    const [error, setError] = useState({});
    const genres = useSelector(e => e.genres);
    const dispatch = useDispatch();
    const plataformasDisponibles = ["PC","PlayStation 5","PlayStation 4","Xbox One","Xbox Series S/X", "Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo","Web"];
    
    useEffect(() => {
        dispatch(getGenres())
    },[])

    function inputChange(e){
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...videogame,
            [e.target.name]: e.target.value
        }));
    }

    function addGenre (id) {
        setVideogame({...videogame, genres: [...videogame.genres, id]});
    }

    function addPlatform (platform){
        setVideogame({...videogame, platforms: [...videogame.platforms, platform]});
    }

    function deletePlatform (e){
        setVideogame({...videogame, platforms: videogame.platforms.filter(f => e !== f)});
    }

    function deleteGenre (e){
        setVideogame({...videogame, genres: videogame.genres.filter(f => e !== f)});
    }

    async function handleSubmit(e){
        e.preventDefault();      
        await axios.post("http://localhost:3001/videogame", videogame);
        alert("Se agregó el videogame a la DB.");
    }

    return (
        <div>
            <NavigationBar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">name</label>
                    <input
                    type="text"
                    name="name"
                    autoComplete= "off"
                    value={videogame.name}
                    onChange={inputChange}
                    />
                    {error?.name && (<span className="Warning">{error.name}</span>)}
                </div>
                <div>
                    <label htmlFor="">description</label>
                    <input
                    type="text"
                    name="description"
                    autoComplete= "off"
                    value={videogame.description}
                    onChange={inputChange}
                    />
                    {error?.description && (<span className="Warning">{error.description}</span>)}
                </div>
                <div>
                    <label htmlFor="">releaseDate</label>
                    <input
                    type="date"
                    name="releaseDate"
                    autoComplete= "off"
                    min="1952-01-01"
                    max="2021-12-31"
                    value={videogame.releaseDate}
                    onChange={inputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">rating</label>
                    <input
                    type="number"
                    name="rating"
                    autoComplete= "off"
                    step="0.01"
                    min="0.00"
                    max="5.00"
                    value={videogame.rating}
                    onChange={inputChange}
                    />
                    {error?.rating && (<span className="Warning">{error.rating}</span>)}
                </div>
                <div>Add platforms
                    <select onChange={e => addPlatform(e.target.value)}>
                    {plataformasDisponibles.map(e =>(
                                <option value={e}>{e}</option>
                        )
                    )}
                    </select>
                    <div>{videogame.platforms.map(e => <span className="seudoBoton">{e}<button className="botonDelete" onClick={() => deletePlatform(e)}>X</button></span>)}</div>
                </div>
                <div>Add genres
                    <select onChange={e => addGenre(e.target.value)}>
                    {genres.map(e =>(
                                <option value={e.name}>{e.name}</option>
                        )
                    )}
                    </select>
                    <div>{videogame.genres.map(e => <span className="seudoBoton">{e}<button className="botonDelete" onClick={() => deleteGenre(e)}>X</button></span>)}</div>
                </div>                
                <input type="submit" value="Create videogame"/>
            </form>            
        </div>
    )
}

export default CreateVideogame;