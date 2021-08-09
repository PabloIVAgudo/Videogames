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

  //Creo una funcion que me setee el valor de name que proviene de componente NavigationBar --> searchBar. Pasa como props en ambas.
  //En searchBar debe tomar el valor de name, lanzar el evento y mostrar el resultado de la búsqueda.
  //La búsqueda o filtrado por id se debe hacer de una ruta que pase params :id. Es más fácil así.
  //Si no me sale lo de name como props, pruebo hacer que pase como params o query.

  return (
    <div>      
      <NavigationBar />
      <Videogames videogamesMostrados={videogamesActuales} loading={loading}/>
      <Paginado videogamesPorPagina={videogamesPorPagina} videogamesTotales={videogames.length} paginado={paginado}/>
    </div>           
  );
}

export default Home;