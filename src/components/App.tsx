import { FC, useState  } from "react"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_ID, API_KEY } from "../utils/api_details";
import { formatCommitDetails, getRepoPath, toastError } from "../utils/utils";
import LangDonutChart from "./LangDonutChart";
import BasicRepoInfo from "./BasicRepoInfo";
import ContributorsLeaderBoard from "./ContributorsLeaderBoard";
import CommitBarGraph from "./CommitBarGraph";


export interface LangValuePair {
  name: string;
  value: number;
}

export interface LambdaResponse {
  metadata: string;
  userdata: string;
  languages: string;
  contributors: string;
  commits: string;
}

export interface CommitDetails{
    year : string
    commits : number
}

export interface Contributor{
  login : string;
  avatar_url : string;
  contributions: string
  html_url: string
}


const App:FC = () => {

  const [input, setInput] = useState("")
  const [langData, setLangData] = useState<LangValuePair[] | []>([])
  const [userData, setUserData] = useState<any | []>([])
  const [metaData, setMetaData] = useState<any | []>([])
  const [contributors, setContributors] = useState<Contributor[] | []>([])
  const [commitDetails, setCommitDetails] = useState<CommitDetails[] | []>([])

  
  const headers = {
    'x-api-key': API_KEY
  }

  const convertToKeyValue = (data: string): LangValuePair[] => {
      return Object.entries(JSON.parse(data)).map(([name, value]) => ({
        name,
        value: parseInt(JSON.stringify(value))
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
      const res : LambdaResponse = await (await axios.get(`https://${API_ID}.execute-api.ap-south-1.amazonaws.com/dev/get-repo-stats/${repoPath}`, { headers: headers })!).data

     

      setLangData(convertToKeyValue(res!.languages))
      setUserData(JSON.parse(res!.userdata))
      setMetaData(JSON.parse(res!.metadata))
      setContributors(JSON.parse(res!.contributors))

      const formattedCommits = formatCommitDetails(res!.commits)
      setCommitDetails(formattedCommits)

  }


  return (
    <div className="main-div">
        <h1 className="header">GitHub Repository Stats</h1>
        <div className="input-div">
              <input type="text" placeholder="Enter GitHub repository url" className="input" value={input} onChange={(e) => setInput(e.target.value)}/>
              <button type="submit" className="submit-btn" onClick={getRepoStats}>Submit</button>
        </div>
        <BasicRepoInfo basicRepoInfo={metaData} userData={userData}/>
        <div className="flex md:flex-row md:space-y-0 space-y-[10rem] flex-col w-full pb-12">
          <LangDonutChart langData={langData} />
          <ContributorsLeaderBoard contributors={contributors}/>
        </div>
        <div className="w-full flex items-center justify-center my-12 md:mr-0 mr-[2.25rem]">
            <CommitBarGraph commit_details={commitDetails}/>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
