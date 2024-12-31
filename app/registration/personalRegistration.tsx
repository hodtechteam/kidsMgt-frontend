"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useContext, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { IPersonalForm, personalForm } from "../data/information/personal";
import { NavigationContext } from "./context/context";
import { NotificationIcon } from "../svg/notification";
import {
  countriesSchema,
  ISubDirectory,
  RoleKey,
  SubDirectories,
} from "../data/subcategory/personal";
import { FormSchemaType, Userschema } from "./schema";
import Identification from "../components/identification";
const PersonalRegistration = ({ schema }: any) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | undefined>("");
  const [subRole, setSubRole] = useState<ISubDirectory[] | []>([]);

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [selectedSubRole, setSelectedSubRole] = useState<string | undefined>(
    ""
  );
  const [identification, setIdentification] = useState<string | undefined>(
    undefined
  );
  // const [personalInformation, setPersonalInformation] = useState({
  //   firstName: "",
  //   lastName: "",
  //   gender: undefined, // Assuming `gender` is defined elsewhere, like an enum or a string
  //   email: "",
  //   roleInChurch: "",
  //   roleInType: "",
  //   streetAddress: "",
  //   country: "",
  //   state: "",
  //   lga: "",
  //   location: "",
  //   branch: "",
  //   identificationType: "",
  // });
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

  const inputStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: () => ({
      display: "flex",
      width: "100%",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
      fontWeight: 400,
      fontSize: "14px",
      fontFamily: "'Inter', sans-serif",
      borderWidth: "1px",
      borderRadius: "0.25rem",
      borderColor: "#E5E7EB",
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

  const identificationOptions = [
    { value: "nin", label: "National Identification Number (NIN)" },
    { value: "passport", label: "Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "voters_card", label: "Voter's Card" },
  ];

  const BranchOptions = countriesSchema.find(
    (item) => item.value == selectedCountry
  )?.branches;

  const countries = countriesSchema.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const state = countriesSchema.find(
    (item) => item.value == selectedCountry
  )?.states;
  const lga = state?.find((item) => item.value == selectedState)?.lgas;

  const HandleRoleChange = (selectedOption: SingleValue<ISubDirectory>) => {
    const selectedRole = selectedOption?.value as RoleKey;

    setRole(selectedRole);
    setSubRole(SubDirectories[selectedRole as RoleKey] || []);
    setValue("personal.roleInChurch", selectedRole);
  };

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
  const defaultValue = {
    firstName: "",
    lastName: "",
    gender: undefined, // No default value for enums; it starts empty here
    email: "",
    roleInChurch: "",
    roleType: "",
    streetAddress: "",
    country: "",
    state: "",
    lga: "",
    location: "",
    branch: "",
    identificationType: "",
  };

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(Userschema),
    defaultValues: {
      personal: defaultValue,
    },
  });

  const personal = watch("personal");

  console.log("personal", personal);

  // const Validate = () => {
  //   const currentFieldValue = getValues(`personal`);
  //   try {
  //     personalForm.parse(currentFieldValue);
  //   } catch (error) {
  //     console.log("validation error", error, "errors", errors);
  //   }
  // };

  const onSubmit = (data: any) => {
    console.log("in here");
    console.log("data", data);
    const currentFieldValue = getValues(`personal`);
    try {
      personalForm.parse(currentFieldValue);
      context?.setUserRole("child")
    } catch (error) {
      console.log("validation error", error, "errors", errors);
    }
  };

  // const submitForm: SubmitHandler<IPersonalForm> = handleSubmit(onsubmit);
  return (
    <div className="mt-4">
      <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
        Personal Information
      </p>

      <hr />

      <p className="mt-6 mb-4 font-neutral-700 font-inter font-semibold text-xl-4.5">
        Basic Details
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {step == 0 && (
          <div className="flex flex-col gap-6">
            <div className="lg:flex lg:gap-6 lg:items-center">
              <div className="lg:w-1/2 gap-2 flex flex-col">
                <label className="text-xl-4 font-normal font-inter text-neutral-800">
                  First Name
                </label>
                <input
                  {...register("personal.firstName")}
                  placeholder="Enter first name"
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.personal?.firstName && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.firstName.message}
                  </span>
                )}
              </div>
              <div className="lg:w-1/2 gap-2 flex flex-col">
                <label className="text-xl-4 font-normal font-inter text-neutral-800">
                  Last Name
                </label>
                <input
                  {...register("personal.lastName")}
                  placeholder="Enter last name"
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.personal?.lastName && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xl-4 font-normal font-inter text-neutral-800">
                Email
              </label>
              <input
                {...register("personal.email")}
                placeholder="Enter email"
                type="email"
                className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
              />
              {errors.personal?.email && (
                <span className="text-red-700 text-xl-2 font-inter ml-2">
                  {errors.personal?.email.message}
                </span>
              )}
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
                  <input
                    type="radio"
                    value="female"
                    className="h-6 w-6 rounded border-1 border-grey-300"
                    {...register("personal.gender")}
                  />
                </div>

                <div className="flex flex-row-reverse items-center justify-end w-1/2 gap-2">
                  <label className="text-xl-4 font-normal font-inter text-neutral-800">
                    Female
                  </label>
                  <input
                    type="radio"
                    value="male"
                    className="h-6 w-6 rounded border-1 border-grey-300"
                    {...register("personal.gender")}
                  />
                </div>
              </div>
              {errors.personal?.gender && (
                <span className="text-red-700 text-xl-2 font-inter ml-2">
                  {errors.personal?.gender.message}
                </span>
              )}
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
                  type="number"
                  step="1"
                  placeholder="9173535098"
                  className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 "
                  onFocus={() => setInputFocued(true)}
                  {...register("personal.phoneNumber")}
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-primary-main-500 text-right font-inter text-xl-4 underline decoration-solid decoration-auto underline-offset-autoF">
                  VERIFY
                </span>
              </div>
            </div>
            {errors.personal?.phoneNumber && (
                <span className="text-red-700 text-xl-2 font-inter ml-2">
                  {errors.personal?.phoneNumber.message}
                </span>
              )}
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
                <Controller
                  control={control}
                  name="personal.roleInChurch"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={customStyles}
                      maxMenuHeight={150}
                      onChange={HandleRoleChange}
                      options={roles}
                    />
                  )}
                />
                {errors.personal?.roleInChurch && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.roleInChurch.message}
                  </span>
                )}
              </div>
              {role != "" && (
                <div>
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Role Type
                  </label>
                  <Controller
                    control={control}
                    name="personal.roleType"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={customStyles}
                        // value={selectedSubRole}
                        onChange={(option) => {
                          onChange(option?.value)
                          // setSelectedSubRole(option?.value)
                        }}
                        maxMenuHeight={150}
                        options={subRole}
                      />
                    )}
                  />
                  {errors.personal?.roleType && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.personal?.roleType.message}
                    </span>
                  )}
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
                  Street Address
                </label>
                <input
                  placeholder="Enter state address"
                  {...register("personal.streetAddress")}
                  className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.personal?.streetAddress && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.streetAddress.message}
                  </span>
                )}
              </div>
              <div className="lg:w-1/2">
                <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                  Country
                </label>
                <Controller
                  control={control}
                  name="personal.country"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={inputStyles}
                      placeholder="Enter Country"
                      // value={selectedSubRole}
                      onChange={(option) => {
                        setSelectedCountry(option?.value);
                        onChange(option?.value);
                      }}
                      maxMenuHeight={150}
                      options={countries}
                    />
                  )}
                />
                {errors.personal?.country && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.country.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-9">
              <div className="lg:flex gap-9">
                <div className="lg:w-1/2">
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    State
                  </label>
                  <Controller
                    control={control}
                    name="personal.state"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter State"
                        // value={selectedSubRole}
                        onChange={(option) => {
                          setSelectedState(option?.value);
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={state}
                      />
                    )}
                  />
                  {errors.personal?.state && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.personal?.state.message}
                    </span>
                  )}
                </div>
                <div className="lg:w-1/2">
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    LGA/City
                  </label>
                  <Controller
                    control={control}
                    name="personal.lga"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter LGA/City"
                        // value={selectedSubRole}
                        onChange={(option) => {
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={lga}
                      />
                    )}
                  />
                  {errors.personal?.lga && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.personal?.lga.message}
                    </span>
                  )}
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
                  <Controller
                    control={control}
                    name="personal.branch"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter Church Branch"
                        // value={selectedSubRole}
                        onChange={(option) => {
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={BranchOptions}
                      />
                    )}
                  />
                  {errors.personal?.branch && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.personal?.branch.message}
                    </span>
                  )}
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
                <Controller
                  control={control}
                  name="personal.identificationType"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={inputStyles}
                      placeholder="Enter Identification Type"
                      // value={selectedSubRole}
                      onChange={(option) => {
                        setIdentification(option?.value);
                        onChange(option?.value);
                      }}
                      maxMenuHeight={150}
                      options={identificationOptions}
                    />
                  )}
                />

                {/* <select className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200">
                  <option disabled>Select Identification Type</option>
                </select> */}
                {errors.personal?.identificationType && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.personal?.identificationType.message}
                  </span>
                )}
              </div>
              {identification && (
                <Identification identification={identification} />
              )}
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
            <Button type="submit">
              Save and Proceed
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalRegistration;
