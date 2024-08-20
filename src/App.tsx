import { useState } from "react"
import axios from "axios"
import { Bounce, ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_ID, API_KEY } from "./utils/api_details";


function App() {


  const [data, setData] = useState([])
  const [input, setInput] = useState("")

  const headers = {
    'x-api-key': API_KEY
  }


  const getRepoPath = (url: string) => {

      if(url === "") return url

      const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/;
 
      const match = url?.match(regex)


      if(match){
        return match[1] + "/" + match[2]
      }

      return "NULL"

  }

  const getRepoStats = async () => {

      const repoPath = getRepoPath(input)

      if(repoPath === ""){
        toast.error('GitHub repository URL field cannot be empty, Please enter a URL!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        console.log("error")
        return 
      }

      if(repoPath === "NULL"){
        toast.error('Invalid GitHub repository URL Please enter a valid URL!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        console.log("error")
        return 
      }
      console.log(repoPath)
      const res = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-repo-stats/${repoPath}`, {headers: headers})

      console.log(res)

      setData(res.data)

  }


  return (
    <div className="h-screen bg-[#F6F8FA] flex items-center flex-col">
        <h1 className="text-center text-2xl md:text-4xl font-mono mt-8">GitHub Repository Stats</h1>
        <div className="mt-28 flex flex-col">
              <input type="text" placeholder="Enter GitHub repository url" className="w-80 text-center py-2 text-black border border-gray-900 bg-[#F6F8FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" value={input} onChange={(e) => setInput(e.target.value)}/>
              <button type="submit" className="w-24 mx-auto px-2 py-1 mt-2 bg-[#1F2328] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800focus:outline-none" onClick={getRepoStats}>Submit</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
