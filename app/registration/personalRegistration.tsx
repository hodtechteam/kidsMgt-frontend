"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useContext, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { IPersonalForm, personalForm } from "../data/information/personal";
import { NavigationContext } from "./context/context";
import { NotificationIcon } from "../svg/notification";
import { ISubDirectory, RoleKey, SubDirectories } from "../data/subcategory/personal";
const PersonalRegistration = () => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | undefined>("");
  const [subRole, setSubRole] = useState<ISubDirectory[] | []>([]);
  const [selectedSubRole, setSelectedSubRole] = useState<string | undefined>("");
  const [personalInformation, setPersonalInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "", // Assuming `gender` is defined elsewhere, like an enum or a string
    email: "",
    roleInChurch: "",
    roleInType: "",
    streetAddress: "",
    country: "",
    state: "",
    lga: "",
    location: "",
    branch: "",
    identificationType: "",
  });
  const context = useContext(NavigationContext);

  const [inputFocused, setInputFocued] = useState(false);
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


  const HandleRoleChange = (selectedOption: SingleValue<ISubDirectory>) => {
    setSelectedSubRole("");
    const selectedRole = selectedOption?.value as RoleKey;
    setRole(selectedRole);
    setSubRole(SubDirectories[selectedRole as RoleKey] || []);
  }
  // const ministryOptions = [
  //   { value: "evangelism_and_mission", label: "Evangelism and Mission" },
  //   { value: "small_groups", label: "Small Groups" },
  //   { value: "worship_and_communications", label: "Worship & Communications" },
  //   { value: "assimilation", label: "Assimilation" },
  //   { value: "fellowship", label: "Fellowship" },
  //   { value: "hod_academy", label: "HOD Academy" },
  //   { value: "prayer", label: "Prayer" },
  //   { value: "stewardship", label: "Stewardship" },
  //   { value: "head_of_ministries", label: "Head of Ministries" },
  // ];

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(personalForm),
  });
  const submitForm: SubmitHandler<IPersonalForm> = (data) => console.log(data);
  return (
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
                  // {...register("firstName")}
                  placeholder="Enter first name"
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
              </div>
              <div className="lg:w-1/2 gap-2 flex flex-col">
                <label className="text-xl-4 font-normal font-inter text-neutral-800">
                  Last Name
                </label>
                <input
                  // {...register("lastName")}
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
                // {...register("email")}
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
              <div className="lg:w-4/5 w-full flex relative">
                <input
                  placeholder="9173535098"
                  className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 "
                  onFocus={() => setInputFocued(true)}
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-primary-main-500 text-right font-inter text-xl-4 underline decoration-solid decoration-auto underline-offset-autoF">
                  VERIFY
                </span>
              </div>
            </div>
            {inputFocused && (
              <div className="flex items-center gap-1">
                <NotificationIcon />

                <p className="font-inter text-xl-3 text-[#E08701]">
                  Phone number verification is compulsory. Kindly click on the
                  “VERIFY” button
                </p>
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div>
                <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                  Role in Church
                </label>
                <Select
                  styles={customStyles}
                  maxMenuHeight={150}
                  onChange={HandleRoleChange}
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
                    // value={selectedSubRole}
                    onChange={(option) => setSelectedSubRole(option?.value)}
                    maxMenuHeight={150}
                    options={subRole}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {step == 1 && (
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
                    Church Branch
                  </label>
                  <select className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200">
                    <option disabled>Select Location</option>
                  </select>
                </div>
              </div>
            </div>
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

          {step < 1 && (
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

          {step == 1 && (
            <Button type="submit" onClick={() => context?.setUserRole("child")}>
              Save and Proceed
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalRegistration;
