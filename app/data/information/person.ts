import {z} from "zod";


const VALUES = ["female", "male"] as const;

const gender = z.enum(VALUES);
export const person = z.object({
  firstName : z.string(),
  lastName: z.string(),
  gender:  gender,
})