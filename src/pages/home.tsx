import VideoCard from "@/components/video/VideoCard";
import { VideoComments } from "@/components/video/VideoComments";
import DropdownMenu from "@/components/layout/DefaultLayout/components/DropdownMenu";
import { useState } from "react";
const HomePage = () => {
  return (
    <div className="relative flex items-center justify-center">
      <DropdownMenu />
      <VideoCard />
      {/* <LoxTikFeed /> */}
    </div>
  );
};
export default HomePage;
