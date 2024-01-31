import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './movie-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Film(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilm(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"e1e5eae33021cfcba555efd841e42dd5",
                    language: "pt-BR" ,
                }
            })
            .then((response) =>{
                setFilm(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate('/', { replace: true })
                return;
            })
        }

        loadFilm();

        return() => {
            console.log("COMPNENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    function salvarFilm(){
        const minhaLista = localStorage.getItem("@cineflix");

        let savedMovies = JSON.parse(minhaLista) || [];

        const hasFilm = savedMovies.some( (savedMovies) => savedMovies.id === film.id)

        if(hasFilm){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        savedMovies.push(film);
        localStorage.setItem('@cineflix', JSON.stringify(savedMovies));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
           <div className='filme-info'>
            <h1>Carregando Detalhes...</h1>
           </div> 
        )
    }

    return(
        <div className='movie-info'>
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />
            <h3>Sinopse</h3>
            <span>{film.overview}</span>
            <strong>Avaliação: {film.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilm}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${film.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Film;