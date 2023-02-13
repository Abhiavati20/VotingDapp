import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import AddCandidate from "./components/AddCandidate";
import Voting from "./components/Voting";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./CONTRACT";

function App() {
  const { address } = useAccount();
  const [ screen , setScreen] = useState("home");
  const [candidates, setCandidates] = useState([]);

  const {data:signer} = useSigner();
  const contract = useContract({
    address:CONTRACT_ADDRESS,
    abi:CONTRACT_ABI,
    signerOrProvider:signer
  })

  const getCandidates = async () => {
    try {
      const count = await contract.candidateCount();
      console.log("Candidate Count", count.toString());
      let candidates_arr = [];
      for(let i = 1; i <= count; i++) {
        const candidate = await contract.candidates(i);
        const candidate_obj = {
          name : candidate[0],
          party: candidate[1],
          imageUri:candidate[2],
        }
        candidates_arr.push(candidate_obj);
      }
      setCandidates(candidates_arr);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(contract) {
      const getCandidateCount = async () => {
        const count = await contract.candidateCount();
        console.log("Candidate Count", count.toString());
      }

      const getTotalVotes = async () => {
        const totalVotes = await contract.totalVotes();
        console.log("Total Votes",totalVotes.toString());
      }

      getCandidateCount();
      getTotalVotes();
      getCandidates();
      
    }
    
  },[contract])
  console.log("Candidates ->",candidates);
  const addCandidate = async(name, party, imageUri) => {
    try {
      const transaction = await contract.addCandidate(name,party,imageUri)
      await transaction.wait();
      console.log(transaction);
      console.log("Candidate Added");
    } catch(error) {
      console.log(error)
    }
  }

  const vote = async (candidateId) => {
    try {
      const transaction = await contract.vote(candidateId);
      await transaction.wait();
      console.log(transaction);
      console.log("Voted");
      setScreen("home")
    } catch (error) {
      console.log(error)
    }
  }

  const RenderScreen = () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        {
          screen === 'addCandidate' ? (
            <AddCandidate setScreen={setScreen} addCandidate={addCandidate}/>
          ) : (
            <Voting setScreen={setScreen} vote={vote} candidates={candidates} />
          )
        }
      </div>
    )
  }
	return (
		<div className="bg-black text-white">
			<div className="flex items-center justify-between flex-row px-4 py-2">
				{/* Logo */}
				<h1 className="text-2xl font-bold">Voting DApp</h1>
				<ConnectButton />
			</div>
			{
        screen === "home" ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-extrabold">Voting DApp</h1>
            {
              address ?
              ( 
                <div className="flex flex-row gap-4 my-5 items-center justify-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setScreen("addCandidate")}>Add Candidate</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setScreen("vote")}>Vote</button>
                </div> 
              ) : (
                <ConnectButton />
              )  
            }
          
          </div>
        ) : (
          <RenderScreen />
        )
      }
		</div>
	);
}

export default App;
