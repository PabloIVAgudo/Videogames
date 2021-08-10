import './home.css';
import NavigationBar from '../navigationBar/navigationBar';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getVideogames} from '../../actions/index';
import Videogames from './posts/videogames';
import Paginado from './Paginado/paginadoHome';
import SearchBar from '../searchBar/searchBar';
import FiltroGenre from './filtroGenre/filtroGenre';

function Home() {
  //Para el paginado 
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const videogamesPorPagina = 9;
  
  const dispatch = useDispatch();
  const videogames = useSelector(e => e.videogames);
  
  //Primera vez que carga
  useEffect(() => {    
    dispatch(getVideogames()); 
    setLoading(false);      
  }, [])  

  //Para el orden 
  const [orden, setOrden] = useState([]);

  useEffect(() =>{
    setLoading(true);
    setOrden(videogames);
    setLoading(false);
  },[videogames])
  
  function alfAsc () {
    var aux = [...videogames];
    aux.sort((a,b) => {
      if(a.name > b.name){
        return 1;
      } else{
        return -1;
      }
    })  
    setOrden([...aux]);
  }

  function alfDes () {
    var aux = [...videogames];
    aux.sort((a,b) => {
      if(a.name > b.name){
        return -1;
      } else{
        return 1;
      }
    })  
    setOrden([...aux]);
  }

  function ratingAsc () {
    var aux = [...videogames];
    aux.sort((a,b) => {
      if(a.rating > b.rating){
        return 1;
      } else{
        return -1;
      }
    })  
    setOrden([...aux]);
  }

  function ratingDes () {
    var aux = [...videogames];
    aux.sort((a,b) => {
      if(a.rating > b.rating){
        return -1;
      } else{
        return 1;
      }
    })  
    setOrden([...aux]);
  }

  function creado (){
    var aux = [...videogames];
    aux = aux.filter(e => e.id.toString().length > 10);
    setOrden([...aux]);
  }

  function noCreado (){
    var aux = [...videogames];
    aux = aux.filter(e => e.id.toString().length < 10);
    setOrden([...aux]);
  }

  function setGenre (genreId) {
    var aux = [...videogames];
    aux = aux.filter(e => {
      if(e.genres.map(s => s.id).includes(genreId)){
        return true;
      } else {
        return false;
      }
    });      
    setOrden([...aux]);
  } 
  
  const indiceUltimoDePagina = paginaActual * videogamesPorPagina;
  const indicePrimeroDePagina = indiceUltimoDePagina - videogamesPorPagina;
  const videogamesActuales = orden.slice(indicePrimeroDePagina, indiceUltimoDePagina);

  function paginado (numeroDePagina) {
    setPaginaActual(numeroDePagina);
  } 
  
  return (
    <div>
      <NavigationBar />
      <button onClick={alfAsc}>Alfabetico Ascendente</button>
      <button onClick={alfDes}>Alfabetico Descendente</button>
      <button onClick={ratingAsc}>Rating Ascendente</button>
      <button onClick={ratingDes}>Rating Descendente</button>
      <button onClick={creado}>Creado</button>
      <button onClick={noCreado}>No creado</button>
      <button onClick={e => dispatch(getVideogames())}>Volver a cargar</button>
      <FiltroGenre setGenre={setGenre}/>
      <SearchBar />
      <Videogames videogamesMostrados={videogamesActuales} loading={loading}/>
      <Paginado videogamesPorPagina={videogamesPorPagina} videogamesTotales={orden.length} paginado={paginado}/>
    </div>           
  );
}

export default Home;