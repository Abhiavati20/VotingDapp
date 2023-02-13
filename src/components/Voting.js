import React from 'react'

const Voting = ({ setScreen, vote, candidates }) => {
    


    return (
        <div className='flex flex-col gap-4 items-center justify-center min-h-screen'>
            <button className='absolute top-14 left-10 underline' onClick={() => setScreen("home")}>Back</button>
            <h1 className='text-4xl font-extrabold'>Voting</h1>
            <div className='flex flex-wrap gap-10 items-center justify-center'>
                {
                    candidates.map(( candidate, i) => {
                        return (
                            <div key = {i} className = "flex flex-col border px-5 py-5 mx-5 rounded-lg gap-4 items-center justify-center">
                                <img src = { candidate.imageUri } alt="Candidate" className='object-contain w-40 h-40 rounded-full' />
                                <h1 className='text-2xl font-bold'>{candidate.name}</h1>
                                <p>{candidate.party}</p>
                                <button onClick={() => vote(i+1)} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                                    Vote
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Voting