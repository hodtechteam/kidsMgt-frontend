"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import Select, { StylesConfig } from "react-select";

export default function Registration() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<String | undefined>("");
  const [userRole, setUserRole] = useState("personal");
  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: () => ({
      display: "flex",
      width: "100%",
      padding: "16px 12px 16px 12px",
      textSize: "16px",
      border: "1px solid #E4E5E7",
      borderRadius: "4px",
    }),
  };

  const roles = [
    { value: "pastors", label: "Pastors" },
    { value: "directors", label: "Directors" },
    { value: "hod", label: "HOD" },
    { value: "deputy_hods", label: "Deputy HODs" },
    { value: "colony_leaders", label: "Colony Leaders" },
    { value: "captains", label: "Captains" },
    { value: "workers", label: "Workers" },
    { value: "members", label: "Members" },
  ];

  const ministryOptions = [
    { value: "evangelism_and_mission", label: "Evangelism and Mission" },
    { value: "small_groups", label: "Small Groups" },
    { value: "worship_and_communications", label: "Worship & Communications" },
    { value: "assimilation", label: "Assimilation" },
    { value: "fellowship", label: "Fellowship" },
    { value: "hod_academy", label: "HOD Academy" },
    { value: "prayer", label: "Prayer" },
    { value: "stewardship", label: "Stewardship" },
    { value: "head_of_ministries", label: "Head of Ministries" },
  ];
  return (
    <div className="flex flex-row h-screen">
      <div className="lg:flex-[5] flex-1 overflow-auto scrollbar">
        <div className="my-8 lg:mx-20  md:mx-14 mx-8">
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
            <div className={`
                  ${userRole == 'personal'?  'flex border-red-600' : 'hidden border-neutral-600'}
                  
                   lg:flex
                   items-center 
                  rounded-full  border-1 p-2 gap-2
                  flex-1
                `}>
              <div className={`
                ${userRole == 'personal'?  'border-red-600' : 'border-neutral-600'}
                rounded-full 
                py-1 px-2.5 
                border-1 flex items-center justify-center`

                }>
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
                ${userRole == 'child'?  'flex' : 'hidden'}
                lg:flex
                items-center 
                rounded-full border-neutral-600 border-1 p-2 gap-2
                flex-1
              `}>
            
              <div className="rounded-full border-neutral-600 py-1 px-2.5  border-1 flex items-center justify-center">
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
                ${userRole == 'child'?  'flex' : 'hidden'}
                lg:flex
                items-center 
                rounded-full border-neutral-600 border-1 p-2 gap-2
                flex-1
              `}>
              <div className="rounded-full border-neutral-600 py-1 px-2.5  border-1 flex items-center justify-center">
                <span>3</span>
              </div>

              <p className="text-xl-2 font-inter font-medium text-neutral-800">
                Caregiver Informtion
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
              Personal Information
            </p>

            <hr />

            <p className="mt-6 mb-4 font-neutral-700 font-inter font-semibold text-xl-4.5">
              Basic Details
            </p>
            <form className="flex flex-col gap-6">
              {step == 0 && (
                <div className="flex flex-col gap-6">
                  <div className="lg:flex lg:gap-6 lg:items-center">
                    <div className="lg:w-1/2 gap-2 flex flex-col">
                      <label className="text-xl-4 font-normal font-inter text-neutral-800">
                        First Name
                      </label>
                      <input
                        placeholder="Enter first name"
                        className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                    </div>
                    <div className="lg:w-1/2 gap-2 flex flex-col">
                      <label className="text-xl-4 font-normal font-inter text-neutral-800">
                        Last Name
                      </label>
                      <input
                        placeholder="Enter last name"
                        className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xl-4 font-normal font-inter text-neutral-800">
                      Email
                    </label>
                    <input
                      placeholder="Enter email"
                      type="email"
                      className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                    />
                  </div>

                  <div>
                    <p className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Gender
                    </p>
                    <div className="flex">
                      <div className="flex flex-row-reverse justify-end w-1/2 items-center gap-2">
                        <label className="text-xl-4 font-normal font-inter text-neutral-800">
                          Male
                        </label>
                        <Input
                          type="radio"
                          className="h-6 w-6 rounded border-1 border-grey-300"
                        />
                      </div>

                      <div className="flex flex-row-reverse items-center justify-end w-1/2 gap-2">
                        <label className="text-xl-4 font-normal font-inter text-neutral-800">
                          Female
                        </label>
                        <Input
                          type="radio"
                          className="h-6 w-6 rounded border-1 border-grey-300"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Phone Number
                  </label>
                  <div className="flex lg:gap-6 gap-3">
                    <div className="lg:w-1/5 w-20">
                      <select className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 appearance-none">
                        <option className="text-black">+234</option>
                      </select>
                    </div>
                    <div className="lg:w-4/5 w-full">
                      <input
                        placeholder="9173535098"
                        className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step == 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Role in Church
                    </label>
                    <Select
                      styles={customStyles}
                      maxMenuHeight={150}
                      onChange={(option) => setRole(option?.value)}
                      options={roles}
                    />
                  </div>
                  {role != "" && (
                    <div>
                      <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                        Role in Church
                      </label>

                      <Select
                        styles={customStyles}
                        maxMenuHeight={150}
                        options={ministryOptions}
                      />
                    </div>
                  )}
                </div>
              )}

              {step == 2 && (
                <div className="flex flex-col gap-6">
                  <p className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Address
                  </p>

                  <div className="lg:flex gap-9">
                    <div className="lg:w-1/2">
                      <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                        State Address
                      </label>
                      <input
                        placeholder="Enter state address"
                        className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                    </div>
                    <div className="lg:w-1/2">
                      <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                        Country
                      </label>
                      <input
                        placeholder="Enter country"
                        className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-9">
                    <div className="lg:flex gap-9">
                      <div className="lg:w-1/2">
                        <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                          State
                        </label>
                        <input
                          placeholder="Enter state"
                          className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                        />
                      </div>
                      <div className="lg:w-1/2">
                        <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                          LGA/City
                        </label>
                        <input
                          placeholder="Enter lga/city"
                          className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-9">
                      <p className="text-xl-4 text-neutral-800 font-inter font-normal">
                        Church Details
                      </p>
                      <div className="w-full">
                        <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                          LGA/City
                        </label>
                        <select className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200">
                          <option disabled>Select Location</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step == 3 && (
                <div className="flex flex-col gap-9">
                  <p className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Means Of Identification
                  </p>
                  <div className="w-full">
                    <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Identification Type
                    </label>
                    <select className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200">
                      <option disabled>Select Identification Type</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                {step > 0 && (
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      setStep((prev) => prev - 1);
                    }}
                  >
                    Previous
                  </Button>
                )}

                {step < 3 && (
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      setStep((next) => next + 1);
                    }}
                    className={`${step == 0 ? "ml-auto" : ""}`}
                  >
                    Next
                  </Button>
                )}

                {step == 3 && <Button type="submit">Save and Proceed</Button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 flex-1 overflow-auto lg:flex-[4] lg:block hidden"></div>
    </div>
  );
}
