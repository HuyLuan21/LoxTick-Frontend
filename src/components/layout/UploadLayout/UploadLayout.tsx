import Header from "../DefaultLayout/components/Header";
import uploadIcon from "@/assets/upload.svg";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import VideoPreview from "@/components/video/VideoPreview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { uploadToCloudinary, uploadVideo } from "@/services/Api/Upload";

interface IFile extends File {
  preview?: string;
}

const UploadLayout = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<IFile | null>(null);
  const [videoFile, setVideoFile] = useState<IFile | null>(null);
  const [inputLength, setInputLength] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  return (
    <div className={`flex flex-col ${videoFile ? "" : "h-screen"}`}>
      <Header className="h-14" isShowSearch={false} isShowUpload={false} />
      <div className="flex-1 h-full">
        <div className="p-8 h-full bg-[#faf9f9]">
          {/* Vùng drag and drop */}
          <div
            className={`w-full h-full p-4 bg-[#FFF] rounded-md shadow-sm border border-gray-200 dark:border-zinc-700/90 mb-4 ${videoFile ? "hidden" : "visible"}`}
          >
            <div
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
                  const file = e.target.files?.[0] as IFile;
                  if (file) {
                    console.log(file);

                    const preview = URL.createObjectURL(file);

                    file.preview = preview;

                    setVideoFile(file);
                  }
                }}
              />
              <div className="flex my-5 flex-col items-center">
                <img src={uploadIcon} alt="" />
                <p className="text-2xl font-semibold dark:text-white mt-2">
                  Chọn video để tải lên
                </p>
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
          <div className={`${videoFile ? "bg-[#faf9f9]" : "hidden"}`}>
            <div className="text-lg font-semibold">Chi tiết</div>
            <div className="flex mt-2 mb-4 gap-4">
              <div className="flex-7 flex flex-col gap-6">
                <div className="shadow-sm border border-gray-200 p-5 rounded-md">
                  <div className="flex text-sm font-semibold mb-4">Mô tả</div>
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
                <div className="shadow-sm border p-5 rounded-md">
                  <div className="flex text-sm font-semibold mb-4">Ảnh bìa</div>
                  <div className="flex gap-5">
                    <div className="w-27 shrink-0">
                      {/* Vùng upload / preview */}
                      <div
                        onClick={() => inputImageRef.current?.click()}
                        className="w-27 h-37 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                      >
                        {imageFile ? (
                          // Có ảnh → hiện preview
                          <img
                            src={imageFile.preview}
                            alt="Ảnh bìa"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 5v14M5 12h14"
                                stroke="#FE2C55"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-xs text-gray-400">9:16</span>
                          </>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={inputImageRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0] as IFile;
                            if (file) {
                              const preview = URL.createObjectURL(file);

                              file.preview = preview;

                              setImageFile(file);
                              console.log(file);
                            }
                          }}
                        />
                      </div>

                      {/* Nút xóa ảnh nếu đã chọn */}
                      {imageFile && (
                        <button
                          onClick={() => {
                            if (imageFile.preview) {
                              URL.revokeObjectURL(imageFile.preview);
                            }
                            setImageFile(null);
                            if (inputImageRef.current) {
                              inputImageRef.current.value = "";
                            }
                          }}
                          className="mt-1.5 w-full text-xs text-gray-400 hover:text-red-500 transition-colors text-center"
                        >
                          Xóa ảnh
                        </button>
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <p className="text-sm text-gray-500 mb-3.5 leading-relaxed">
                        Chọn ảnh bìa hấp dẫn để thu hút người xem.
                        <br />
                        LoxTik sẽ tự động đề xuất ảnh bìa từ video của bạn.
                      </p>
                      <Button
                        onClick={() => inputImageRef.current?.click()}
                        className="bg-[#FE2C55] text-white text-sm font-medium px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-[#e0264c] transition-colors"
                      >
                        Tải ảnh bìa lên
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-semibold">Cài đặt</div>
                {/* Cài đặt */}
                <div className="flex gap-4 mt-2 mb-4">
                  <div className="shadow-sm border p-5 rounded-md flex-1">
                    <div className="mb-4">
                      <div className="flex text-sm font-semibold mb-4">
                        Thời điểm đăng
                      </div>
                      <div className="flex gap-2">
                        <RadioGroup
                          defaultValue="default"
                          className="flex gap-6"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value="default"
                              id="r1"
                              className="
                          border-gray-300
                          data-[state=checked]:bg-tiktok-red
                          data-[state=checked]:border-tiktok-red
                          text-white
                        "
                            />
                            <Label htmlFor="r1">Ngay bây giờ</Label>
                          </div>

                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              disabled
                              value="comfortable"
                              id="r2"
                              className="
                          border-gray-300
                          data-[state=checked]:bg-tiktok-red
                          data-[state=checked]:border-tiktok-red
                          text-white
                        "
                            />
                            <Label htmlFor="r2">Lên lịch</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    {/* Ai có thể xem video này */}
                    <div className="mb-4">
                      <div className="flex text-sm font-semibold mb-4">
                        Ai có thể xem video này
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="w-52 flex justify-between"
                            variant="outline"
                          >
                            Mọi người{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-down-icon lucide-chevron-down"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52">
                          <DropdownMenuGroup>
                            <DropdownMenuRadioGroup>
                              <DropdownMenuRadioItem value="public">
                                Mọi người
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="friends"
                                className="py-2 rounded-md cursor-pointer hover:bg-gray-100"
                              >
                                <div className="flex flex-col">
                                  <span>Bạn bè</span>
                                  <span className="text-xs text-gray-400">
                                    Chỉ những người follow bạn mà bạn follow lại
                                  </span>
                                </div>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="private">
                                Chỉ mình tôi
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {/* Cho phép bình luận */}
                    <div className="mb-4">
                      <div className="flex text-sm font-semibold mb-4">
                        Cho phép người dùng:
                      </div>
                      {/* don't remove flex-row because it will break the layout
                      default is flex-col */}
                      <FieldGroup className="flex flex-row justify-start gap-6">
                        <Field
                          orientation="horizontal"
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            className="data-[state=checked]:bg-tiktok-red data-[state=checked]:border-none outline-none ring-2 ring-gray-200"
                            defaultChecked
                            id="comment"
                          />
                          <FieldLabel htmlFor="comment">
                            Cho phép bình luận
                          </FieldLabel>
                        </Field>

                        <Field
                          orientation="horizontal"
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            className="data-[state=checked]:bg-tiktok-red data-[state=checked]:border-none outline-none ring-2 ring-gray-200"
                            defaultChecked
                            id="repost"
                          />
                          <FieldLabel htmlFor="repost">
                            Cho phép đăng lại
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </div>
                  </div>
                </div>
                {/* Nút đăng video */}
                <div className="flex justify-start gap-2">
                  <Button
                    disabled={isUploading || !videoFile}
                    onClick={async () => {
                      setIsUploading(true);
                      const video = await uploadToCloudinary(videoFile!);
                      await uploadVideo(video);
                      setIsUploading(false);
                      window.location.href = "/";
                    }}
                    className="bg-[#FE2C55] text-white text-sm font-medium px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-[#e0264c] transition-colors"
                  >
                    {isUploading ? "Đang tải lên..." : "Đăng video"}
                  </Button>
                  <Button
                    className="hover:bg-gray-300 bg-gray-200"
                    variant="outline"
                  >
                    Lưu nháp
                  </Button>
                  <Button
                    className="hover:bg-gray-300 bg-gray-200"
                    variant="outline"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
              <div
                className={`h-120 bg-[#faf9f9] ${
                  videoFile ? "visible" : "hidden"
                }`}
              >
                {videoFile && <VideoPreview videoFile={videoFile} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadLayout;
