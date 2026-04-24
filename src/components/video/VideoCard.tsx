// chua cac component thanh phan cua 1 video
import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
import VideoActions from "./VideoActions";
export default function VideoCard() {
  return (
    <div className="flex justify-center h-dvh ">
      {/* video */}
      <VideoPlayer src="https://res.cloudinary.com/dkeeelvpa/video/upload/v1775902568/tiktok_clone/video/rodivduoeixmzxea2p6s.mp4" />

      <VideoInfo />
      {/* actions */}
      <VideoActions />
    </div>
  );
}
