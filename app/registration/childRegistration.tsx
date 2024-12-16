"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { z } from "zod";
import { DatePicker } from "@mantine/dates";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Photo from "../components/photo";
import Plus from "../svg/plus";
import { NavigationContext } from "./context/context";
import { DatePickerIcon } from "../svg/datePicker";
import { CheckBoxIcon } from "../svg/checkbox";

const ChildRegistration = () => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | undefined>("");
  const [subRole, setSubRole] = useState<string | undefined>("");
  const [userRole] = useState("personal");
  const context = useContext(NavigationContext);

  const [childInformation, setChildInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "", // Assuming `gender` is defined elsewhere, like an enum or a string
    email: "",
    relationshipWithChild: "",
    relationshipWithParent: "",
  });

  // const []

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

  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  console.log({ dob });

  // const [dob, setDob] = useState<{
  //   year: string;
  //   month: string;
  //   day: number;
  // }>({
  //   year: "",
  //   month: "",
  //   day: 0,
  // });
  // getDaysInMonth(0, new Date().getFullYear())

  // const filteredMonths = months.filter((item) =>
  //   item.toLowerCase().startsWith(dob.month.toLowerCase())
  // );

  const [ageGroup, setAgeGroup] = useState<{ name: string; state: boolean }[]>([
    { name: "Creche (6 months - 1 year)", state: false },
    { name: "Ages 1 - 3", state: false },
    { name: "Ages 4 - 5", state: false },
    { name: "Ages 6 - 8", state: false },
    { name: "Ages 9 - 12", state: false },
  ]);


  // let ageGroup = "";

  useMemo(() => {
    // if (parseInt(dob.year) != 0 && dob.month != "" && dob.day > 0) {
    if(dob != null){
      const age = new Date().getFullYear() - dob.getFullYear();
      const month = new Date().getMonth() - dob.getMonth();
      const setAge = (groupName: string): typeof ageGroup => {
        return ageGroup.map((group) =>
          group.name === groupName
            ? { ...group, state: true }
            : { ...group, state: false }
        );
      };

      switch (true) {
        case age===0 && month >=6 && age < 1:
          setAgeGroup(setAge("Creche (6 months - 1 year)"));
          // ageGroup = "Creche (6 months - 1 year)";
          break;
        case age >= 1 && age <= 3:
          // ageGroup = "Ages 1 - 3";
          setAgeGroup(setAge("Ages 1 - 3"));
          break;
        case age >= 4 && age <= 5:
          // ageGroup = "Ages 4 -5";
          setAgeGroup(setAge("Ages 4 -5"));
          break;
        case age >= 6 && age <= 8:
          // ageGroup = "Ages 6 - 8";
          setAgeGroup(setAge("Ages 6 - 8"));
          break;
        case age >= 9 && age <= 12:
          // ageGroup = "Ages 9 - 12";
          setAgeGroup(setAge("Ages 9 - 12"));
          break;
        default:
          // console.log("default was called");
          // ageGroup = "";
          setAgeGroup(setAge("default"));
          break;
      }
    }
  }, [dob]);

  // const years = Array.from(
  //   { length: 13 },
  //   (_, i) => new Date().getFullYear() - i
  // );

  // console.log("years", years);

  // const filteredYears = useMemo(
  //   () => years.filter((year) => year.toString().startsWith(dob.year)),
  //   [dob.year]
  // );
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
  const toggleDatePickerView = () => {
    setShowDatePicker((prev) => !prev);
  };

  const formattedDate = dob ? new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dob) : "";


  // const HandleMonthChange = (event: any) => {
  //   setDob({ ...dob, month: event.target.value });
  //   setVisibility({ ...visibility, month: true });

  //   //empty input so set back the array
  // };

  const Guardain = [
    { value: "parent", label: "Parent" },
    { value: "guardian", label: "Gaurdian" },
  ];

  const ParentOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
  ];

  const GuardianOptions = [
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "aunty", label: "Aunty" },
    { value: "uncle", label: "Uncle" },
    { value: "other", label: "Other" },
  ];



  console.log("gaurdian", userRole)

  let option: {value: string, label : string}[] = [];

  if(role && role == "parent") option = ParentOptions;
  if(role && role == "guardian") option = GuardianOptions;



  return (
    <div className="mt-4 relative">
      <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
        Child Information
      </p>

      <hr />
      <form className="flex flex-col gap-6 mt-6">
        {/* {step == 0 && ( */}
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
              <div className="relative">
                <input
                  placeholder="Date of Bate"
                  value={formattedDate}
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                />
                {
                  ageGroup.every(item => item.state == false) && <span className="text-red-700 text-xl-2 font-inter mt-3">Child must be older than 6 months and less than 12 years</span>
                }
                
                <DatePickerIcon toggleDatePicker={toggleDatePickerView} />
              </div>
              {showDatePicker && (
                <DatePicker
                  value={dob}
                  onChange={setDob}
                  style={{
                    position: "absolute",
                    zIndex: 9,
                    backgroundColor: "white",
                    borderRadius: "4px",
                    right: 3,
                  }}
                />
              )}
            </div>

            <div>
              <p className="font-inter text-xl-4 text-neutral-800 mb-2">
                Age Division
              </p>
              <div className="grid lg:grid-cols-2 gap-y-6">
                {ageGroup.map((item) => (
                  <div className="flex gap-2">
                    <CheckBoxIcon state={item.state} />
                    <span className="font-inter text-xl-4 text-neutral-800">
                      {item.name} {item.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Photo />
          </div>
        </div>
        {/* )} */}

        {/* {step == 1 && ( */}
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
              options={Guardain}
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
                onChange={(option) => setSubRole(option?.value)}
                options={option}
              />
            </div>
          )}
          {(role == "guardian" && subRole == "other") && (
                <input
                placeholder="Specify relationship"
                className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
              />
          )}
          <div className="flex flex-col gap-1">
            <label>Special Need(s)</label>
            <textarea
              name=""
              id=""
              className="rounded border-gray-300 border resize-none scroll-smooth h-[100px]"
              placeholder="Provide information on any special type of care that may need to be provided for the child."
            ></textarea>
          </div>
        </div>
        {/* )} */}

        <div className="flex justify-between">
          <p className="flex items-center text-red-700">
            <Plus />
            Add another child
          </p>

          <Button
            type="submit"
            onClick={() => context?.setUserRole("caregiver")}
          >
            Save and Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChildRegistration;
