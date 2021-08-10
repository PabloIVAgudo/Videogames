import './home.css';
import NavigationBar from '../navigationBar/navigationBar';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getVideogames, getVideogameByName} from '../../actions/index';
import Videogames from './posts/videogames';
import Paginado from './Paginado/paginadoHome';

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
      <Videogames videogamesMostrados={videogamesActuales} loading={loading}/>
      <Paginado videogamesPorPagina={videogamesPorPagina} videogamesTotales={videogames.length} paginado={paginado}/>
    </div>           
  );
}

export default Home;