import MovieCard from "@components/MovieCard";
import useFetch from "@hooks/useFetch";
import { useState } from "react";

const MediaList = ({ title, tabs }) => {
  // const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const url = tabs.find((tab) => tab.id === activeTabId)?.url;

  const { data } = useFetch({ url });
  const mediaList = (data.results || []).slice(0, 12);

  // useEffect(() => {
  //   const url = tabs.find((tab) => tab.id === activeTabId)?.url;
  //   if (url) {
  //     fetch(`https://api.themoviedb.org/3/trending/${activeTabId}/day`, {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTA5YjE1YzRkYmU3MTZmYjE4ZGJkYWZjMjJjOTYzOCIsIm5iZiI6MTcyMzYyODM3My43MzU1OTEsInN1YiI6IjY2YmM3YTc2MjdhNTZmM2YzNDg4ZjJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r8JGyV7cSrOXBsT2U3GB8b9g6qEC4kFYyhzl9gnCt10",
  //       },
  //     }).then(async (res) => {
  //       const data = await res.json();
  //       console.log({ data });
  //       const trendingMediaList = data.results.slice(0, 12);
  //       setMediaList(trendingMediaList);
  //     });
  //   }
  // }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${
                activeTabId === tab.id ? "bg-white text-black" : ""
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            id={media.id}
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
