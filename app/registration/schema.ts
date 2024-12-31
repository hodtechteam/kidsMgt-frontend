

import { z } from "zod";

export const personalSchema = z.object({
    firstName: z.string().min(3, "FirstName is required"),
    lastName: z.string().min(3, "LastName is required"),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }).optional(),
    email: z.string().email(),
    phoneNumber: z.string().min(1, "Phone number is required").regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    roleInChurch: z.string().min(1, "Role in church is required"),
    roleType: z.string().min(1, "Role type is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    lga: z.string().min(1, "Local government area (LGA) is required"),
    location: z.string().min(1, "Location is required"),
    branch: z.string().min(1, "Branch is required"),
    identificationType: z.string().min(1, "Identification type is required")
  })
  export const childSchema = z
      .object({
        firstName: z.string().min(3, "FirstName is required"),
        lastName: z.string().min(3, "LastName is required"),
        gender: z.enum(["male", "female"], {
          required_error: "Gender is required",
        }).optional(),
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
      );

      export const Userschema = z.object({
        personal: personalSchema,
        child: childSchema.array().min(1)
      })


    export type FormSchemaType = z.infer<typeof Userschema>;