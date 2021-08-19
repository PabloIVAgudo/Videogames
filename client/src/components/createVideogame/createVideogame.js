import s from './createVideogame.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavigationBar from '../navigationBar/navigationBar';
import {getGenres} from '../../actions/index';

function validate (input){
    let error={};
    if(!input.name){
        error.name = "*Name required";
    }else if(/[{}<>#$%&~^`/*+]/g.test(input.name)){
        error.name = " *Name is invalid";
    }
    if(!input.description){
        error.description = "*Description required";
    }else if(/[{}<>#$&~^`/*+]/g.test(input.description)){
        error.description = "*Description is invalid";
    }
    if(!input.rating){
        error.rating = "*Rating required";
    }else if(!/\d+.\d+/.test(input.rating)){
        error.rating = "*Rating is invalid. Should add two digits of the fractional part";
        if(input.rating > 5.00){
            error.rating = "*Rating is invalid. Rating must be below 5.00";
        }
        if(input.rating < 0.00){
            error.rating = "*Rating is invalid. Rating must be above 0.00";
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
    },[dispatch])

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

    function borrarInput () {
        setVideogame({
            name: "",
            description: "",
            releaseDate: "",
            rating: 0.00,
            platforms: [],
            genres: []
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(videogame.name === "" || videogame.description === "" || videogame.releaseDate === "" || videogame.platforms.length === 0 || videogame.genres.length === 0){
            if(videogame.name === ""){
                return alert("Name field should not be empty.")
            }
            if(videogame.description === ""){
                return alert("Description field should not be empty.")
            }
            if(videogame.releaseDate === ""){
                return alert("Should select a release date.")
            }
            if(videogame.platforms.length === 0){
                return alert("Should add at least one platform.")
            }
            if(videogame.genres.length === 0){
                return alert("Should add at least one genre.")
            }
        }
        else{
            await axios.post("http://localhost:3001/videogame", videogame);
            return alert("The videogame was added to DB successfully!");
        }
    }

    return (
        <div className={s.pageCompleta}>
            <NavigationBar/>
            <div className={s.pageAbajo}>
            <div className={s.formularioContainer}>
            <form onSubmit={handleSubmit}>
                <div className={s.nameContainer}>
                    <label htmlFor="">Name</label>
                    <div>
                        <input
                        className={s.inputName}
                        type="text"
                        name="name"
                        autoComplete= "off"
                        value={videogame.name}
                        onChange={inputChange}
                        />                            
                    </div>
                    {error?.name && (<span className={s.warning}>{error.name}</span>)}
                </div>
                <div className={s.descriptionContainer}>
                    <label htmlFor="">Description</label>
                    <div>
                        <input
                        className={s.inputDescription}
                        type="text"
                        name="description"
                        autoComplete= "off"
                        value={videogame.description}
                        onChange={inputChange}
                        /> 
                    </div>                    
                    {error?.description && (<span className={s.warning}>{error.description}</span>)}
                </div>
                <div className={s.releaseDateContainer}>
                    <label htmlFor="">Release date</label>
                    <div>
                        <input
                        className={s.inputReleaseDate}
                        type="date"
                        name="releaseDate"
                        autoComplete= "off"
                        min="1952-01-01"
                        max="2021-12-31"
                        value={videogame.releaseDate}
                        onChange={inputChange}
                        /> 
                    </div>                    
                </div>
                <div className={s.ratingContainer}>
                    <label htmlFor="">Rating</label>
                    <div>
                        <input
                        className={s.inputRating}
                        type="number"
                        name="rating"
                        autoComplete= "off"
                        step="0.01"
                        min="0.00"
                        max="5.00"
                        value={videogame.rating}
                        onChange={inputChange}
                        />
                    </div>                    
                    {error?.rating && (<span className={s.warning}>{error.rating}</span>)}
                </div>
                <div className={s.platformsContainer}>
                    <label>Add platforms: </label> 
                    <select onChange={e => addPlatform(e.target.value)}>
                    {plataformasDisponibles.map((e,i) =>(
                                <option key={i} value={e}>{e}</option>
                        )
                    )}
                    </select>
                    <div className={s.joinedBar}>
                        {videogame.platforms.map(e => <span className={s.seudoBoton}>{e} <button className={s.botonDelete} onClick={() => deletePlatform(e)}>X</button></span>)}
                    </div>
                </div>
                <div className={s.platformsContainer}>
                    <label>Add genres: </label>
                    <select onChange={e => addGenre(e.target.value)}>
                    {genres.map(e =>(
                                <option value={e.name}>{e.name}</option>
                        )
                    )}
                    </select>
                    <div className={s.joinedBar}>
                        {videogame.genres.map(e => <span className={s.seudoBoton}>{e} <button className={s.botonDelete} onClick={() => deleteGenre(e)}>X</button></span>)}
                    </div>
                </div>
                <div className={s.botonContainer}>
                    <button className={s.boton} onClick={() => borrarInput()}>Clear inputs</button>
                </div>
                <div className={s.botonContainer}>
                    <input className={s.boton} type="submit" value="Create videogame"/>
                </div>          
            </form>
            </div>
            </div>                        
        </div>
    )
}

export default CreateVideogame;