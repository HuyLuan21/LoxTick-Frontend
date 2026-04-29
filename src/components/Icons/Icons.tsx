import type { SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement>;

// Đề xuất
export const HomeIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      viewBox="6 6 36 36"
      stroke="currentColor"
      strokeWidth="0.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M23.05 7.84a1.5 1.5 0 0 1 1.9 0l16.1 13.2a1.5 1.5 0 0 1-.95 2.66h-2.33l-1.2 13.03A2.5 2.5 0 0 1 34.1 39H13.9a2.5 2.5 0 0 1-2.49-2.27L10.23 23.7H7.9a1.5 1.5 0 0 1-.95-2.66l16.1-13.2Zm.95 3.1L12.1 20.7h.87l1.4 15.3h8.13v-7.69a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V36h8.13l1.4-15.3h.87L24 10.94Z"></path>
    </svg>
  );
};

export const HomeActiveIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      viewBox="6 6 36 36"
      strokeWidth="1"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24.95 7.84a1.5 1.5 0 0 0-1.9 0l-16.1 13.2a1.5 1.5 0 0 0 .95 2.66h2.33l1.2 13.03A2.5 2.5 0 0 0 13.9 39h7.59a1 1 0 0 0 1-1v-9.68a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V38a1 1 0 0 0 1 1h7.59a2.5 2.5 0 0 0 2.49-2.27l1.19-13.03h2.33a1.5 1.5 0 0 0 .95-2.66l-16.1-13.2Z"></path>
    </svg>
  );
};

// Đã follow
export const FollowIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.99 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 19 7ZM18.99 26c2.96 0 5.6.58 7.87 1.65l-3.07 3.06a15.38 15.38 0 0 0-4.8-.71C10.9 30 6.3 35.16 6 43c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1C2.33 32.99 8.7 26 19 26ZM35.7 41.88 31.82 38H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.82l3.88-3.88a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 0-1.42 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.42 0l1.41-1.42a1 1 0 0 0 0-1.41Z"></path>
  </svg>
);

export const FollowActiveIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 3a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM19 26C8.06 26 2 33.92 2 40.44 2 44 4 44 11 44h15.51l-3.75-3.76a6 6 0 0 1 0-8.48l4.15-4.15C24.66 26.6 22 26 19 26Z"></path>
      <path d="M35.7 41.88 31.84 38H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.83l3.88-3.88a1 1 0 0 0 0-1.41l-1.42-1.42a1 1 0 0 0-1.41 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41Z"></path>
    </svg>
  );
};

// Bạn bè
export const FriendsIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="6 6 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 12.5c-2.41 0-4.41 2-4.41 4.53 0 2.54 2 4.54 4.41 4.54s4.42-2 4.42-4.54c0-2.53-2.01-4.53-4.42-4.53Zm-7.41 4.53c0-4.13 3.29-7.53 7.41-7.53s7.42 3.4 7.42 7.53c0 4.14-3.3 7.54-7.42 7.54a7.48 7.48 0 0 1-7.41-7.54ZM18 29.88a8.68 8.68 0 0 0-8.3 6.39c-.15.53-.66.9-1.2.81l-1-.16a.94.94 0 0 1-.78-1.14c1.29-5.1 5.83-8.9 11.28-8.9 5.45 0 10 3.8 11.28 8.9a.94.94 0 0 1-.79 1.14l-.98.16c-.55.1-1.06-.28-1.2-.81a8.68 8.68 0 0 0-8.31-6.4ZM33 31.54c-.76 0-1.48.13-2.16.37-.52.19-1.12.01-1.38-.47l-.48-.88c-.27-.48-.09-1.1.42-1.3a9.38 9.38 0 0 1 3.6-.72c4.46 0 8.16 3.09 9.27 7.24.14.53-.23 1.05-.78 1.14l-.98.16c-.55.09-1.06-.28-1.22-.81A6.65 6.65 0 0 0 33 31.54ZM33 18.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM27.5 21a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"></path>
  </svg>
);

export const FriendsActiveIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="6 6 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M25.5 17a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM7.1 34.8C8.8 30.21 12.82 27 18 27c5.18 0 9.21 3.22 10.9 7.79.4 1.12-.29 2.21-1.4 2.21h-19c-1.11 0-1.8-1.1-1.4-2.2ZM40.63 37H32c-.77-2.84-1.99-5.4-3.86-7.23A9.41 9.41 0 0 1 33 28.5c4.24 0 7.54 2.4 8.91 6.51.34 1-.37 1.99-1.28 1.99ZM33 26.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"></path>
  </svg>
);

// Tin nhắn
export const MessageIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2.18 9.67A2 2 0 0 1 4 8.5h40a2 2 0 0 1 1.74 3l-20 35a2 2 0 0 1-3.65-.4l-5.87-18.6L2.49 11.82a2 2 0 0 1-.31-2.15Zm18.2 17.72 4.15 13.15L40.55 12.5H8.41l9.98 11.41 11.71-7.2a1 1 0 0 1 1.38.32l1.04 1.7a1 1 0 0 1-.32 1.38L20.38 27.4Z"></path>
  </svg>
);

