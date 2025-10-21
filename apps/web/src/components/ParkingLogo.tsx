export const ParkingLogo = ({ size = 40 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#3B82F6"
        stroke="#1E40AF"
        strokeWidth="2"
      />
      <path
        d="M35 70V30H55C60 30 64 32 67 35C70 38 71.5 42 71.5 47C71.5 52 70 56 67 59C64 62 60 64 55 64H45V70H35Z"
        fill="white"
      />
      <path
        d="M45 38V56H55C57.5 56 59.5 55 61 53C62.5 51 63.5 49 63.5 47C63.5 45 62.5 43 61 41C59.5 39 57.5 38 55 38H45Z"
        fill="#3B82F6"
      />
      <circle cx="75" cy="25" r="12" fill="#10B981" />
      <text
        x="75"
        y="31"
        fontSize="16"
        fill="white"
        fontWeight="bold"
        textAnchor="middle"
      >
        ₪
      </text>
    </svg>
  );
};
