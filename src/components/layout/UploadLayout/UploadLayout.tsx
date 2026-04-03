import Header from "../DefaultLayout/components/Header";
import uploadIcon from "@/assets/upload.svg";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import type { Video } from "@/types/video.types";
import { Button } from "@/components/ui/button";
import VideoPreview from "@/components/video/VideoPreview";

interface IFile extends File {
  preview?: string;
}

const UploadLayout = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [, setIsDragging] = useState(false);
  const [video, setVideo] = useState<Video | null>(null);
  const [videoFile, setVideoFile] = useState<IFile | null>(null);
  const [inputLength, setInputLength] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    console.log(files);

    if (files.length > 0) {
      const file = files[0];
      console.log(file.name);
    }
  };

  return (
    <div className="flex flex-col h-dvh">
      <Header className="h-14" isShowSearch={false} isShowUpload={false} />
      <div className="flex-1 h-full">
        <div className="p-8 h-full bg-[#faf9f9]">
          {/* Vùng drag and drop */}
          <div className="w-full h-1/2 p-4 bg-[#FFF] rounded-md shadow-sm border border-gray-200 dark:border-zinc-700/90 mb-4">
            <div
              onDragOver={handleDragOver}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => {
                inputFileRef.current?.click();
              }}
              className="bg-gray-100 dark:bg-zinc-800 justify-center items-center flex w-full h-full rounded-md border-2 border-dashed border-gray-200 dark:border-zinc-700/90 hover:bg-[#f0f7fd] hover:border-[#0075dc] dark:hover:bg-zinc-700/90"
            >
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={inputFileRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log(file);
                    const preview = URL.createObjectURL(file);
                    setVideoFile({
                      ...file,
                      preview,
                    });
                  }
                }}
              />
              <div className="flex flex-col items-center">
                <img src={uploadIcon} alt="" />
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold dark:text-white mt-2">
                    Chọn video để tải lên
                  </p>
                </div>
                <div className="flex flex-col items-center w-full">
                  <p className="text-sm mt-4 text-gray-400">
                    Hoặc kéo thả vào đây
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      inputFileRef.current?.click();
                    }}
                    className="bg-tiktok-red text-white px-8 py-2 rounded-md mt-4 mx-auto"
                  >
                    Chọn video
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Vùng hiển thị video */}
          <div className="bg-[#faf9f9]">
            <div className="text-lg font-semibold dark:text-white">
              Chi tiết
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex-7 flex flex-col gap-6">
                <div className="shadow-sm border border-gray-200 p-5 rounded-md">
                  <div className="flex text-sm font-semibold dark:text-white mb-4">
                    Mô tả
                  </div>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      className="h-24 max-h-48 resize-none overflow-y-auto bg-gray-200/50 break-all focus-visible:ring-0 focus-visible:border-none border-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                      placeholder="Mô tả thêm về video của bạn..."
                      maxLength={2000}
                      onChange={(e) => {
                        setInputLength(e.target.value.length);
                      }}
                    />
                    <p className="text-right text-xs text-muted-foreground">
                      {inputLength}/2000
                    </p>
                    {/* Button hashtag và mention*/}
                    <div className="flex gap-2">
                      <Button variant="outline">#Hashtag</Button>
                      <Button variant="outline">@Mention</Button>
                    </div>
                  </div>
                </div>
                <div className="shadow-sm border border-gray-200 p-5 rounded-md">
                  <div className="flex text-sm font-semibold dark:text-white mb-4">
                    Ảnh bìa
                  </div>
                  <div className="flex gap-5">
                    <div className="max-w-75 flex-1 bg-gray-200/50">
                      <input
                        type="image"
                        accept="image/*"
                        className="h-full w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log("File bạn vừa chọn là:", file);
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 h-40 bg-gray-200/50">a</div>
                  </div>
                </div>
              </div>
              {videoFile && <VideoPreview videoFile={videoFile} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadLayout;
