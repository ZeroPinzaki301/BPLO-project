import React from 'react'

const BarangayCard = ({ logo, label }) => {
  return (
    <div className="rounded-lg h-[10.5em] min-w-[8em] bg-stone-950/50 grid grid-rows-[7fr_3fr]">
      <div
        className="min-h-[5em] min-w-[5em] bg-cover my-auto mx-auto"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />
      <div className="my-auto font-bold text-white mx-auto tracking-widest text-center">
        {label}
      </div>
    </div>
  );

}

export default BarangayCard