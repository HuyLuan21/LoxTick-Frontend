import { useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import DropdownMenu from "@/components/layout/DefaultLayout/components/DropdownMenu";
import { getFeed } from "@/services/videoService";

const HomePage = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {!isCommentOpen && <DropdownMenu />}
      <VideoCard
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        fetchFn={getFeed}
      />
    </div>

    

  );
};
export default HomePage;
