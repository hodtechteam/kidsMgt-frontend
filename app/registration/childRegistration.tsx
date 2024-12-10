"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMemo, useState } from "react";
import Select, { StylesConfig } from "react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ChildRegistration = () => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | undefined>("");
  const [userRole] = useState("personal");
  //   const defaultYear = new Date().getFullYear();
  //   const defaultMonth = 0;
  //   const defaultDay = new Date(defaultYear, defaultMonth + 1, 0).getDate();
  const [visibility, setVisibility] = useState({
    year: false,
    month: false,
    day: false,
  });
  const [months, setMonths] = useState<string[]>([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const [dob, setDob] = useState<{
    year: string;
    month: string;
    day: number;
  }>({
    year: "",
    month: "",
    day: 0,
  });
  // getDaysInMonth(0, new Date().getFullYear())

  const filteredMonths = months.filter(item => item.toLowerCase().startsWith(dob.month.toLowerCase()));
  
  const [ageGroup, setAgeGroup] = useState<{ name: string; state: boolean }[]>([
    { name: "Creche (6 months - 1 year)", state: false },
    { name: "Ages 1 - 3", state: false },
    { name: "Ages 4 - 5", state: false },
    { name: "Ages 6 - 8", state: false },
    { name: "Ages 9 - 12", state: false },
  ]);

  useMemo(() => {
    if(parseInt(dob.year) != 0 && dob.month != "" && dob.day > 0 ){
      const age = new Date().getFullYear() - parseInt(dob.year) ;

      const setAge = (groupName: string) : typeof ageGroup => {
        return ageGroup.map((group) =>
          group.name === groupName
            ? { ...group, state: true }
            : {...group, state: false} 
      )}

      switch (true) {
        case age === 1:
          setAgeGroup(setAge("Creche (6 months - 1 year)"));
          break;
        case age >= 1 && age <= 3:
          setAgeGroup(setAge("Ages 1 - 3"));
          break;
        case age >= 4 && age <= 5:
          setAgeGroup(setAge("Ages 4 -5"))
          break;
        case age >= 6 && age <= 8:
          setAgeGroup(setAge("Ages 6 - 8"));
          break;
        case age >= 9 && age <= 12:
          setAgeGroup(setAge("Ages 9 - 12"));
          break;
        default:
          console.log("default was called")
          setAgeGroup(setAge("default"));
          break;
      }
    }

  }, [dob])

  const years = Array.from(
    { length: 13 },
    (_, i) => new Date().getFullYear() - i
  )

  console.log("years", years);

  const filteredYears = useMemo(() => years.filter(year => year.toString().startsWith(dob.year)), [dob.year]);
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

  const toggleVisibility = (type: keyof typeof visibility) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [type]: !prevVisibility[type],
    }));
  };

  const HandleMonthChange = (event: any) => {
    setDob({ ...dob, month: event.target.value });
    setVisibility({...visibility, month: true});

    //empty input so set back the array
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
    <div className="mt-4">
      <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
        Child Information
      </p>

      <hr />
      <form className="flex flex-col gap-6 mt-6">
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

            <div className=" flex flex-col gap-6">
              <div className="rounded bg-white">
                <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                  Date of Birth
                </label>
                <div>
                  <div className="flex lg:flex-row flex-col lg:gap-x-2  gap-y-2">
                    <div className="relative">
                      <div className="flex flex-1 px-1 justify-between items-center rounded border-1 border-neutral-200 relative">
                        <input
                          placeholder="Year"
                          className="py-4 leading-6 font-normal text-xl-4 font-inter 
                                focus-visible:outline-none"
                          value={dob.year}
                          maxLength={4}
                          onChange={e => setDob({...dob, year: e.target.value})}
                        />

                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => toggleVisibility("year")}
                        >
                          <path
                            d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                            stroke="#AFB1B6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {visibility.year && (
                        <div className="absolute -bottom-26 max-h-32 w-full overflow-y-auto rounded-lg shadow-xl border-1 border-neutral-200 bg-white px-6 py-2 mt-2 custom-scrollbar cursor-pointer z-50">
                          {filteredYears.map((year) => (
                            <p
                              key={year}
                              onClick={() => {
                                setDob({ ...dob, year: year.toString()});
                                toggleVisibility("year");
                              }}
                            >
                              {year}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="flex flex-1 justify-between items-center rounded border-1 border-neutral-200">
                        <input
                          placeholder="Month"
                          value={dob.month}
                          onChange={e => setDob({...dob, month: e.target.value})}
                          className="py-4 leading-6 font-normal text-xl-4 font-inter 
                                focus-visible:outline-none"
                          // maxLength={2}
                          onFocus={HandleMonthChange}
                        />
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => toggleVisibility("month")}
                        >
                          <path
                            d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                            stroke="#AFB1B6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {visibility.month && (
                        <div className="absolute -bottom-26 max-h-32 w-full overflow-y-auto rounded-lg shadow-xl mt-2 border-1 border-neutral-200 bg-white px-6 py-2 custom-scrollbar cursor-pointer z-50">
                          {
                            filteredMonths.map((month, index) => (
                              <p
                                key={index}
                                onClick={() => {
                                  let index = months.indexOf(month);
                                  setDob({
                                    ...dob,
                                    month: months[index],
                                    // day: getDaysInMonth(index, dob.year),
                                  });

                                  toggleVisibility("month");
                                }}
                              >
                                {month}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="flex flex-1 items-center justify-between rounded border-1 border-neutral-200">
                        <input
                          placeholder="Day"
                          className="py-4 leading-6 font-normal text-xl-4 font-inter 
                                focus-visible:outline-none"
                          value={dob.day == 0 ? "" : dob.day}
                          onChange={e => setDob({...dob, day: parseInt(e.target.value)})}
                          maxLength={2}
                        />
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => toggleVisibility("day")}
                        >
                          <path
                            d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                            stroke="#AFB1B6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {visibility.day && (
                        <div className="absolute -bottom-26 max-h-32 w-full overflow-y-auto rounded-lg shadow-xl mt-2 border-1 border-neutral-200 bg-white px-6 py-2 custom-scrollbar cursor-pointer z-50">
                          {Array.from(
                            {
                              length: getDaysInMonth(
                                months.indexOf(
                                  dob.month == "" ? dob.month : "January"
                                ),
                                parseInt(dob.year)
                              ),
                            },
                            (_, i) => i + 1
                          ).map((day) => (
                            <p
                              key={day}
                              onClick={() => setDob({ ...dob, day })}
                            >
                              {day}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-inter text-xl-4 text-neutral-800 mb-2">
                  Age Division
                </p>
                <div className="grid lg:grid-cols-2 gap-y-6">
                  {ageGroup.map((item) => (
                    <div className="flex gap-2">
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
                          fill={item.state ? "#EF4444" : "white"}
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="23"
                          height="23"
                          rx="3.5"
                          stroke="#D0D0D0"
                        />
                        {item.state && (
                        <path
                          d="M7 12.5L10.5 16L17 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      </svg>

                      <span className="font-inter text-xl-4 text-neutral-800">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-inter text-xl-4 text-neutral-800">
                  Child Passport Photograph{" "}
                  <span className="font-inter text-xl-4 text-neutral-700">
                    (Taken in the last six months)
                  </span>
                </label>
                <div className="flex px-4 py-4 rounded border-1 border-grey-200 mt-2 gap-2">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                        stroke="#AFB1B6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                        stroke="#AFB1B6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-grey-600 text-xl-3 font-inter">
                      Click to upload from computer or drop your file here
                    </p>
                    <p className="text-grey-800 text-xl-2 font-inter">
                      Supported files: jpg, png not bigger than 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step == 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                Relationship with child
              </label>
              <Select
                placeholder="Select Relationship"
                styles={customStyles}
                maxMenuHeight={150}
                onChange={(option) => setRole(option?.value)}
                options={roles}
              />
            </div>
            {role != "" && (
              <div>
                <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                  Relationship Type
                </label>

                <Select
                  placeholder="Select Relationship Type"
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
  );
};

export default ChildRegistration;
