import { useParams } from "react-router-dom";

import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";

import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import ActorList from "@components/MediaDetail/ActorList";
import MovieInformation from "@components/MediaDetail/MovieInformation";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits,video`,
    method: "GET",
  });

  const { data: recommandationsResponse, isLoading: isRelateMoviesLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
      method: "GET",
    });

  const relatedMovies = recommandationsResponse?.results || [];

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates?.release_dates || []
  ).find((release_date) => release_date.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "screenplay", "writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, name: crew.name, job: crew.job }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        releaseDate={movieInfo.release_date}
        genres={movieInfo.genres}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
        certification={certification}
        crews={crews}
        trailerVideoKey={
          (movieInfo.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelateMoviesLoading}
              title="More like this"
              className="mt-6"
            />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
