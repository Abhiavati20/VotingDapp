import React, { useState } from 'react'

const AddCandidate = ({ setScreen, addCandidate }) => {
    const [name,setName] = useState("");
    const [party,setParty] = useState("");
    const [imageUri,setImageUri] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(name==="" || party === "" || imageUri === ""){
                alert("Please Fill The Details!");
                return;
            }
            await addCandidate(name,party,imageUri);
            setScreen("home");
        } catch (error) {
            console.log("error")
        }
    }
    return (
        <div className='flex flex-col gap-4 items-center justify-center min-h-screen'>
            <button className='absolute top-14 left-10 underline' onClick={() => setScreen("home")}>Back</button>
            <form onSubmit={(e) => handleSubmit(e)} className = "flex flex-col gap-4 items-center justify-center min-h-screen">
                <h1 className='text-4xl font-extrabold'>Add Candidate</h1>
                <input type="text" placeholder="Enter Candidate's Name" onChange={(e)=>setName(e.target.value)} className='bg-gray-800 text-white px-4 py-2 rounded-lg'/>
                <input type="text" placeholder="Enter Candidate's Party" onChange={(e)=>setParty(e.target.value)} className='bg-gray-800 text-white px-4 py-2 rounded-lg'/>
                <input type="text" placeholder="Enter Candidate's Profile Image Link" onChange={(e)=>setImageUri(e.target.value)} className='bg-gray-800 text-white px-4 py-2 rounded-lg'/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Candidate</button>
            </form>
        </div>
    )
}

export default AddCandidate