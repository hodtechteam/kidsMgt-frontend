"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { NavigationContext } from "./context/context";
import { NotificationIcon } from "../svg/notification";
import {
  countriesSchema,
  Guardain,
  GuardianOptions,
  identificationOptions,
  ISubDirectory,
  ParentOptions,
  RoleKey,
  roles,
  SubDirectories,
} from "../data/subcategory/personal";
import { personalSchema, PersonalSchemaType } from "./schema";
import Identification from "../components/identification";
const PersonalRegistration = ({ type }: { type: string }) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | undefined>("");
  const [subRole, setSubRole] = useState<string | undefined>("");

  const [dutyRole, setDutyRole] = useState<string | undefined>("");
  const [subDutyRole, setDutySubRole] = useState<ISubDirectory[] | []>([]);

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [identification, setIdentification] = useState<string | undefined>(
    undefined
  );

  const defaultValue = {
    firstName: "",
    lastName: "",
    gender: undefined,
    email: "",
    phoneNumber: "",
    roleInChurch: "",
    roleType: "",
    relationshipWithChild: "",
    relationshipWithParent: "",
    streetAddress: "",
    country: "",
    state: "",
    lga: "",
    branch: "",
    identificationType: "",
    identification: ""
  };

  const context = useContext(NavigationContext);
  
  let savedData: PersonalSchemaType  = defaultValue;
  if (typeof window !== "undefined" && window.localStorage) {
    const localData = localStorage.getItem("payload");
    console.log("payload", localData);
    savedData = localData ? JSON.parse(localData)["personal"] : defaultValue;
  }

  console.log("Saved data", savedData);

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

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PersonalSchemaType>({
    resolver: zodResolver(personalSchema),
    defaultValues: savedData,
  });

  useEffect(()=> {
    const selectedRole = getValues("roleInChurch");
    setDutyRole(selectedRole);
    setDutySubRole(SubDirectories[selectedRole as RoleKey] || []);

    setRole(getValues("relationshipWithChild"));
    const defaultCountry = getValues("country");
    setSelectedCountry(defaultCountry);

    const defaultState = getValues("state");
    setSelectedState(defaultState);
  }, [getValues])

  let option: { value: string; label: string }[] = [];

  if (role && role == "parent") option = ParentOptions;
  if (role && role == "guardian") option = GuardianOptions;

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

  const HandleRoleChange = (
    selectedOption: SingleValue<ISubDirectory>,
    onChange: (param: string) => void
  ) => {
    const selectedRole = selectedOption?.value as RoleKey;

    onChange(selectedRole);
    setDutyRole(selectedRole);
    setDutySubRole(SubDirectories[selectedRole as RoleKey] || []);
  };
  
  const onSubmit = (data: PersonalSchemaType) => {
    console.log("in here");
    console.log("data", data);

    try {
      const payload = {
        personal: data,
      };

      const localData = localStorage.getItem("payload");
      const savedData = localData ? JSON.parse(localData) : {};
      localStorage.setItem(
        "payload",
        JSON.stringify({ ...savedData, ...payload })
      );
      
      context?.setUserRole("child");
    } catch (error) {
      console.log("validation error", error, "errors", errors);
    }
  };

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
                  {...register("firstName")}
                  placeholder="Enter first name"
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.firstName && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="lg:w-1/2 gap-2 flex flex-col">
                <label className="text-xl-4 font-normal font-inter text-neutral-800">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  placeholder="Enter last name"
                  className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.lastName && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xl-4 font-normal font-inter text-neutral-800">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Enter email"
                type="email"
                className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
              />
              {errors.email && (
                <span className="text-red-700 text-xl-2 font-inter ml-2">
                  {errors.email.message}
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
                    {...register("gender")}
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
                    {...register("gender")}
                  />
                </div>
              </div>
              {errors.gender && (
                <span className="text-red-700 text-xl-2 font-inter ml-2">
                  {errors.gender.message}
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
                  {...register("phoneNumber")}
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-primary-main-500 text-right font-inter text-xl-4 underline decoration-solid decoration-auto underline-offset-autoF">
                  VERIFY
                </span>
              </div>
            </div>
            {errors.phoneNumber && (
              <span className="text-red-700 text-xl-2 font-inter ml-2">
                {errors.phoneNumber.message}
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
            {type == "member" && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Role in Church
                  </label>
                  <Controller
                    control={control}
                    name="roleInChurch"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={customStyles}
                        value={
                          roles.find((option) => option.value == value) || null
                        }
                        maxMenuHeight={150}
                        onChange={(option) =>
                          HandleRoleChange(option, onChange)
                        }
                        options={roles}
                      />
                    )}
                  />
                  {errors.roleInChurch && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.roleInChurch.message}
                    </span>
                  )}
                </div>
                {dutyRole != "" && (
                  <div>
                    <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Role Type
                    </label>
                    <Controller
                      control={control}
                      name="roleType"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          styles={customStyles}
                          value={
                            subDutyRole.find((option) => option.value == value) ||
                            null
                          }
                          onChange={(option) => {
                            onChange(option?.value);
                          }}
                          maxMenuHeight={150}
                          options={subDutyRole}
                        />
                      )}
                    />
                    {errors.roleType && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.roleType.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
                <div>
                    <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Relationship with child
                    </label>
                    <Controller
                      control={control}
                      name="relationshipWithChild"
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Select Relationship"
                          styles={customStyles}
                          value={Guardain.find(option => option.value == value) || null}
                          maxMenuHeight={150}
                          onChange={(e) => {
                            setRole(e?.value);
                            onChange(e?.value);
                          }}
                          options={Guardain}
                        />
                      )}
                    />
                    {errors.relationshipWithChild && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.relationshipWithChild.message}
                      </span>
                    )}
                  </div>
                  {role && (
                    <div>
                      <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                        Relationship Type
                      </label>
                      <Controller
                        control={control}
                        name="relationshipWithParent"
                        render={({ field: { onChange, value} }) => (
                          <Select
                            placeholder="Select Relationship Type"
                            styles={customStyles}
                            maxMenuHeight={150}
                            value={option.find(item => item.value == value) || null}
                            onChange={(option) => {
                              onChange(option?.value)
                              setSubRole(option?.value);
                            }}
                            options={option}
                          />
                        )}
                      />
                      {errors.relationshipWithParent && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {
                            errors.relationshipWithParent
                              .message
                          }
                        </span>
                      )}
                    </div>
                  )}
                  {role == "guardian" && subRole == "other" && (
                    <div>
                      <input
                        {...register("other", {
                          required: "specify a relationship",
                        })}
                        placeholder="Specify relationship"
                        className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                      />
                      {errors.other && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {
                            errors.other
                              .message
                          }
                        </span>
                      )}
                    </div>
                  )}

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
                  {...register("streetAddress")}
                  className="w-full py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                />
                {errors.streetAddress && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.streetAddress.message}
                  </span>
                )}
              </div>
              <div className="lg:w-1/2">
                <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                  Country
                </label>
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={inputStyles}
                      placeholder="Enter Country"
                      value={
                        countries.find((option) => option.value == value) ||
                        null
                      }
                      onChange={(option) => {
                        setSelectedCountry(option?.value);
                        onChange(option?.value);
                      }}
                      maxMenuHeight={150}
                      options={countries}
                    />
                  )}
                />
                {errors.country && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.country.message}
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
                    name="state"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter State"
                        value={
                          state?.find((option) => option.value == value) || null
                        }
                        onChange={(option) => {
                          setSelectedState(option?.value);
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={state}
                      />
                    )}
                  />
                  {errors.state && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.state.message}
                    </span>
                  )}
                </div>
                <div className="lg:w-1/2">
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    LGA/City
                  </label>
                  <Controller
                    control={control}
                    name="lga"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter LGA/City"
                        value={
                          lga?.find((option) => option.value == value) || null
                        }
                        onChange={(option) => {
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={lga}
                      />
                    )}
                  />
                  {errors.lga && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.lga.message}
                    </span>
                  )}
                </div>
              </div>
              {type == "member" && (
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
                      name="branch"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          styles={inputStyles}
                          placeholder="Enter Church Branch"
                          value={
                            BranchOptions?.find(
                              (option) => option.value == value
                            ) || null
                          }
                          onChange={(option) => {
                            onChange(option?.value);
                          }}
                          maxMenuHeight={150}
                          options={BranchOptions}
                        />
                      )}
                    />
                    {errors.branch && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.branch.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
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
                  name="identificationType"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={inputStyles}
                      placeholder="Enter Identification Type"
                      value={
                        identificationOptions.find(
                          (option) => option.value == value
                        ) || null
                      }
                      onChange={(option) => {
                        setIdentification(option?.value);
                        onChange(option?.value);
                      }}
                      maxMenuHeight={150}
                      options={identificationOptions}
                    />
                  )}
                />
                {errors.identificationType && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.identificationType.message}
                  </span>
                )}
              </div>
              {getValues("identificationType") && (
                <Identification identification={identification as string} />
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

          {step == 1 && <Button type="submit">Save and Proceed</Button>}
        </div>
      </form>
    </div>
  );
};

export default PersonalRegistration;
