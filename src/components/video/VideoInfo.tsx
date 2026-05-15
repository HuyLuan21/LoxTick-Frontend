export default function VideoInfo({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) {
  return (
    <div className="absolute bottom-2 left-2 w-full text-white">
      {/* username */}
      <p className="font-semibold">{username}</p>
      {/* caption */}
      <p className="[word-break:break-word]">{caption}</p>
    </div>
  );
}
