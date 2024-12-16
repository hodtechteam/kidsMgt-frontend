import React from 'react';
import { useContext } from 'react';
import { NavigationContext } from './context/context';
import PersonalRegistration from './personalRegistration';
import ChildRegistration from './childRegistration';
import CaregiverRegistration from './caregiveRegistration';

const Navigation = () => {
    const context = useContext(NavigationContext);

    switch(context?.userRole){
        case "child":
            return <ChildRegistration/>
        case "caregiver":
            return <CaregiverRegistration/>
        default:
            return <PersonalRegistration/> 

    }
}

export default Navigation