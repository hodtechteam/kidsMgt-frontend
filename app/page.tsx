import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center lg:h-screen font-inter">
      <div className=" text-center ">
        <h2 className="text-primary-dark-900 text-xl-8 font-bold">
          You are a...
        </h2>
        <p className="text-xl-4 font-meduim text-neutral-700">
          Select the option that you belong to
        </p>

        <div className="flex lg:flex-row flex-col lg:gap-x-8 gap-y-8 lg:m-14 m-6 justify-center items-center">
          <Link
            href={{
              pathname: "/registration",
              query: { type: "member" },
            }}
            className="rounded  active:border-blue-600 focus:border-blue-600 border-neutral-200 border-1 flex flex-col justify-center items-center px-6 py-8"
          >
            <div className="rounded-lg border-primary-200 border-2 p-5">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.5001 30.3333C40.3067 30.3333 38.2767 31.1033 36.6667 32.3867C34.5201 34.09 33.1667 36.7267 33.1667 39.6667C33.1667 41.4167 33.6567 43.0733 34.52 44.4733C36.13 47.18 39.0934 49 42.5001 49C44.8567 49 47.0034 48.1367 48.6368 46.6667C49.3601 46.06 49.9901 45.3133 50.4801 44.4733C51.3434 43.0733 51.8334 41.4167 51.8334 39.6667C51.8334 34.51 47.6567 30.3333 42.5001 30.3333ZM47.3301 38.6633L42.3601 43.2599C42.0334 43.5633 41.5901 43.7266 41.1701 43.7266C40.7267 43.7266 40.2834 43.5634 39.9334 43.2134L37.6234 40.9034C36.9468 40.2267 36.9468 39.1066 37.6234 38.4299C38.3001 37.7533 39.4201 37.7533 40.0967 38.4299L41.2168 39.55L44.9501 36.0966C45.6501 35.4433 46.77 35.49 47.4234 36.19C48.0767 36.89 48.0301 37.9867 47.3301 38.6633Z"
                  fill="#1A1648"
                />
                <path
                  opacity="0.4"
                  d="M49.71 50.1667C49.71 50.82 49.1967 51.3333 48.5434 51.3333H8.45671C7.80337 51.3333 7.29004 50.82 7.29004 50.1667C7.29004 40.5067 16.81 32.6667 28.5 32.6667C30.9034 32.6667 33.2367 32.9933 35.3834 33.6233C34.0067 35.2566 33.1667 37.38 33.1667 39.6667C33.1667 41.4167 33.6567 43.0733 34.52 44.4733C34.9867 45.2667 35.5934 45.9899 36.2934 46.5966C37.9267 48.0899 40.0967 49 42.5 49C45.1134 49 47.47 47.9266 49.15 46.2C49.5234 47.46 49.71 48.79 49.71 50.1667Z"
                  fill="#273472"
                />
                <path
                  d="M28.4999 28C34.9432 28 40.1666 22.7767 40.1666 16.3333C40.1666 9.89002 34.9432 4.66667 28.4999 4.66667C22.0566 4.66667 16.8333 9.89002 16.8333 16.3333C16.8333 22.7767 22.0566 28 28.4999 28Z"
                  fill="#6A6AC8"
                />
              </svg>
            </div>

            <p className="text-xl-4.5 text-neutral-800 font-bold mt-6">
              Member/First Timer
            </p>
            <p className="mt-3 text-xl-3 leading-20px break-words ">
              An HOD member or would like to be an HOD member{" "}
            </p>
          </Link>

          <Link
              href={{
                pathname: "/registration",
                query: { type: "visitor" },
              }}
            className="rounded-lg active:border-blue-600 focus:border-blue-600 border-neutral-200 border-1 flex flex-col justify-center items-center px-6 py-8">

              <div className="rounded-lg border-primary-200 border-2 p-5">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.4999 28C34.9432 28 40.1666 22.7767 40.1666 16.3333C40.1666 9.89002 34.9432 4.66667 28.4999 4.66667C22.0566 4.66667 16.8333 9.89002 16.8333 16.3333C16.8333 22.7767 22.0566 28 28.4999 28Z"
                    fill="#6A6AC8"
                  />
                  <path
                    opacity="0.4"
                    d="M28.5001 33.8333C16.8101 33.8333 7.29004 41.6733 7.29004 51.3333C7.29004 51.9867 7.80337 52.5 8.45671 52.5H48.5435C49.1968 52.5 49.7102 51.9867 49.7102 51.3333C49.7102 41.6733 40.1901 33.8333 28.5001 33.8333Z"
                    fill="#273472"
                  />
                  <path
                    d="M50.5033 34.3934C48.4033 32.2934 46.7467 32.97 45.3234 34.3934L37.0633 42.6535C36.7366 42.9801 36.4333 43.5867 36.3633 44.0301L35.92 47.18C35.7567 48.3233 36.55 49.1167 37.6933 48.9534L40.8433 48.51C41.2866 48.44 41.9167 48.1367 42.22 47.81L50.48 39.5501C51.9266 38.1501 52.6033 36.4934 50.5033 34.3934Z"
                    fill="#1A1648"
                  />
                </svg>
              </div>

              <p className="text-[18px] text-neutral-800 font-bold mt-6">
                Visitor
              </p>
              <p className="mt-3 text-xl-3 leading-20">
                I am not an HOD member and don&apost intend to be one
              </p>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
