import { useState, useEffect } from "react"
import axios from "axios"


function App() {


  const [data, setData] = useState([])
  const [repoPath, setRepoPath] = useState("")



  const getRepoPath = (url: string) => {
      const match = url?.match("/github\.com\/([^/?#]+\/[^/?#]+)/") ?? "NULL"

      if(match){
        return match[1]
      }

      return "NULL"

  }

  const getRepoStats = () => {

      if(repoPath === "" || repoPath==="NULL"){
        console.log("error")
      }

  }


  return (
    <div className="h-screen bg-[#F6F8FA] flex items-center flex-col">
        <h1 className="text-center text-2xl md:text-4xl font-mono mt-8">GitHub Repository Stats</h1>
        <div className="mt-28 flex flex-col">
              <input type="text" placeholder="Enter GitHub repository url" className="w-80 text-center py-2 text-black border border-gray-900 bg-[#F6F8FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" value={repoPath} onChange={(e) => setRepoPath(getRepoPath(e.target.value))}/>
              <button type="submit" className="w-24 mx-auto px-2 py-1 mt-2 bg-[#1F2328] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800focus:outline-none" onClick={getRepoStats}>Submit</button>
        </div>
     
    </div>
  )
}

export default App
