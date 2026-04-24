import { Slider } from "@/components/ui/slider";
export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="py-3">
      <video
        className="max-h-full rounded-xl relative"
        src={src}
        controls={false}
      >
        <div className="absolute top-0 left-0 right-0 ">
          <Slider
            min={0}
            max={100}
            step={1}
            value={[50]}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </video>
    </div>
  );
}
