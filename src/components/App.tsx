import { FC, useState  } from "react"
// import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import { API_ID, API_KEY } from "../utils/api_details";
import { getRepoPath, toastError } from "../utils/utils";

import repoData from '../data.json'
import LangDonutChart from "./LangDonutChart";
import BasicRepoInfo from "./BasicRepoInfo";
import ContributorsLeaderBoard from "./ContributorsLeaderBoard";

export interface LangValuePair {
  name: string;
  value: number;
}

export interface LambdaResponse {
  metadata: string;
  userdata: string;
  languages: string;
  contributors: string;
}

export interface Contributor{
  login : string;
  avatar_url : string;
  contributions: string
}


const App:FC = () => {

  const [data, setData] = useState<LambdaResponse>()
  const [input, setInput] = useState("")
  const [langData, setLangData] = useState<LangValuePair[] | []>([])
  const [userData, setUserData] = useState<any | []>([])
  const [metaData, setMetaData] = useState<any | []>([])
  const [contributors, setContributors] = useState<Contributor[] | []>([])

  
  // const headers = {
  //   'x-api-key': API_KEY
  // }

  const convertToKeyValue = (data: string): LangValuePair[] => {
    return Object.entries(JSON.parse(data)).map(([name, value]) => ({
      name,
      value: parseInt(value, 10)
    }));
  };
  
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
      // const res = await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-repo-stats/${repoPath}`, {headers: headers})

      console.log(repoData)

      setData(repoData)
      setLangData(convertToKeyValue(data!.languages))
      setUserData(JSON.parse(data!.userdata))
      setMetaData(JSON.parse(data!.metadata))
      setContributors(JSON.parse(data!.contributors))

  }


  return (
    <div className="main-div">
        <h1 className="header">GitHub Repository Stats</h1>
        <div className="input-div">
              <input type="text" placeholder="Enter GitHub repository url" className="input" value={input} onChange={(e) => setInput(e.target.value)}/>
              <button type="submit" className="submit-btn" onClick={getRepoStats}>Submit</button>
        </div>
        <BasicRepoInfo basicRepoInfo={metaData} userData={userData}/>
        <div className="flex w-full">
          <LangDonutChart langData={langData} />
          <ContributorsLeaderBoard contributors={contributors}/>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
