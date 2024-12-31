import React from "react";
import Photo from "./photo";

const Identification = ({identification}: {identification: string}) => {
  switch (identification) {
    case "nin":
      return <div className="w-full flex flex-col gap-3">
        <label className="text-xl-4 font-normal font-inter text-neutral-800">
          National Identification Number
        </label>
        <input
          placeholder="National Identification Number"
          className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
        />
      </div>;
    case "drivers_license":
      return <div className="w-full flex flex-col gap-3">
        <label className="text-xl-4 font-normal font-inter text-neutral-800">
          Upload Photo of the Drivers Licence
        </label>
        <Photo />
      </div>;
    case "voters_card":
      return <div className="w-full flex flex-col gap-3">
        <label className="text-xl-4 font-normal font-inter text-neutral-800">
          Upload Photo of the Voters Card
        </label>
        <Photo />
      </div>;
    case "passport":
      return <div className="w-full flex flex-col gap-3">
        <label className="text-xl-4 font-normal font-inter text-neutral-800">
          Passport Number
        </label>
        <input
          placeholder="Passport Number"
          className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
        />
      </div>;
    default: return <div></div>
  }
};

export default Identification;
