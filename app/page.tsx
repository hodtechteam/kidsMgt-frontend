
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (

    <div className="flex flex-row h-screen">
        <div className="w-1/2">
          <div className="my-16 mx-20">
            <h2 className="text-3xl">Member First Timer</h2>
            <p className="text-xl py-5">An HOD member or would you like to be an HOD member</p>

            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center justify-between rounded-full border-gray-200 border-2 py-1 px-2">
                <div className="rounded-full border-gray-200 w-8 h-8 border-2 flex items-center justify-center">
                  <span>1</span>
                </div>
                
                <p className="text-sm pl-2">Personal Informtion</p>
              </div>

              <div className="flex items-center justify-between rounded-full border-2 border-gray-200 py-1 px-2">
                <div className="rounded-full w-10 h-10 border-2 flex items-center justify-center border-gray-200">
                  <span>2</span>
                </div>
                
                <p className="text-sm pl-2">Child Informtion</p>
              </div>

              <div className="flex items-center justify-between rounded-full border-gray-200 border-2 py-1 px-2">
                <div className="rounded-full w-10 h-10 border-2 flex items-center justify-center border-gray-200">
                  <span>3</span>
                </div>
                
                <p className="text-sm pl-2">Caregiver Informtion</p>
              </div>
            </div>


            <div className="mt-8  "> 
              <p className="text-sky-700  text-xl py-5">Personal Information</p>

              <hr/>

              <p className="py-5">Basic Information</p>

              <form>
                <div>
                  <div className="flex gap-9">
                    <div className="w-1/2">
                      <label>First Name</label>
                      <Input  placeholder="Enter first name" className="py-6"/>
                    </div>
                    <div className="w-1/2">
                      <label>Last Name</label>
                      <Input  placeholder="Enter last name" className="py-6"/>
                    </div>
                  </div>


                  <div className="mt-6"> 
                    <label>Email</label>
                    <Input  placeholder="Enter email" type="email" className="py-6"/>
                  </div>


                  <div className="mt-6">
                    <p>Gender</p>
                    <div className="flex">
                      <div className="flex flex-row-reverse justify-items-start w-1/2 items-center bg-red-200">
                        <label className="ml-2">Male</label>
                        <Input type="checkbox" className="h-12 w-10"/>
                      </div>

                      <div className="flex flex-row-reverse items-center justify-items-start w-1/2">
                        <label className="ml-2">Female</label>
                        <Input type="checkbox" className="h-12 w-10"/>
                      </div>
                    </div>
                  </div>

                  <label>Phone Number</label>
                  <div className="flex gap-6">
                    
                    <div className="w-1/5">
                      <select className="w-full rounded-sm py-3 border-2 justify-center">
                        <option  className="text-black">+234</option>
                      </select>
                    </div>
                    <div className="w-4/5">
                      <input placeholder="9173535098" className="w-full rounded-sm py-3 b border-grey-100 border-2"/>
                    </div>
                  </div>


                  <div>
                    <label>Role in Church</label>
                    <select className="w-full rounded-sm py-4 bg-white border-grey-200 border-2">
                      <option disabled> Select Role</option>
                      
                    </select>
                  </div>

                </div>

                <div>

                  <p>Address</p>

                  <div className="flex gap-9">
                    <div className="w-1/2">
                        <label>State Address</label>
                        <Input  placeholder="Enter first name" className="py-6"/>
                      </div>
                      <div className="w-1/2">
                        <label>Country</label>
                        <Input  placeholder="Enter last name" className="py-6"/>
                      </div>
                  </div>

                  <div className="flex gap-9">
                    <div className="w-1/2">
                        <label>State</label>
                        <Input  placeholder="Enter first name" className="py-6"/>
                      </div>
                      <div className="w-1/2">
                        <label>LGA/City</label>
                        <Input  placeholder="Enter last name" className="py-6"/>
                      </div>
                  </div>
                </div>

                <div>
                  <p>Church Details</p>
                  <div className="w-full">
                    <label>LGA/City</label>
                    <select className="w-full rounded-sm py-4 bg-white border-grey-200 border-2 pl-2">
                      <option disabled>Select Location</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p>Means Of Identification</p>
                  <div className="w-full">
                    <label>Identification Type</label>
                    <select className="w-full rounded-sm py-4 bg-white border-grey-200 border-2 pl-2">
                      <option disabled>Select Identification Type</option>
                    </select>
                  </div>
                </div>

                <Button>Save and Proceed</Button>


                
              </form>

            </div>


          </div>



        </div>
        

        <div className="bg-gray-900 w-1/2">

        </div>

    </div>

    
  );
}
