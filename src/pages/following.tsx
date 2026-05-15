import { useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import DropdownMenu from "@/components/layout/DefaultLayout/components/DropdownMenu";
import { getFollowingFeed } from "@/services/videoService";

const FollowingPage = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {!isCommentOpen && <DropdownMenu />}
      <VideoCard
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        fetchFn={getFollowingFeed}
      />
    </div>
  );
};

export default FollowingPage;
