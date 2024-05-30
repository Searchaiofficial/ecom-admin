import AllPosts from "./AllPosts";
import SelectedPosts from "./SelectedPosts";

const InstagramHashtagSlider = () => {
  return (
    <div className="h-screen px-2 sm:px-4 py-4 flex flex-col gap-4">
      <h1 className="font-semibold text-lg sm:text-xl">
        Instagram Hashtag Slider
      </h1>
      <div className="flex flex-col gap-4">
        <SelectedPosts />
        <AllPosts />
      </div>
    </div>
  );
};

export default InstagramHashtagSlider;
