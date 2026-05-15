import { useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import DropdownMenu from "@/components/layout/DefaultLayout/components/DropdownMenu";
import { getFriendVideos } from "@/services/videoService";

const FriendPage = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      {!isCommentOpen && <DropdownMenu />}
      <VideoCard
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        fetchFn={getFriendVideos}
      />
    </div>
  );
};

export default FriendPage;
