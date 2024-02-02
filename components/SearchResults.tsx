import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { searchMovies, getMovieDetails } from "./api";

const SearchResults = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const { data: searchData, error: searchError, isLoading: searchIsLoading } = useQuery("searchMovies", () => searchMovies(searchTerm));
    const { data: movieData, error: movieError, isLoading: movieIsLoading } = useQuery("movieDetails", () => getMovieDetails(location.pathname.split("/")[2]));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchTerm) {
            setSearchTerm(searchTerm);
        }
    };

    useEffect(() => {
        if (location.pathname.startsWith("/movie/")) {
            getMovieDetails(location.pathname.split("/")[2]);
        }
    }, [location.pathname]);

    if (searchIsLoading) {
        return <div>Loading...</div>;
    }

    if (searchError) {
        return <div>Error: {searchError.message}</div>;
    }

    if (!searchData.Search) {
        return <div>No results found.</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <ul>
                {searchData.Search.map((movie: any) => (
                    <li key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
                    </li>
                ))}
            </ul>

            {movieData && (
                <div>
                    <h1>{movieData.Title}</h1>
                    <img src={movieData.Poster} alt={movieData.Title} />
                    <p>{movieData.Plot}</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;