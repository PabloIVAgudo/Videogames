import s from './errorRoute.module.css';
import {Link} from 'react-router-dom';

function ErrorRoute () {
    return (
        <div className={s.errorPage}>
            <h1 className={s.title}>
                This route does not exist. Return to <Link to="/home">Home</Link>
            </h1>            
        </div>
    );
}

export default ErrorRoute;