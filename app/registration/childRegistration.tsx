"use client";
import { useEffect, useState, useContext} from "react";
import { DatePicker, DateValue } from "@mantine/dates";
import Photo from "../components/photo";
import Plus from "../svg/plus";
import { DatePickerIcon } from "../svg/datePicker";
import { CheckBoxIcon } from "../svg/checkbox";
import { useClickOutside } from "@mantine/hooks";
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "../svg/trash";
import { ArrowDown } from "../svg/arrowDown";
import { childArraySchema, ChildArraySchemaType, childSchema} from "./schema";
import { ArrowUp } from "../svg/arrowUp";
import { NavigationContext } from "./context/context";

const ChildRegistration = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const context = useContext(NavigationContext);



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

  const localData = localStorage.getItem("payload");
  const savedData = localData ? JSON.parse(localData)["child"] : {
    child: [defaultValue],
  };

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildArraySchemaType>({
    resolver: zodResolver(childArraySchema),
    defaultValues: savedData,
  });


    useEffect(()=> {
      const child = getValues("child");
      child.map(item => {
        const date = new Date(item.dob);
        
        setFormattedDate(date.toISOString().slice(0, 10));
      })
    },[getValues])

  const { fields, append, remove } = useFieldArray({
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

  const AddAgeGroup = (date: Date | null, index: number) => {
    const ageGroup = calculateAgeGroup(date!);
    setValue(`child.${index}.ageGroup`, ageGroup, { shouldValidate: true });
    setFormattedDate(date!.toISOString().slice(0, 10));
  };


  const onSubmit = (data: ChildArraySchemaType) => {
    const payload = {
      child: data
    }
    if (!localStorage.getItem("payload")) {
      // localStorage.setItem("payload", JSON.stringify(payload));
    } else {
      const localData = localStorage.getItem("payload")
      const savedData = localData ? JSON.parse(localData) : {};
      localStorage.setItem("payload", JSON.stringify({...savedData, ...payload}));
    }
    try {
      context?.setUserRole("caregiver")
    } catch (error) {
      console.log("validation error", error, "errors", errors);
    }
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
    console.log("Fields updated:", fields, "id", fields.length - 1);
  }, [fields]);

  return (
    <div className="mt-4 relative">
      <button onClick={() => context?.setUserRole("personal")}>Back</button>
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
                                onChange(date);
                                AddAgeGroup(date, index);
                              }}
                              value={typeof value === "string" ? new Date(value) : value}
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
                        {ageGroups.map((item, ageGroupIndex) => (
                          
                          <div className="flex gap-2" key={ageGroupIndex}>                             
                            <CheckBoxIcon
                              state={
                                item === getValues(`child.${index}.ageGroup`)
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
                          // defaultValue={""}
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
