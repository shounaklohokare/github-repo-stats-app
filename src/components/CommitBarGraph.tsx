import { FC } from "react"
import { CommitDetails } from "./App";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { useMediaQuery } from "react-responsive";

interface CommitBarGraphProps{
    commit_details : CommitDetails[] | []
}


const CommitBarGraph:FC<CommitBarGraphProps> = ({ commit_details}) => {

    if(commit_details.length < 1){
        return <></>
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return <div className="">
                <h1 className="md:text-2xl text-xl md:mt-[1.85rem] text-center font-mono mb-5">Year-wise Commits</h1>
                <ResponsiveContainer width={isMobile ? 360 : 700} height={isMobile ? 235 : 500}>
                    <BarChart
                        data={commit_details}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="commits" fill="#8884d8" />
                    </BarChart>
                    </ResponsiveContainer>
            </div>

}

export default CommitBarGraph;