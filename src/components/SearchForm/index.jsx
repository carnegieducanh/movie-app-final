import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./FormInputs/MediaTypeInput";
import GenresInput from "./FormInputs/GenresInput";
import RatingInput from "./FormInputs/RatingInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ setSearchFormValues }) => {
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("mediaType");
  console.log({ mediaType });

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      mediaType: ["tv", "movie"].includes(mediaType) ? mediaType : "movie",
      genres: [],
      rating: "ALL",
    },
  });

  const onSubmit = (data) => {
    console.log("dataform" + JSON.stringify(data));
  };

  const formValues = watch();
  console.log({ formValues });

  useEffect(() => {
    setSearchFormValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]);

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <label>Media Type</label>
        <br />
        <input type="radio" {...register("mediaType")} value="movie" />
        <label>Movie</label>
        <br />
        <input type="radio" {...register("mediaType")} value="tv" />
        <label>TV Show</label>
        <br /> */}
        <FormField
          name="mediaType"
          labe="Media Type"
          control={control}
          Component={MediaTypeInput}
        />

        <FormField
          name="genres"
          labe="Genres"
          control={control}
          Component={GenresInput}
        />

        <FormField
          name="rating"
          labe="Rating"
          control={control}
          Component={RatingInput}
        />
      </form>
    </div>
  );
};
export default SearchForm;
