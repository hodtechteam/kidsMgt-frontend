import {z} from "zod";
import { person } from "./person";


const child = person.extend({
    email: z.string().email(),
    childRelationship: z.string(),
    parentRelationship: z.string(),
})

const children = z.array(child);