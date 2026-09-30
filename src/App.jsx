import React from "react";

const App = () => {
  return <>
  <div className="h-screen w-full p-4 m-4 flex justify-center items-center flex-col">
 <h1>Student Management System</h1>
  <form>
    <label className="" htmlFor="">First Name</label>
    <input className="border border-black m-2 p-2 bg-amber-100" type="text" name="firstName" />
    <br /> <br />
    <label htmlFor="">Last Name</label>
    <input className="border border-black m-2 p-2 bg-amber-100" type="text" name="LastName" />
        <br /> <br />

    <label htmlFor="">Email</label>
    <input className="border border-black m-2 p-2 bg-amber-100" type="email" name="email" />
        <br /> <br />

    <label htmlFor="">Age</label>
    <input className="border border-black m-2 p-2 bg-amber-100" type="number" name="age" />
    <button className="p-4 m-4 bg-red-400" type="submit">Submit</button>
  </form>
  </div>
 
  </>
};

export default App;
