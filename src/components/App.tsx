import { FC, useState, PureComponent } from "react"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_ID, API_KEY } from "../utils/api_details";
import { getRepoPath, toastError } from "../utils/utils";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import repoData from '../data.json'


const App:FC = () => {


  const [data, setData] = useState<any>([])
  const [input, setInput] = useState("")
  const [langData, setLangData] = useState<any>([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // const headers = {
  //   'x-api-key': API_KEY
  // }

  interface KeyValuePair {
    name: string;
    value: number;
  }
  
  const convertToKeyValue = (data: string): KeyValuePair[] => {
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

      console.log(repoData.data)

      setData(repoData.data)
      setLangData(convertToKeyValue(repoData.data.languages))

  }


  return (
    <div className="main-div">
        <h1 className="header">GitHub Repository Stats</h1>
        <div className="input-div">
              <input type="text" placeholder="Enter GitHub repository url" className="input" value={input} onChange={(e) => setInput(e.target.value)}/>
              <button type="submit" className="submit-btn" onClick={getRepoStats}>Submit</button>
        </div>
        <div className="mt-12 z-50">
            <PieChart width={800} height={400}>
              <Pie
                data={langData}
                innerRadius={60}
                outerRadius={88}
                paddingAngle={5}
                dataKey="value"
              >
                {langData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
        </div>
        <ToastContainer />
    </div>
  )
}

export default App
