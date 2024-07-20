import React from "react";

type SpinnerProps = {
  size?: 'tiny' | 'default';
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'default' }) => {
  const isTiny = size === 'tiny';
  return (
    <div className={`flex justify-center items-center ${isTiny ? '' : 'h-screen'}`} aria-label="Loading...">
      <div className={`relative ${isTiny ? 'w-8 md:w-12 lg:w-16' : 'w-32 md:w-48 lg:w-64'}`}>
        <div className={`absolute animate-spin-2s ease-linear rounded-full ${isTiny ? 'h-3/4 w-3/4 border-t-2 border-b-2' : 'h-full w-full border-t-8 border-b-8'} border-sky-700 z-40`}></div>
        <div className={`absolute animate-spin-2.5s ease-linear rounded-full ${isTiny ? 'h-1/2 w-1/2 border-t border-b' : 'h-3/4 w-3/4 border-t-4 border-b-4'} border-sky-800 z-30`}></div>
        <div className={`absolute animate-spin-2s ease-linear rounded-full ${isTiny ? 'h-1/4 w-1/4 border border-sky-900' : 'h-1/2 w-1/2 border-t-4 border-b-4 border-sky-800'} z-20`}></div>
        {isTiny ? null : (
          <div className="absolute animate-spin-2.5s ease-linear rounded-full h-1/4 w-1/4 border-t-2 border-b-2 border-sky-900 z-10"></div>
        )}
      </div>
    </div>
  );
};

export default Spinner;

/* --------------------------------BASIC SPINNER------------------------------------- */
// import React from "react";

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="relative w-32 h-32">
//         <div className="absolute animate-spin-2s ease-linear rounded-full h-full w-full border-t-8 border-b-8 border-sky-700"></div>
//         <div className="absolute animate-ping-2s ease-linear rounded-full h-32 w-32 border-t-8 border-b-8 border-sky-800 opacity-85"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;

/* ---------------------------------WORMHOLE----------------------------------------- */
// import React from "react";

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="relative w-32 h-32">
//         <div className="absolute animate-spin-2s ease-linear rounded-full h-full w-full border-t-8 border-b-8 border-sky-700 z-40"></div>
//         <div className="absolute animate-ping-2s ease-linear rounded-full h-32 w-32 border-t-8 border-b-8 border-sky-700 opacity-85 z-40"></div>
//         <div className="absolute animate-spin-2s ease-linear rounded-full h-3/4 w-3/4 border-t-4 border-b-4 border-sky-800 z-30"></div>
//         <div className="absolute animate-spin-2s ease-linear rounded-full h-1/2 w-1/2 border-t-4 border-b-4 border-sky-800 z-20"></div>
//         <div className="absolute animate-spin-2s ease-linear rounded-full h-1/4 w-1/4 border-t-2 border-b-2 border-sky-900 z-10"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;
