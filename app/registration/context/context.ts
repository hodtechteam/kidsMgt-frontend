import { createContext, Dispatch, SetStateAction } from "react";

interface IuserRole{
    userRole: string,
    setUserRole: Dispatch<SetStateAction<string>>
}
export const NavigationContext = createContext<IuserRole | undefined>(undefined);