export const MessageActiveIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M45.73 9.5a2 2 0 0 0-1.73-1H4a2 2 0 0 0-1.48 3.35l10.44 11.47a2 2 0 0 0 2.2.52l14.49-5.5c.17-.07.25-.04.28-.03.06.02.14.08.2.2.07.1.08.2.08.27 0 .04-.02.12-.16.23l-11.9 10.1a2 2 0 0 0-.62 2.12l4.56 14.51a2 2 0 0 0 3.64.4l20-34.64a2 2 0 0 0 0-2Z"></path>
  </svg>
);

// Chuông
export const NotificationIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="6 6 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 11.5A2.5 2.5 0 0 1 11.5 9h25a2.5 2.5 0 0 1 2.5 2.5l.06 21a2.5 2.5 0 0 1-2.5 2.5H29.2l-3.27 4a2.5 2.5 0 0 1-3.87 0l-3.28-4h-7.35a2.5 2.5 0 0 1-2.5-2.5l.06-21Zm3 .5-.06 20h8.27L24 36.63 27.79 32h8.27L36 12H12Z"></path>
    <path d="M18 22a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H19a1 1 0 0 1-1-1v-1Z"></path>
  </svg>
);

export const NotificationActiveIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="6 6 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.5 9h25a2.5 2.5 0 0 1 2.5 2.5l.06 21a2.5 2.5 0 0 1-2.5 2.5H29.2l-3.27 4a2.5 2.5 0 0 1-3.87 0l-3.28-4h-7.35a2.5 2.5 0 0 1-2.5-2.5l.06-21A2.5 2.5 0 0 1 11.5 9ZM29 21H19a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Z"></path>
  </svg>
);

// Upload
export const UploadIcon = ({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v12" />
    <path d="m17 8-5-5-5 5" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  </svg>
);

// More
export const MoreIcon = ({ ...props }: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 24a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm15 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"></path>
  </svg>
);
export const HeartIcon = ({ ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#HeartFill_clip0)">
      <g filter="url(#HeartFill_filter0_d)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z"
        ></path>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z"
        fillOpacity="0.03"
      ></path>
    </g>
    <defs>
      <filter
        id="HeartFill_filter0_d"
        x="-0.9"
        y="1.05"
        width="25.8"
        height="24.05"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dy="1.2"></feOffset>
        <feGaussianBlur stdDeviation="1.2"></feGaussianBlur>
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        ></feColorMatrix>
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        ></feBlend>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        ></feBlend>
      </filter>
      <clipPath id="HeartFill_clip0">
        <rect width="24" height="24" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);
export const CommentIcon = ({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.6 43.6 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5M14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
      clipRule="evenodd"
    ></path>
  </svg>
);
export const BookMarkIcon = ({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15.13a1 1 0 0 1-1.555.831l-6.167-4.12a.5.5 0 0 0-.556 0l-6.167 4.12A1 1 0 0 1 4 19.63z"
    ></path>
    <path
      fill="currentColor"
      fillOpacity="0.03"
      d="M4.032 4.144Q4 4.317 4 4.5v15.13a1 1 0 0 0 1.555.831l6.167-4.12a.5.5 0 0 1 .41-.066l-.427-.198a1.49 1.49 0 0 0-1.377.063c-.581.339-1.45.85-2.25 1.339-.59.359-1.427.695-2.187.962-.929.325-1.86-.387-1.86-1.37zm8.251 12.202 6.162 4.115A1 1 0 0 0 20 19.63V4.5a2 2 0 0 0-1.123-1.798c.21.254.334.58.33.936a117 117 0 0 1-.896 13.408c-.124.99-1.17 1.553-2.076 1.133z"
    ></path>
  </svg>
);
export const ShareIcon = ({ ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.938 3.175a.674.674 0 0 1 1.138-.488l6.526 6.215c.574.547.554 1.47-.043 1.991l-6.505 5.676a.674.674 0 0 1-1.116-.508V13.49s-6.985-1.258-9.225 2.854c-.209.384-1.023.518-.857-1.395.692-3.52 2.106-9.017 10.082-9.017z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#161823"
      fillRule="evenodd"
      d="m15.754 6.212 1.295 2.59a1.12 1.12 0 0 1-.268 1.349l-5.799 5.042s-.28 1.403.562 1.403 7.578-6.174 7.578-6.174.28-.842-.561-1.684c-.843-.842-2.807-2.526-2.807-2.526"
      clipRule="evenodd"
      opacity="0.03"
    ></path>
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M10.937 6.23v7.297s-6.683-.942-8.777 2.246C.146 18.839.331 12.309 3.363 9.057s7.574-2.827 7.574-2.827"
      clipRule="evenodd"
      opacity="0.09"
    ></path>
    <defs>
      <radialGradient
        id="a"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(-113.046 11.628 5.43)scale(8.93256 8.78076)"
        gradientUnits="userSpaceOnUse"
      >
        <stop></stop>
        <stop offset="0.995" stopOpacity="0.01"></stop>
        <stop offset="1" stopOpacity="0.01"></stop>
      </radialGradient>
    </defs>
  </svg>
);
export const FollowUserIcon = ({ ...props }: IconProps) => (
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
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
export const UnFollowUserIcon = ({ ...props }: IconProps) => (
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
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
