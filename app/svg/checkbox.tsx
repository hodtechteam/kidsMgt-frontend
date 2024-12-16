export const CheckBoxIcon = ({state} : {state: boolean}) => (
    
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="3.5"
      fill={state ? "#EF4444" : "white"}
    />
    <rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="3.5"
      stroke="#D0D0D0"
    />
    {state && (
      <path
        d="M7 12.5L10.5 16L17 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);