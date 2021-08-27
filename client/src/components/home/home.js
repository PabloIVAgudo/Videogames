import s from './home.module.css';
import NavigationBar from '../navigationBar/navigationBar';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getVideogames, getGenres} from '../../actions/index';
import Videogames from './posts/videogames';
import Paginado from './Paginado/paginadoHome';
import SearchBar from '../searchBar/searchBar';

function Home() {
  //Para el paginado 
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const videogamesPorPagina = 9;
  
  const dispatch = useDispatch();
  const videogames = useSelector(e => e.videogames);
  const genres = useSelector(e => e.genres);
  
  //Primera vez que carga
  useEffect(() => {    
    dispatch(getVideogames());
    dispatch(getGenres());      
  }, [dispatch])  

  //Para el orden 
  const [orden, setOrden] = useState([]);
  const [opcion,setOpcion] = useState("");

  useEffect(() =>{
    setLoading(true);
    setOrden(videogames);
    setLoading(false);
  },[videogames])
  
  function ordAlphabet (op){
    var aux = [...videogames];
    setLoading(true);
    if (op === "Ascendent"){
      aux.sort((a,b) => {
        if(a.name > b.name){
          return 1;
        } else{
          return -1;
        }
      })
      setLoading(false);
      setPaginaActual(1);  
      return setOrden([...aux]);
    }
    if (op === "Descendent"){
      aux.sort((a,b) => {
        if(a.name > b.name){
          return -1;
        } else{
          return 1;
        }
      })
      setLoading(false); 
      setPaginaActual(1);  
      return setOrden([...aux]);
    }
  }

  function ordRating (op){
    var aux = [...videogames];
    setLoading(true);
    if(op === "Ascendent"){
      aux.sort((a,b) => {
        if(a.rating > b.rating){
          return 1;
        } else{
          return -1;
        }
      })
      setLoading(false);
      setPaginaActual(1);   
      return setOrden([...aux]);
    }
    if(op === "Descendent"){
      aux.sort((a,b) => {
        if(a.rating > b.rating){
          return -1;
        } else{
          return 1;
        }
      })  
      setLoading(false);
      setPaginaActual(1); 
      return setOrden([...aux]);
    }
  } 

  function filterCreated (op){
    var aux = [...videogames];
    setLoading(true);
    if(op==="All"){
      setOpcion("")
      dispatch(getVideogames());
      setLoading(false);
      setPaginaActual(1); 
      return setOrden([...aux]);
    }
    if(op === "Created"){
      setOpcion(op);
      aux = aux.filter(e => e.id.toString().length > 10);
      setLoading(false);
      setPaginaActual(1); 
      return setOrden([...aux]);
    }
    if(op === "NoCreated"){
      setOpcion("No created");
      aux = aux.filter(e => e.id.toString().length < 10);
      setLoading(false);
      setPaginaActual(1); 
      return setOrden([...aux]);
    }
  }  

  function setGenre (genreName) {
    var aux = [...videogames];
    setLoading(true);
    if(genreName==="All"){
      setOpcion("");
      setPaginaActual(1); 
      dispatch(getVideogames());     
    }
    else{
      setOpcion(genreName);
      aux = aux.filter(e => {
        if(e.genres.map(s => s.name).includes(genreName)){
          return true;
        } else {
          return false;
        }
      }); 
    }    
    setLoading(false);
    setPaginaActual(1);          
    setOrden([...aux]);
  } 

  const indiceUltimoDePagina = paginaActual * videogamesPorPagina;
  const indicePrimeroDePagina = indiceUltimoDePagina - videogamesPorPagina;
  const videogamesActuales = orden.slice(indicePrimeroDePagina, indiceUltimoDePagina);

  function paginado (numeroDePagina) {
    setPaginaActual(numeroDePagina);
  }   
  
  return (
    <div className={s.homeEntera}>
      <NavigationBar />
      <SearchBar />
      <div className={s.barraSelect}>
        <select className={s.select} value="Alphabetical order..." onChange={e => ordAlphabet(e.target.value)}>
          <option >Alphabetical order...</option>
          <option value="Ascendent">A - Z</option>
          <option value="Descendent">Z - A</option>
        </select>
        <select className={s.select} value="Rating..." onChange={e => ordRating(e.target.value)}>
          <option>Rating...</option>
          <option value="Ascendent">0 - 5</option>
          <option value="Descendent">5 - 0</option>
        </select>
        <select className={s.select} value="Select..." onChange={e => filterCreated(e.target.value)}>
          <option>Select...</option>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="NoCreated">No created</option>
        </select>      
        <select className={s.select} value="Genre..."onChange={ev => setGenre(ev.target.value)}>
          <option>Genre...</option>
          <option value="All">All</option>
          {genres?.map(e =><option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
      </div>            
      <Videogames videogamesMostrados={videogamesActuales} loading={loading} opcion={opcion}/>
      <Paginado videogamesPorPagina={videogamesPorPagina} videogamesTotales={orden} paginado={paginado}/>
    </div>           
  );
}

export default Home;