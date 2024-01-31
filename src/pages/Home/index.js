import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home(){
    const [movies, setMovies] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=> {
        async function loadMovies(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"e1e5eae33021cfcba555efd841e42dd5",
                    language: "pt-BR" ,
                    page: 1,
                }
            })
            setMovies(response.data.results.slice(0, 10))
            setLoading(false);
        }

        loadMovies();
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="list-movies">
                {movies.map((film)=> {
                    return(
                        <article key={film.id}>
                            <strong>{film.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                            <Link to={`/film/${film.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;