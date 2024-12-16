import {z} from "zod";
import { person } from "./person";


export const personalForm = person.extend({
    email: z.string().email(),
    roleInChurch: z.string(),
    roleInType: z.string(),
    streetAddress: z.string(),
    country: z.string(),
    state: z.string(),
    lga: z.string(),
    location: z.string(),
    branch: z.string(),
    identificationType: z.string(),
}).required();


export type IPersonalForm = z.infer<typeof personalForm>;