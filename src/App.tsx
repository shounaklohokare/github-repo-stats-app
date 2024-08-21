import { useState } from "react"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_ID, API_KEY } from "./utils/api_details";
import { getRepoPath, toastError } from "./utils/utils";


function App() {


  const [data, setData] = useState([])
  const [input, setInput] = useState("")

  const headers = {
    'x-api-key': API_KEY
  }
  
  const getRepoStats = async () => {

      const repoPath = getRepoPath(input)

      if(repoPath === ""){
          toastError("GitHub repository URL field cannot be empty, Please enter a URL!")
          return 
      }

      if(repoPath === "NULL"){
          toastError('Invalid GitHub repository URL Please enter a valid URL!')
          return 
      }
      console.log(repoPath)
      const res = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-repo-stats/${repoPath}`, {headers: headers})

      console.log(res)

      setData(res.data)

  }


  return (
    <div className="main-div">
        <h1 className="header">GitHub Repository Stats</h1>
        <div className="input-div">
              <input type="text" placeholder="Enter GitHub repository url" className="input" value={input} onChange={(e) => setInput(e.target.value)}/>
              <button type="submit" className="submit-btn" onClick={getRepoStats}>Submit</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
