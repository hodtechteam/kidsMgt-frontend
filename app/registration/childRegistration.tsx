"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Accordion } from "@mantine/core";
import { useContext, useEffect, useMemo, useState } from "react";
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
import { Radio, Group } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ChildRegistration = () => {
  // const [step, setStep] = useState(0);
  // const [role, setRole] = useState<string | undefined>("");
  // const [subRole, setSubRole] = useState<string | undefined>("");
  const [userRole] = useState("personal");
  const context = useContext(NavigationContext);
  const [form, setForm] = useState([
    {
      data: {
        firstName: "",
        lastName: "",
        gender: "",
        childDob: "",
        ageSection: "",
        relationshipWithChild: "",
        relationshipWithParent: "",
        other: "",
        specialNeed: "",
      },
      added: false,
      isOpen: false,
    },
  ]);

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
  const formSchema = z
    .object({
      firstName: z.string().min(3, "FirstName is required"),
      lastName: z.string().min(3, "LastName is required"),
      gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
      }),
      dob: z.date(),
      ageGroup: z
        .string()
        .nonempty("Age Group cannot be empty, select a valid dob"),
      relationshipWithChild: z
        .string()
        .nonempty("Select a relationship with child"),
      relationshipWithParent: z.string()
      .nonempty("Specify the relationship with the child"),
      other: z.string().optional(),
      specialNeed: z.string(),
    })
    .refine(
      (data) =>
        data.relationshipWithParent != "other" ||
        (data.relationshipWithParent === "other" && data.other),
      {
        message: "Please specify the relationship if 'Other' is selected",
        path: ["other"],
      }
    )
    .refine(
      (data) =>
        // First validation: Conditional enums for relationshipWithParent
        (data.relationshipWithChild === "parent" &&
          ["father", "mother"].includes(data.relationshipWithParent as any)) ||
        (data.relationshipWithChild === "guardian" &&
          GuardianEnums.includes(data.relationshipWithParent as any)),
      {
        message: "Invalid relationship for the selected type",
        path: ["relationshipWithParent"], // Error focus
      }
    )
    ;

  // message: "Please specify the relationship if 'Other' is selected"
  type FormFields = z.infer<typeof formSchema>;

  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // console.log({ dob });

  const DOB = watch("dob");
  const role = watch("relationshipWithChild");
  const subRole = watch("relationshipWithParent");
  const ageGroup = watch("ageGroup");
  // console.log("DOB", role, subRole);

  // const [ageGroup, setAgeGroup] = useState("");
  const ageGroups = [
    "Creche (6 months - 1 year)",
    "Ages 1 - 3",
    "Ages 4 - 5",
    "Ages 6 - 8",
    "Ages 9 - 12",
  ];

  const formattedDate = dob
    ? new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(dob)
    : "";

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

  useMemo(() => {
    const ageGroup = calculateAgeGroup(DOB);
    // setAgeGroup(ageGroup);
    setValue("ageGroup", ageGroup, { shouldValidate: true });

    console.log("agegroup set");
  }, [DOB, setValue]);

  useEffect(() => {
    let formData = localStorage.getItem("array");
    let addedFormData = formData ? JSON.parse(formData) : [];

    setForm([...form, ...addedFormData]);
  }, [])

  // useEffect(())

  // useMemo(() => {
  //   // if (parseInt(dob.year) != 0 && dob.month != "" && dob.day > 0) {
  //   if (dob != null) {
  //     const age = new Date().getFullYear() - dob.getFullYear();
  //     const month = new Date().getMonth() - dob.getMonth();
  //     // const setAge = (groupName: string): typeof ageGroup => {
  //     //   return ageGroup.map((group) =>
  //     //     group.name === groupName
  //     //       ? { ...group, state: true }
  //     //       : { ...group, state: false }
  //     //   );
  //     // };

  //     switch (true) {
  //       case age === 0 && month >= 6 && age < 1:
  //         // setAgeGroup(setAge("Creche (6 months - 1 year)"));
  //         setAgegroup("Creche (6 months - 1 year)");
  //         break;
  //       case age >= 1 && age <= 3:
  //         // ageGroup = "Ages 1 - 3";
  //         setAgegroup("Ages 1 - 3");
  //         // setAgeGroup(setAge("Ages 1 - 3"));
  //         break;
  //       case age >= 4 && age <= 5:
  //         // ageGroup = "Ages 4 -5";
  //         setAgegroup("Ages 4 - 5");
  //         // setAgeGroup(setAge("Ages 4 -5"));
  //         break;
  //       case age >= 6 && age <= 8:
  //         // ageGroup = "Ages 6 - 8";
  //         setAgegroup("Ages 6 - 8");
  //         // setAgeGroup(setAge("Ages 6 - 8"));
  //         break;
  //       case age >= 9 && age <= 12:
  //         // ageGroup = "Ages 9 - 12";
  //         setAgegroup("Ages 9 - 12");
  //         // setAgeGroup(setAge("Ages 9 - 12"));
  //         break;
  //       default:
  //         // console.log("default was called");
  //         // ageGroup = "";
  //         setAgegroup("");
  //         // setAgeGroup(setAge("default"));
  //         break;
  //     }
  //     setChildInformation((prevState) => ({
  //       ...prevState,
  //       ageSection: agegroup,
  //       childDob: formattedDate,
  //     }));
  //   }

  //   // console.log("age group", agegroup);
  // }, [dob, agegroup]);

  // let array = localStorage.getItem("array");
  // let arraies = array ? JSON.parse(array) : [];

  // const AddChild = () => {
  //   console.log("arraies", arraies);
  //   arraies.push(childInformation);
  //   localStorage.setItem("array", JSON.stringify(arraies));
  // };

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

  const toggleDatePickerView = () => {
    setShowDatePicker((prev) => !prev);
  };

  const onSubmit = (data: FormFields, event: any) => {
    const formAction = event.nativeEvent.submitter.value;

    console.log("data here haha");
    console.log("data", data);
    console.log("formAction", formAction);

    // if (formAction == "add") {

      console.log("data", data, formAction);
      let array = localStorage.getItem("array");
      let arraies = array ? JSON.parse(array) : [];
      arraies.push({ data, added: true, isOpen: false });
      localStorage.setItem("array", JSON.stringify(arraies));
    // }
  };




  console.log("child information", form);

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
        {form.map((item) => (
          <div>
            <div className="flex flex-col gap-6">
              <div className="lg:flex lg:gap-6 lg:items-center">
                <div className="lg:w-1/2 gap-2 flex flex-col">
                  <label className="text-xl-4 font-normal font-inter text-neutral-800">
                    First Name
                  </label>
                  <input
                    // onChange={(event) =>
                    //   setChildInformation({
                    //     ...childInformation,
                    //     firstName: event.target.value,
                    //   })
                    // }
                    {...register("firstName")}
                    defaultValue={item.data.firstName}
                    value={item.data.firstName}
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
                    // onChange={(event) =>
                    //   setChildInformation({
                    //     ...childInformation,
                    //     lastName: event.target.value,
                    //   })
                    // }
                    {...register("lastName")}
                    defaultValue={""}
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
                      // name="gender"
                      value="male"
                      className="h-6 w-6 rounded border-1 border-grey-300"
                      // onChange={handleRadio}
                      {...register("gender")}
                      defaultValue={""}
                    />
                  </div>

                  <div className="flex flex-row-reverse items-center justify-end w-1/2 gap-2">
                    <label className="text-xl-4 font-normal font-inter text-neutral-800">
                      Female
                    </label>
                    <input
                      type="radio"
                      // name="gender"
                      value="female"
                      className="h-6 w-6 rounded border-1 border-grey-300"
                      // onChange={handleRadio}
                      {...register("gender")}
                      defaultValue={""}
                    />
                  </div>
                </div>
                {errors.gender && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              <div className=" flex flex-col gap-6">
                <div className="rounded bg-white">
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal flex items-center">
                    Date of Birth
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      Note: Dob should be less than 6 months or greater than 12
                      years
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Date of Bate"
                      value={formattedDate}
                      className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                    />
                    {/* {agegroup == "" && (
                  <span className="text-red-700 text-xl-2 font-inter mt-3">
                    Child must be older than 6 months and less than 12 years
                  </span>
                )} */}

                    <DatePickerIcon toggleDatePicker={toggleDatePickerView} />
                  </div>
                  {showDatePicker && (
                    <Controller
                      control={control}
                      name="dob"
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          onChange={onChange}
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
                  {errors.dob && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.dob.message}
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-inter text-xl-4 text-neutral-800 mb-2 flex items-center">
                    Age Division
                    {/* {ageGroup == "" && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        Dob less than 6 months or greater than 12 years
                      </span>
                    )} */}
                  </p>
                  <div className="grid lg:grid-cols-2 gap-y-6">
                    {ageGroups.map((item) => (
                      <div className="flex gap-2">
                        <CheckBoxIcon state={item == ageGroup} />
                        <span className="font-inter text-xl-4 text-neutral-800">
                          {item}
                        </span>
                      </div>
                    ))}

                    <input
                      type="hidden"
                      {...register("ageGroup")}
                      defaultValue={""}
                      value={calculateAgeGroup(DOB)}
                    />
                  </div>
                  {errors.ageGroup && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.ageGroup.message}
                    </span>
                  )}
                </div>
                <Photo />
              </div>
            </div>

            <div className="flex flex-col gap-6">
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
                      maxMenuHeight={150}
                      onChange={(option) => onChange(option?.value || "")}
                      // defaultValue={""}
                      options={Guardain}
                    />
                  )}
                />
                {errors.relationshipWithChild && (
                  <span className="text-red-700 text-xl-2 font-inter ml-2">
                    {errors.relationshipWithChild.message}
                  </span>
                )}
                {/* onChange={(option) => {
                      setRole(option?.value);
                      setChildInformation((prevState) => ({
                        ...prevState,
                        relationshipWithChild: option?.value!,
                      }));
                    }} */}
                {/* <ReactDatePicker
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched/blur
                      selected={value}
                    /> */}
              </div>
              {role && (
                <div>
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Relationship Type
                  </label>
                  <Controller
                    control={control}
                    name="relationshipWithParent"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Select Relationship Type"
                        styles={customStyles}
                        maxMenuHeight={150}
                        onChange={(option) => onChange(option?.value || "")}
                        options={option}
                      />
                    )}
                  />
                  {errors.relationshipWithParent && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.relationshipWithParent.message}
                    </span>
                  )}
                </div>
              )}

              {/* {(option) => {
                      setSubRole(option?.value);
                      setChildInformation((prevState) => ({
                        ...prevState,
                        relationshipWithParent: option?.value!,
                      }));
                    }} */}
              {role == "guardian" && subRole == "other" && (
                <div>
                  <input
                    {...register("other", {
                      required: "specify a relationship",
                    })}
                    // value={childInformation.other}
                    placeholder="Specify relationship"
                    className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                    // onChange={(event) =>
                    //   setChildInformation((prevState) => ({
                    //     ...prevState,
                    //     other: event.target.value,
                    //   }))
                    // }
                  />
                  {errors.relationshipWithParent && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.relationshipWithParent.message}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label>Special Need(s)</label>
                <textarea
                  // value={childInformation.specialNeed}
                  {...register("specialNeed")}
                  defaultValue={""}
                  name=""
                  id=""
                  className="rounded border-gray-300 border resize-none scroll-smooth h-[100px]"
                  placeholder="Provide information on any special type of care that may need to be provided for the child."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="flex items-center text-red-700 cursor-pointer">
                <Plus />
                Add another child
              </button>
              <button type="submit">Save and Proceed</button>
              {/* <Button type="submit" >Save and Proceed</Button> */}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ChildRegistration;
