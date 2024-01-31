import { useEffect, useState } from 'react';
import './favorites.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favorites(){

    const [movies, setMovies] = useState([])

    useEffect(() =>{
        const myList = localStorage.getItem("@cineflix");
        setMovies(JSON.parse(myList) || [])
    }, [])

    function deleteMovie(id){
        let filterMovies = movies.filter( (item) => {
            return (item.id !== id)
        })

        setMovies(filterMovies)
        localStorage.setItem("@cineflix", JSON.stringify(filterMovies))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='my-movies'>
            <h1>Meus Filmes</h1>
            {movies.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
            <ul>
                {movies.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span> 
                            <div>
                                <Link to={`/film/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>                
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;