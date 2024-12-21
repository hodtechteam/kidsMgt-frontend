"use client";
import Link from "next/link";
import { useState, createContext, useMemo } from "react";
import ChildRegistration from "./childRegistration";
import PersonalRegistration from "./personalRegistration";
import CaregiverRegistration from "./caregiveRegistration";
import { NavigationContext } from "./context/context";
import Navigation from "./navigation";

export default function Registration() {
  const [userRole, setUserRole] = useState("child");
  const [activeRoles, setActiveRoles] = useState([]);


  // useMemo(setActiveRoles({

  // }), userRole)


  return (
    <div className="flex flex-row h-screen">
      <div className="lg:flex-[5] flex-1 overflow-auto scrollbar">
        <div className="lg:max-w-[800px] my-8 lg:mx-20  md:mx-14 mx-8">
          <Link href="/" className="gap-2 flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
                stroke="#8D8F94"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-ubuntu text-xl-4 font-normal text-neutral-700">
              Back
            </span>
          </Link>
          <h2 className="text-xl-5 mt-6 font-inter font-semibold text-neutral-800">
            Member/First Timer
          </h2>
          <p className="text-xl-3 mt-2 font-inter leading-20">
            An HOD member or would you like to be an HOD member
          </p>

          <div className="flex items-center justify-between mt-8">
            <div
              className={`
                  ${
                    userRole == "personal"
                      ? "flex border-red-600"
                      : "hidden border-neutral-600"
                  }
                  
                   lg:flex
                   items-center 
                  rounded-full  border-1 p-2 gap-2
                  
                `}
            >
              <div
                className={`
                ${
                  userRole == "personal"
                    ? "border-red-600"
                    : "border-neutral-600"
                }
                rounded-full 
                py-1 px-2.5 
                border-1 flex items-center justify-center`}
              >
                <span>1</span>
              </div>

              <p className="text-xl-2 font-inter font-medium text-neutral-800">
                Personal Informtion
              </p>
            </div>

            <div className="h-[1px] bg-gray-400 mx-2 flex-1 lg:block hidden"></div>
            <div
              // className="flex items-center justify-between rounded-full border-neutral-600 border-1 p-2 gap-2"
              className={`
                ${
                  userRole == "child"
                    ? "flex border-red-600"
                    : "hidden border-neutral-600"
                }
                lg:flex
                items-center 
                rounded-full border-neutral-600 border-1 p-2 gap-2
                
              `}
            >
              <div
                className={`
                ${
                  userRole == "child"
                    ? "border-red-600"
                    : "border-neutral-600"
                }
              rounded-full border-neutral-600 py-1 px-2.5  border-1 flex items-center justify-center`}
              >
                <span>2</span>
              </div>

              <p className="text-xl-2 font-inter font-medium text-neutral-800">
                Child Informtion
              </p>
            </div>
            <div className="h-[1px] bg-gray-400 mx-2 flex-1 lg:block hidden"></div>
            <div
              // className="flex items-center justify-between rounded-full border-neutral-600 border-1 p-2 gap-2"
              className={`
                ${userRole == "caregiver" ? "flex border-red-600 " : "hidden border-neutral-600"}
                lg:flex
                items-center 
                rounded-full border-neutral-600 border-1 p-2 gap-2
                
              `}
            >
              <div className={`
                ${
                  userRole == "caregiver"
                    ? "border-red-600"
                    : "border-neutral-600"
                }
                    rounded-full border-neutral-600 py-1 px-2.5  border-1 flex items-center justify-center`}>
                <span>3</span>
              </div>

              <p className="text-xl-2 font-inter font-medium text-neutral-800">
                Caregiver Informtion
              </p>
            </div>
          </div>

          <NavigationContext.Provider value={{ userRole, setUserRole }}>
            <Navigation />
          </NavigationContext.Provider>
        </div>
      </div>

      <div className="bg-gray-900 flex-1 overflow-auto lg:flex-[4] lg:block hidden"></div>
    </div>
  );
}
