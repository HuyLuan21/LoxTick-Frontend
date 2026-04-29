export function getVideoOrientation(resX: number, resY: number) {
  if (!resX || !resY) return "portrait"; // fallback mặc định
  return resX > resY ? "landscape" : "portrait";
}

export function getVideoAspectRatio(resX: number, resY: number) {
  if (!resX || !resY) return "9/16";
  return `${resX}/${resY}`;
}
