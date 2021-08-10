import './filtroGenre.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getGenres} from '../../../actions/index';

function FiltroGenre({setGenre}){
    const dispatch = useDispatch();
    const genres = useSelector(e => e.genres);

    useEffect(() => {
        dispatch(getGenres());
    },[])

    return(
        <div>
            {genres.map(e =>(
                <span key={e.id}>
                    <Link to="/home">
                        <button onClick={() => setGenre(e.id)}>{e.name}</button>
                    </Link>
                </span>
            ))}
        </div>
    )
}

export default FiltroGenre;