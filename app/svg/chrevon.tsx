import { ArrowDown } from "./arrowDown"
import { ArrowUp } from "./arrowUp"

export const Chrevon = ({isOpen, onClick}: {isOpen: boolean, onClick?: () => void}) => (
    isOpen ? <ArrowUp onClick={onClick}/> : <ArrowDown onClick={onClick}/>
);