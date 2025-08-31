import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "@hooks/useFetch";

const FeatureMovies = () => {
  // const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMoviesResponse } = useFetch({
    url: "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true",
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    {
      enabled: !!activeMovieId,
    },
  );
  console.log({ videoResponse });

  const movies = (popularMoviesResponse?.results || []).slice(0, 4);

  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  // useEffect(() => {
  //   fetch("https://api.themoviedb.org/3/movie/popular", {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTA5YjE1YzRkYmU3MTZmYjE4ZGJkYWZjMjJjOTYzOCIsIm5iZiI6MTcyMzYyODM3My43MzU1OTEsInN1YiI6IjY2YmM3YTc2MjdhNTZmM2YzNDg4ZjJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r8JGyV7cSrOXBsT2U3GB8b9g6qEC4kFYyhzl9gnCt10",
  //     },
  //   }).then(async (res) => {
  //     const data = await res.json();
  //     console.log({ data });
  //     const popularMovies = data.results.slice(0, 4);
  //     setMovies(popularMovies);
  //     setActiveMovieId(popularMovies[0].id);
  //   });
  // }, []);

  console.log(movies);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              (videoResponse?.results || []).find(
                (video) => video.type === "Trailer" && video.site === "YouTube",
              )?.key
            }
          />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovies;
