import { FC } from "react"
import { CommitDetails } from "./App";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface CommitBarGraphProps{
    commit_details : CommitDetails[] | []
}


const CommitBarGraph:FC<CommitBarGraphProps> = ({ commit_details}) => {



    return <div>
                <ResponsiveContainer width={800} height={500}>
                    <BarChart
                        data={commit_details}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="commits" fill="#8884d8" />
                    </BarChart>
                    </ResponsiveContainer>
            </div>


}

export default CommitBarGraph;