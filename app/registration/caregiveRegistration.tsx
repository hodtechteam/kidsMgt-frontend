"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import Photo from "../components/photo";
import Plus from "../svg/plus";
import { caregiverArraySchemaType, careGiverSchema, Userschema } from "./schema";
import { Trash } from "../svg/trash";
import { ArrowUp } from "../svg/arrowUp";
import { ArrowDown } from "../svg/arrowDown";
import Identification from "../components/identification";
import {
  Guardain,
  GuardianOptions,
  identificationOptions,
  ISubDirectory,
  ParentOptions,
  RoleKey,
  roles,
  SubDirectories,
} from "../data/subcategory/personal";
import { NavigationContext } from "./context/context";
const CaregiverRegistration = () => {
  const [role, setRole] = useState<string | undefined>("");
  const [subRole, setSubRole] = useState<string | undefined>("");

  const [dutyRole, setDutyRole] = useState<string | undefined>("");
  const [subDutyRole, setDutySubRole] = useState<ISubDirectory[] | []>([]);
  const [identification, setIdentification] = useState<string | undefined>(
    undefined
  );
   const context = useContext(NavigationContext);

  const defaultValue = {
    firstName: "",
    lastName: "",
    gender: undefined,
    roleInChurch: "",
    roleType: "",
    relationshipWithChild: "",
    relationshipWithParent: "",
    other: "",
    identificationType: "",
  };

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<caregiverArraySchemaType>({
    resolver: zodResolver(Userschema),
    defaultValues: {
      caregiver: [defaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "caregiver",
    control,
  });

  const [id, setId] = useState(0);

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: () => ({
      display: "flex",
      width: "100%",
      padding: "10px",
      textSize: "14px",
      border: "1px solid #E4E5E7",
      borderRadius: "4px",
    }),
  };
  const inputStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: () => ({
      display: "flex",
      width: "100%",
      padding: "10px",
      fontWeight: 400,
      fontSize: "14px",
      fontFamily: "'Inter', sans-serif",
      borderWidth: "1px",
      borderRadius: "0.25rem",
      borderColor: "#E5E7EB",
    }),
  };
  const HandleRoleChange = (
    selectedOption: SingleValue<ISubDirectory>,
    onChange: (param: string) => void
  ) => {
    const selectedRole = selectedOption?.value as RoleKey;

    onChange(selectedRole);
    // setValue(`caregiver.${index}.roleInChurch`, selectedRole);
    setDutyRole(selectedRole);
    setDutySubRole(SubDirectories[selectedRole as RoleKey] || []);
  };

  const onSubmit = (data: caregiverArraySchemaType) => {
    const payload = {
      caregiver: data
  }
  if (!localStorage.getItem("payload")) {
    // localStorage.setItem("payload", JSON.stringify(payload));
  } else {
    const localData = localStorage.getItem("payload")
    const savedData = localData ? JSON.parse(localData) : {};
    localStorage.setItem("payload", JSON.stringify({...savedData, ...payload}));
  }
  };

  const handleAppend = () => {
    const currentFieldValue = getValues(`caregiver.${fields.length - 1}`);
    try {
      careGiverSchema.parse(currentFieldValue);
      append(defaultValue);
    } catch (error) {
      console.log("validation error", error, "errors", errors);
    }
  };

  useEffect(() => {
    setId(fields.length - 1);
    console.log("Fields updated:", fields, "id", fields.length - 1);
  }, [fields]);

  let option: { value: string; label: string }[] = [];

  if (role && role == "parent") option = ParentOptions;
  if (role && role == "guardian") option = GuardianOptions;
  return (
    <div className="mt-4 relative">
      <button onClick={() => context?.setUserRole("child")}>Back</button>
      <p className="text-primary-main-500 text-xl-4.5 pt-2.5 pb-4 font-semibold">
        caregiver Information
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
                <span>{`Caretaker ${index}
                   ${
                     index < fields.length - 1
                       ? `(
                  ${getValues(`caregiver.${index}.firstName`)} ${getValues(
                           `caregiver.${index}.lastName`
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
              <div
                className={`${index == id ? "flex flex-col gap-6" : "hidden"}`}
              >
                <div className="lg:flex lg:gap-6 lg:items-center">
                  <div className="lg:w-1/2 gap-2 flex flex-col">
                    <label className="text-xl-4 font-normal font-inter text-neutral-800">
                      First Name
                    </label>
                    <input
                      {...register(`caregiver.${index}.firstName`)}
                      placeholder="Enter first name"
                      className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                    />
                    {errors.caregiver?.[index]?.firstName && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.caregiver?.[index]?.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="lg:w-1/2 gap-2 flex flex-col">
                    <label className="text-xl-4 font-normal font-inter text-neutral-800">
                      Last Name
                    </label>
                    <input
                      {...register(`caregiver.${index}.lastName`)}
                      defaultValue={""}
                      placeholder="Enter last name"
                      className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200"
                    />
                    {errors.caregiver?.[index]?.lastName && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.caregiver?.[index]?.lastName.message}
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
                        {...register(`caregiver.${index}.gender`)}
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
                        {...register(`caregiver.${index}.gender`)}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {errors.caregiver?.[index]?.gender && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.caregiver?.[index]?.gender.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Role in Church
                  </label>
                  <Controller
                    control={control}
                    name={`caregiver.${index}.roleInChurch`}
                    render={({ field: { onChange } }) => (
                      <Select
                        styles={customStyles}
                        maxMenuHeight={150}
                        onChange={(option) =>
                          HandleRoleChange(option, onChange)
                        }
                        options={roles}
                      />
                    )}
                  />
                  {errors.caregiver?.[index]?.roleInChurch && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.caregiver?.[index]?.roleInChurch.message}
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
                      name={`caregiver.${index}.roleType`}
                      defaultValue=""
                      render={({ field: { onChange } }) => (
                        <Select
                          styles={customStyles}
                          onChange={(option) => {
                            onChange(option?.value);
                          }}
                          maxMenuHeight={150}
                          options={subDutyRole}
                        />
                      )}
                    />
                    {errors.caregiver?.[index]?.roleType && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {errors.caregiver?.[index]?.roleType.message}
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Relationship with child
                  </label>
                  <Controller
                    control={control}
                    name={`caregiver.${index}.relationshipWithChild`}
                    render={({ field: { onChange } }) => (
                      <Select
                        placeholder="Select Relationship"
                        styles={customStyles}
                        maxMenuHeight={150}
                        onChange={(e) => {
                          onChange(e?.value);
                          setRole(e?.value);
                        }}
                        options={Guardain}
                      />
                    )}
                  />
                  {errors.caregiver?.[index]?.relationshipWithChild && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.caregiver?.[index]?.relationshipWithChild.message}
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
                      name={`caregiver.${index}.relationshipWithParent`}
                      render={({ field: { onChange } }) => (
                        <Select
                          placeholder="Select Relationship Type"
                          styles={customStyles}
                          maxMenuHeight={150}
                          onChange={(option) => {
                            onChange(option?.value);
                            setSubRole(option?.value);
                          }}
                          options={option}
                        />
                      )}
                    />
                    {errors.caregiver?.[index]?.relationshipWithParent && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {
                          errors.caregiver?.[index]?.relationshipWithParent
                            .message
                        }
                      </span>
                    )}
                  </div>
                )}
                {role == "guardian" && subRole == "other" && (
                  <div>
                    <input
                      {...register(`caregiver.${index}.other`, {
                        required: "specify a relationship",
                      })}
                      placeholder="Specify relationship"
                      className="py-3 px-3 leading-6 font-normal text-xl-4 font-inter border-1 rounded border-neutral-200 w-full"
                    />
                    {errors.caregiver?.[index]?.relationshipWithParent && (
                      <span className="text-red-700 text-xl-2 font-inter ml-2">
                        {
                          errors.caregiver?.[index]?.relationshipWithParent
                            .message
                        }
                      </span>
                    )}
                  </div>
                )}

                <p className="text-xl-4 text-neutral-800 font-inter font-normal mt-4">
                  Means Of Identification
                </p>
                <div className="w-full">
                  <label className="text-xl-4 text-neutral-800 font-inter font-normal">
                    Identification Type
                  </label>
                  <Controller
                    control={control}
                    name={`caregiver.${index}.identificationType`}
                    defaultValue=""
                    render={({ field: { onChange } }) => (
                      <Select
                        styles={inputStyles}
                        placeholder="Enter Identification Type"
                        onChange={(option) => {
                          setIdentification(option?.value);
                          onChange(option?.value);
                        }}
                        maxMenuHeight={150}
                        options={identificationOptions}
                      />
                    )}
                  />
                  {errors.caregiver?.[index]?.identificationType && (
                    <span className="text-red-700 text-xl-2 font-inter ml-2">
                      {errors.caregiver?.[index]?.identificationType.message}
                    </span>
                  )}
                </div>
                {identification && (
                  <Identification identification={identification} />
                )}

                <div>
                  <label className="font-inter text-xl-4 text-neutral-800">
                    CareGiver Passport Photograph{" "}
                    <span className="font-inter text-xl-4 text-neutral-700">
                      (Taken in the last six months)
                    </span>
                  </label>
                  <Photo />
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
            Add another caregiver
          </button>
          <button type="submit">Save and Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default CaregiverRegistration;
