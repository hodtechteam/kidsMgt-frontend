"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Accordion } from "@mantine/core";
import { useContext, useEffect, useMemo, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { number, z } from "zod";
import { DatePicker, DateValue } from "@mantine/dates";
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
import { Radio, Group } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import {
  Controller,
  FieldError,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "../svg/trash";
import { ArrowDown } from "../svg/arrowDown";
import { childSchema, FormSchemaType, Userschema } from "./schema";
import { ArrowUp } from "../svg/arrowUp";

const ChildRegistration = () => {
  const [role, setRole] = useState<string | null>(null);
  const [subRole, setSubRole] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const [userRole] = useState("personal");
  const context = useContext(NavigationContext);

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

  const GuardianEnums = GuardianOptions.map((option) => option.value);

  const defaultValue = {
    firstName: "",
    lastName: "",
    gender: undefined,
    dob: new Date(),
    ageGroup: "",
    relationshipWithChild: "",
    relationshipWithParent: "",
    specialNeed: "",
    other: "",
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
      child: [defaultValue],
    },
  });

  const { fields, append, remove, prepend } = useFieldArray({
    name: "child",
    control,
  });

  const [id, setId] = useState(0);

  const ageGroups = [
    "Creche (6 months - 1 year)",
    "Ages 1 - 3",
    "Ages 4 - 5",
    "Ages 6 - 8",
    "Ages 9 - 12",
  ];

  // localStorage.setItem("array", JSON.stringify([]));
  const calculateAgeGroup = (dob: Date) => {
    if (dob == null) return "";
    const age = new Date().getFullYear() - dob.getFullYear();
    const month = new Date().getMonth() - dob.getMonth();

    switch (true) {
      case age === 0 && month >= 6 && age < 1:
        return "Creche (6 months - 1 year)";
      case age >= 1 && age <= 3:
        return "Ages 1 - 3";
      case age >= 4 && age <= 5:
        return "Ages 4 - 5";
      case age >= 6 && age <= 8:
        return "Ages 6 - 8";
      case age >= 9 && age <= 12:
        return "Ages 9 - 12";
      default:
        return "";
    }
  };

  const children = watch("child");

  // console.log("children", children)
  const AddAgeGroup = (date: Date | null, index: number) => {
    const ageGroup = calculateAgeGroup(date!);
    setValue(`child.${index}.ageGroup`, ageGroup, { shouldValidate: true });
    setFormattedDate(date!.toISOString().slice(0, 10));
  };

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: () => ({
      display: "flex",
      width: "100%",
      padding: "12px 12px 12px 12px",
      textSize: "14px",
      border: "1px solid #E4E5E7",
      borderRadius: "4px",
    }),
  };

  const onSubmit = (data: any, event: any) => {
    const formAction = event.nativeEvent.submitter.value;

    console.log("data", data);
  };

  const handleAppend = () => {
    const currentFieldValue = getValues(`child.${fields.length - 1}`);
    try {
      childSchema.parse(currentFieldValue);
      append(defaultValue);
    } catch (error) {
      console.log("validation error", error, "errors", errors);
    }
  };

  useEffect(() => {
    setId(fields.length - 1);
    console.log("formattedDate here", formattedDate);
    console.log("Fields updated:", fields, "id", fields.length - 1);
  }, [fields]);

  // console.log("child information", form);

  // console.log("childInformation", childInformation);
  // onClick={() => context?.setUserRole("caregiver")}
  let option: { value: string; label: string }[] = [];

  if (role && role == "parent") option = ParentOptions;
  if (role && role == "guardian") option = GuardianOptions;

  return (
    <div className="mt-4 relative">
      <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
        Child Information
      </p>

      <hr />
      <form
        className="flex flex-col gap-6 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            {fields.length > 1 && (
              <div className="flex items-center justify-between">
                <span>{`
                   ${
                     index < fields.length - 1
                       ? `(
                  ${getValues(`child.${index}.firstName`)} ${getValues(
                           `child.${index}.lastName`
                         )}
                   )`
                       : ""
                   }
                  
                  `}</span>

                <div className="flex items-center">
                  <Trash onClick={() => remove(index)} />
                  <div onClick={() => setId(index)}>
                    {index == id ? <ArrowUp /> : <ArrowDown />}
                  </div>
                </div>
              </div>
            )}

            {
              <div className={`${index == id ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-6">
                  <div className="lg:flex lg:gap-6 lg:items-center">
                    <div className="lg:w-1/2 gap-2 flex flex-col">
                      <label className="text-xl-4 font-normal font-inter text-neutral-800">
                        First Name
                      </label>
                      <input
                        {...register(`child.${index}.firstName`)}
                        // defaultValue={child.$[]firstName}
                        placeholder="Enter first name"
                        className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                      {errors.child?.[index]?.firstName && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {errors.child?.[index]?.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="lg:w-1/2 gap-2 flex flex-col">
                      <label className="text-xl-4 font-normal font-inter text-neutral-800">
                        Last Name
                      </label>
                      <input
                        {...register(`child.${index}.lastName`)}
                        defaultValue={""}
                        placeholder="Enter last name"
                        className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                      />
                      {errors.child?.[index]?.lastName && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {errors.child?.[index]?.lastName.message}
                        </span>
                      )}
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
                        <input
                          type="radio"
                          value="male"
                          className="h-6 w-6 rounded border-1 border-grey-300"
                          {...register(`child.${index}.gender`)}
                          defaultValue={""}
                        />
                      </div>

                      <div className="flex flex-row-reverse items-center justify-end w-1/2 gap-2">
                        <label className="text-xl-4 font-normal font-inter text-neutral-800">
                          Female
                        </label>
                        <input
                          type="radio"
                          value="female"
                          className="h-6 w-6 rounded border-1 border-grey-300"
                          {...register(`child.${index}.gender`)}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    {errors.child?.[index]?.gender && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.child?.[index]?.gender.message}
                      </span>
                    )}
                  </div>

                  <div className=" flex flex-col gap-6">
                    <div className="rounded bg-white">
                      <label className="text-xl-4 text-neutral-800 font-inter font-normal flex items-center">
                        Date of Birth
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          Note: Dob should be less than 6 months or greater than
                          12 years
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Date of Bate"
                          value={formattedDate}
                          readOnly
                          className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                        />
                        <DatePickerIcon
                          toggleDatePicker={() => setOpened(true)}
                        />
                      </div>
                      {opened && (
                        <Controller
                          control={control}
                          name={`child.${index}.dob`}
                          render={({ field: { onChange, value } }) => (
                            <DatePicker
                              ref={ref}
                              onChange={(date: DateValue) => {
                                setValue(`child.${index}.dob`, date!);
                                AddAgeGroup(date, index);
                              }}
                              value={value}
                              style={{
                                position: "absolute",
                                zIndex: 9,
                                backgroundColor: "white",
                                borderRadius: "4px",
                                right: 3,
                              }}
                            />
                          )}
                        />
                      )}
                      {errors.child?.[index]?.dob && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {errors.child?.[index]?.dob.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-inter text-xl-4 text-neutral-800 mb-2 flex items-center">
                        Age Division
                      </p>
                      <div className="grid lg:grid-cols-2 gap-y-6">
                        {ageGroups.map((item) => (
                          <div className="flex gap-2">
                            <CheckBoxIcon
                              state={
                                item == getValues(`child.${index}.ageGroup`)
                              }
                            />
                            <span className="font-inter text-xl-4 text-neutral-800">
                              {item}
                            </span>
                          </div>
                        ))}

                        <input
                          type="hidden"
                          {...register(`child.${index}.ageGroup`)}
                          defaultValue={""}
                          // value={calculateAgeGroup(DOB)

                          // }
                        />
                      </div>
                      {errors.child?.[index]?.ageGroup && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {errors.child?.[index]?.ageGroup.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="font-inter text-xl-4 text-neutral-800">
                        Child Passport Photograph{" "}
                        <span className="font-inter text-xl-4 text-neutral-700">
                          (Taken in the last six months)
                        </span>
                      </label>
                      <Photo />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                      Relationship with child
                    </label>
                    <Controller
                      control={control}
                      name={`child.${index}.relationshipWithChild`}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Select Relationship"
                          styles={customStyles}
                          maxMenuHeight={150}
                          onChange={(e) => {
                            setRole(e?.value || null);
                            setValue(
                              `child.${index}.relationshipWithChild`,
                              e?.value!
                            );
                          }}
                          options={Guardain}
                        />
                      )}
                    />
                    {errors.child?.[index]?.relationshipWithChild && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.child?.[index]?.relationshipWithChild.message}
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
                        name={`child.${index}.relationshipWithParent`}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            placeholder="Select Relationship Type"
                            styles={customStyles}
                            maxMenuHeight={150}
                            onChange={(option) => {
                              setValue(
                                `child.${index}.relationshipWithParent`,
                                option?.value!
                              );
                              setSubRole(option?.value || null);
                            }}
                            options={option}
                          />
                        )}
                      />
                      {errors.child?.[index]?.relationshipWithParent && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {
                            errors.child?.[index]?.relationshipWithParent
                              .message
                          }
                        </span>
                      )}
                    </div>
                  )}
                  {role == "guardian" && subRole == "other" && (
                    <div>
                      <input
                        {...register(`child.${index}.other`, {
                          required: "specify a relationship",
                        })}
                        placeholder="Specify relationship"
                        className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                      />
                      {errors.child?.[index]?.relationshipWithParent && (
                        <span className="text-red-700 text-xl-2 font-inter ml-2">
                          {
                            errors.child?.[index]?.relationshipWithParent
                              .message
                          }
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <label>Special Need(s)</label>
                    <textarea
                      {...register(`child.${index}.specialNeed`)}
                      defaultValue={""}
                      name=""
                      id=""
                      className="rounded border-gray-300 border resize-none scroll-smooth h-[100px] p-2 text-sm"
                      placeholder="Provide information on any special type of care that may need to be provided for the child."
                    ></textarea>
                  </div>
                </div>
              </div>
            }
          </div>
        ))}
        <div className="flex justify-between">
          <button
            className="flex items-center text-red-700 cursor-pointer"
            onClick={() => handleAppend()}
          >
            <Plus />
            Add another child
          </button>
          <button type="submit">Save and Proceed</button>
          {/* <Button type="submit" >Save and Proceed</Button> */}
        </div>
      </form>
    </div>
  );
};

export default ChildRegistration;
