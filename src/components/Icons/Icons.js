export const ChevronRight = ({ className }) => {
  return (
    <svg
      className={className}
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1L8.5 8L1.5 15"
        stroke="#9E9DA8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const TrashIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
    </svg>
  );
};

export const CircleCloseIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
    </svg>
  );
};

export const LoadingIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
    </svg>
  );
};

export const CheckIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
};

export const HaftStarIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
    </svg>
  );
};

export const EmptyStarIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
    </svg>
  );
};

export const StarIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
};

export const SearchIcon = ({ className }) => {
  return (
    <svg fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );
};

export const ArrowDownIcon = ({ width = '1.2rem', height = '1.2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 6"
    fill="none"
  >
    <path
      d="M8.5 1.25L5 4.75L1.5 1.25"
      stroke="#676767"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <g fill="#676767" fillRule="nonzero">
        <path d="M19 4.293l.707.707L5 19.707 4.293 19z" />
        <path d="M19.707 19l-.707.707L4.293 5 5 4.293z" />
      </g>
    </g>
  </svg>
);

export const CartIcon = ({ width = '2rem', height = '2.2rem', className }) => (
  <svg className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" fill="none">
      <g transform="translate(-10.000000, -9.000000)">
        <g>
          <g transform="translate(8.000000, 8.000000)">
            <g>
              <rect x="0" y="0" width="24" height="24"></rect>
              <g transform="translate(1.900000, 2.000000)" stroke="#676767">
                <path
                  d="M2.90254295,5.1 C2.63489801,5.1 2.40361713,5.33408857 2.3731717,5.63375376 L1.0022275,19.1989712 C0.975727288,19.4611854 1.22142963,19.7 1.53159875,19.7 L18.6684012,19.7 C18.9779724,19.7 19.2242542,19.4604066 19.1977725,19.1989712 L17.8268617,5.63408331 C17.7963817,5.33447347 17.5648285,5.1 17.297457,5.1 L15.2410407,5.1 C14.7921216,5.1 14.7921216,5.1 13.5081923,5.1 C11.9459262,5.1 11.9459262,5.1 10.1053234,5.1 C8.22927512,5.1 8.22927512,5.1 6.64795548,5.1 C5.36136445,5.1 5.36136445,5.1 4.95895925,5.1 L2.90254295,5.1 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M10.1,7.73326896 L10.1,5.18518519 C10.1139408,1.72839506 11.5139408,-1.77635684e-14 14.3,-1.77635684e-14"
                  transform="translate(12.200000, 3.866634) scale(-1, 1) translate(-12.200000, -3.866634) "
                ></path>
                <path d="M5.9,7.6 L5.9,5.18518519 C5.91394083,1.72839506 7.31394083,-1.77635684e-14 10.1,-1.77635684e-14"></path>
                <circle strokeLinecap="round" strokeLinejoin="round" cx="5.9" cy="8.8" r="1.2"></circle>
                <circle strokeLinecap="round" strokeLinejoin="round" cx="14.3" cy="8.8" r="1.2"></circle>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const ClockIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <circle cx="12" cy="12" r="9" stroke="#676767" strokeLinecap="square" />
      <path fill="#676767" fillRule="nonzero" d="M17.41 11.5v1H11.5V6.59h1v4.91z" />
    </g>
  </svg>
);

export const PlusIcon = ({ width = '1.6rem', height = '1.6rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon/16px/add" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M9,9 L9,13.8925781 L7,13.8925781 C7,13.8925781 7,13.4882853 7,12.6796875 C7,11.8710897 7,10.8710997 7,9.6796875 L7,9 L6.21289062,9 C5.02147842,9 4.02148842,9 3.21289062,9 C2.40429283,9 2,9 2,9 L2,7 L7,7 L7,6.10546875 C7,4.91405654 7,3.91406654 7,3.10546875 C7,2.29687096 7,1.89257812 7,1.89257812 L9,1.89257813 L9,7 L14,7 L14,9 C14,9 13.5957072,9 12.7871094,9 C11.9785116,9 10.9785216,9 9.78710938,9 L9,9 Z"
        id="Combined-Shape"
        fill="#00A5CF"
      ></path>
    </g>
  </svg>
);

export const MinusIcon = ({ width = '1.6rem', height = '1.6rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon/16px/remove" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M14,9 C14,9 13.5957072,9 12.7871094,9 C11.9785116,9 10.9785216,9 9.78710937,9 C8.59569717,9 7.40430283,9 6.21289062,9 C5.02147842,9 4.02148842,9 3.21289062,9 C2.40429283,9 2,9 2,9 L2,7 L14,7 L14,9 Z"
        id="–"
        fill="#00A5CF"
      ></path>
    </g>
  </svg>
);

export const MenuIcon = ({ width = '1.2rem', height = '1.6rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 17"
    fill="none"
  >
    <path d="M13 1.5H1" stroke="#1A162E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 9H1" stroke="#1A162E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 16H1" stroke="#1A162E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FacebookIcon = ({ width = '2.8rem', height = '2.8rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 12.067C0 18.033 4.333 22.994 10 24V15.333H7V12H10V9.333C10 6.333 11.933 4.667 14.667 4.667C15.533 4.667 16.467 4.8 17.333 4.933V8H15.8C14.333 8 14 8.733 14 9.667V12H17.2L16.667 15.333H14V24C19.667 22.994 24 18.034 24 12.067C24 5.43 18.6 0 12 0C5.4 0 0 5.43 0 12.067Z"
      fill="white"
    />
  </svg>
);

export const InstagramIcon = ({ width = '2.6rem', height = '2.6rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_146_126)">
      <path
        d="M11.9968 7.9983C9.79333 7.9983 7.99515 9.79651 7.99515 12C7.99515 14.2035 9.79333 16.0017 11.9968 16.0017C14.2002 16.0017 15.9984 14.2035 15.9984 12C15.9984 9.79651 14.2002 7.9983 11.9968 7.9983ZM23.9987 12C23.9987 10.3429 24.0137 8.70077 23.9206 7.04665C23.8275 5.12536 23.3893 3.4202 21.9843 2.01525C20.5764 0.607302 18.8743 0.172008 16.953 0.0789456C15.2959 -0.0141173 13.6539 0.000892936 11.9998 0.000892936C10.3427 0.000892936 8.70061 -0.0141173 7.04652 0.0789456C5.12526 0.172008 3.42014 0.610305 2.01522 2.01525C0.607291 3.42321 0.172005 5.12536 0.0789442 7.04665C-0.014117 8.70377 0.000892919 10.3459 0.000892919 12C0.000892919 13.6541 -0.014117 15.2992 0.0789442 16.9533C0.172005 18.8746 0.610293 20.5798 2.01522 21.9847C3.42314 23.3927 5.12526 23.828 7.04652 23.9211C8.70361 24.0141 10.3457 23.9991 11.9998 23.9991C13.6569 23.9991 15.2989 24.0141 16.953 23.9211C18.8743 23.828 20.5794 23.3897 21.9843 21.9847C23.3923 20.5768 23.8275 18.8746 23.9206 16.9533C24.0167 15.2992 23.9987 13.6571 23.9987 12ZM11.9968 18.1572C8.58954 18.1572 5.83973 15.4073 5.83973 12C5.83973 8.5927 8.58954 5.84284 11.9968 5.84284C15.404 5.84284 18.1538 8.5927 18.1538 12C18.1538 15.4073 15.404 18.1572 11.9968 18.1572ZM18.406 7.02864C17.6105 7.02864 16.968 6.38621 16.968 5.59067C16.968 4.79513 17.6105 4.1527 18.406 4.1527C19.2015 4.1527 19.8439 4.79513 19.8439 5.59067C19.8442 5.77957 19.8071 5.96667 19.735 6.14124C19.6628 6.31581 19.5569 6.47442 19.4233 6.608C19.2897 6.74157 19.1311 6.84748 18.9565 6.91967C18.782 6.99185 18.5949 7.02888 18.406 7.02864Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_146_126">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const GithubIcon = ({ width = '2.8rem', height = '2.8rem', className }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 16 16" version="1.1">
    <path
      fill="#fff"
      d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
    ></path>
  </svg>
);

export const GoogleIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
  >
    <defs>
      <path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
  </svg>
);

export const EmailIcon = ({ width = '2.2rem', height = '2rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 22 20"
    fill="none"
  >
    <path
      d="M16.9024 6.85156L12.4591 10.4646C11.6196 11.1306 10.4384 11.1306 9.59895 10.4646L5.11816 6.85156"
      stroke="#9E9DA8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.9089 19C18.9502 19.0084 21 16.5095 21 13.4384V6.57001C21 3.49883 18.9502 1 15.9089 1H6.09114C3.04979 1 1 3.49883 1 6.57001V13.4384C1 16.5095 3.04979 19.0084 6.09114 19H15.9089Z"
      stroke="#9E9DA8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PasswordIcon = ({ width = '1.8rem', height = '2rem', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 18 20"
    fill="none"
  >
    <path
      d="M13.4228 7.44804V5.30104C13.4228 2.78804 11.3848 0.750045 8.87176 0.750045C6.35876 0.739045 4.31276 2.76704 4.30176 5.28104V5.30104V7.44804"
      stroke="#9E9DA8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.683 19.2498H5.042C2.948 19.2498 1.25 17.5528 1.25 15.4578V11.1688C1.25 9.07383 2.948 7.37683 5.042 7.37683H12.683C14.777 7.37683 16.475 9.07383 16.475 11.1688V15.4578C16.475 17.5528 14.777 19.2498 12.683 19.2498Z"
      stroke="#9E9DA8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.8623 12.2031V14.4241" stroke="#9E9DA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UserIcon = ({ width = '1.6rem', height = '2rem', className }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98468 13.3457C4.11707 13.3457 0.814209 13.9305 0.814209 16.2724C0.814209 18.6143 4.09611 19.22 7.98468 19.22C11.8523 19.22 15.1542 18.6343 15.1542 16.2933C15.1542 13.9524 11.8733 13.3457 7.98468 13.3457Z"
      stroke="#9E9DA8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.98464 10.0059C10.5227 10.0059 12.5799 7.94779 12.5799 5.40969C12.5799 2.8716 10.5227 0.814453 7.98464 0.814453C5.44655 0.814453 3.38845 2.8716 3.38845 5.40969C3.37988 7.93922 5.42369 9.99731 7.95226 10.0059H7.98464Z"
      stroke="#9E9DA8"
      strokeWidth="1.42857"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
