import './home.css';
import NavigationBar from '../navigationBar/navigationBar';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getVideogames} from '../../actions/index';
import Videogames from './posts/videogames';
import Paginado from './Paginado/paginadoHome'

function Home() {
  const [loading, setLoading] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [videogamesPorPagina] = useState(9);

  const dispatch = useDispatch();
  const videogames = useSelector(e => e.videogames);

  useEffect(() => {
    dispatch(getVideogames());     
  }, [])

  const indiceUltimoDePagina = paginaActual * videogamesPorPagina;
  const indicePrimeroDePagina = indiceUltimoDePagina - videogamesPorPagina;
  const videogamesActuales = videogames.slice(indicePrimeroDePagina, indiceUltimoDePagina);

  function paginado (numeroDePagina) {
    setPaginaActual(numeroDePagina);
  }

  return (
    <div>      
      <NavigationBar />
      <Videogames videogamesMostrados={videogamesActuales} loading={loading}/>
      <Paginado videogamesPorPagina={videogamesPorPagina} videogamesTotales={videogames.length} paginado={paginado}/>
    </div>           
  );
}

export default Home;