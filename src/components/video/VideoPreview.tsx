interface IFile extends File {
  preview?: string;
}

interface VideoPreviewProps {
  videoFile: IFile;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoFile }) => {
  console.log("re-render");

  return (
    <div className="flex-3 max-w-75 aspect-9/16 w-full flex items-center h-full bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-700/90 rounded-md p-0.5">
      {videoFile && videoFile?.preview && (
        <video className="rounded-sm" src={videoFile.preview} controls></video>
      )}
    </div>
  );
};

export default VideoPreview;
