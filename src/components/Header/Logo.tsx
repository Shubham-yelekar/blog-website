import type { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <mask
        id="b"
        width={56}
        height={56}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path fill="#fff" d="M56 0H0v56h56V0Z" />
      </mask>
      <g mask="url(#b)">
        <path
          fill="url(#c)"
          fillRule="evenodd"
          d="M28 9.42a3.664 3.664 0 0 0-3.663 3.664h-9.421C14.916 5.858 20.774 0 28 0s13.084 5.858 13.084 13.084S35.226 26.168 28 26.168v-9.42a3.664 3.664 0 0 0 0-7.327ZM46.58 28a3.663 3.663 0 0 0-3.664-3.663v-9.421C50.142 14.916 56 20.774 56 28s-5.858 13.084-13.084 13.084S29.832 35.226 29.832 28h9.42a3.663 3.663 0 1 0 7.327 0Zm-33.496 3.663A3.664 3.664 0 1 1 16.748 28h9.42c0-7.226-5.858-13.084-13.084-13.084S0 20.774 0 28s5.858 13.084 13.084 13.084v-9.42ZM28 46.58a3.663 3.663 0 0 0 3.663-3.663h9.421C41.084 50.142 35.226 56 28 56s-13.084-5.858-13.084-13.084S20.774 29.832 28 29.832v9.42a3.663 3.663 0 1 0 0 7.327Z"
          clipRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="c"
        x1={28}
        x2={28}
        y1={0}
        y2={56}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FCCB90" />
        <stop offset={1} stopColor="#D57EEB" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h56v56H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
