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
import { Trash } from "../svg/trash";
import { ArrowDown } from "../svg/arrowDown";
import { Chrevon } from "../svg/chrevon";

const ChildRegistration = () => {
  const [id, setId] = useState(1);
  const [userRole] = useState("personal");
  const context = useContext(NavigationContext);
  const [form, setForm] = useState([
    {
      id,
      data: {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        ageGroup: "",
        relationshipWithChild: "",
        relationshipWithParent: "",
        other: "",
        specialNeed: "",
      },
      added: false,
      isOpen: true,
    },
  ]);

  // localStorage.setItem("array", "[]");

  type Form = {
    id: number;
    data: {
      firstName: string;
      lastName: string;
      gender: string;
      dob: string;
      ageGroup: string;
      relationshipWithChild: string;
      relationshipWithParent: string;
      specialNeed: string;
      other?: string;
    };
    added: boolean;
    isOpen: boolean;
  };

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
      relationshipWithParent: z
        .string()
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
        (data.relationshipWithChild === "parent" &&
          ["father", "mother"].includes(data.relationshipWithParent as any)) ||
        (data.relationshipWithChild === "guardian" &&
          GuardianEnums.includes(data.relationshipWithParent as any)),
      {
        message: "Invalid relationship for the selected type",
        path: ["relationshipWithParent"], // Error focus
      }
    );
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

    setForm([...addedFormData, ...form]);
  }, []);

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

  const DeleteForm = (id: number) => {
    // console.log("form", form);
    // console.log("filter", form.filter((formItem) => formItem.id != id))
    setForm(form.filter((formItem) => formItem.id != id));
    let array = localStorage.getItem("array");

    // console.log("form", form)
    // console.log("id", id)
    // JSON.parse(array).filter((formItem: Form) => formItem.id != id)
    if (array != null) {
      localStorage.setItem(
        "array",
        JSON.stringify(form.slice(0, -1))
      );
    }
  };
  const onSubmit = (data: FormFields, event: any) => {
    const formAction = event.nativeEvent.submitter.value;
    
    let array = localStorage.getItem("array");
    let arraies = array ? JSON.parse(array) : [];
    setId((prev) => prev + 1);
    arraies.push({ id: id + 1, data, added: true, isOpen: false });
    localStorage.setItem("array", JSON.stringify(arraies));

    //update form
    setForm([...arraies, ...form]);
    //clear form
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
        {form.map((item, index) => (
          <div>
            {form.length > 1 && (
              <div className="flex items-center justify-between">
                <span>{`Child ${index + 1} (${item.data.firstName} ${
                  item.data.lastName
                })`}</span>

                <div className="flex items-center">
                  <Trash onClick={() => DeleteForm(item.id)} />
                  {item.added ? (
                    <Chrevon
                      isOpen={item.isOpen}
                      onClick={() =>
                        setForm(
                          form.map((formItem) =>
                            formItem.id === item.id
                              ? { ...formItem, isOpen: !formItem.isOpen }
                              : formItem
                          )
                        )
                      }
                    />
                  ) : (
                    <Chrevon isOpen={item.isOpen} />
                  )}
                </div>
              </div>
            )}

            {
              <div className={item.isOpen ? "block" : "hidden"}>
                <div className="flex flex-col gap-6">
                  <div className="lg:flex lg:gap-6 lg:items-center">
                    <div className="lg:w-1/2 gap-2 flex flex-col">
                      <label className="text-xl-4 font-normal font-inter text-neutral-800">
                        First Name
                      </label>
                      <input
                        {...register("firstName")}
                        defaultValue={item.data.firstName}
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
                          value="male"
                          className="h-6 w-6 rounded border-1 border-grey-300"
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
                          value="female"
                          className="h-6 w-6 rounded border-1 border-grey-300"
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
                          Note: Dob should be less than 6 months or greater than
                          12 years
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Date of Bate"
                          value={formattedDate}
                          className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                        />
                        <DatePickerIcon
                          toggleDatePicker={toggleDatePickerView}
                        />
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
                  {role == "guardian" && subRole == "other" && (
                    <div>
                      <input
                        {...register("other", {
                          required: "specify a relationship",
                        })}
                        placeholder="Specify relationship"
                        className="py-4 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
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
            }
          </div>
        ))}
      </form>
    </div>
  );
};

export default ChildRegistration;
