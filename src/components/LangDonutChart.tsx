import { FC } from "react"
import { PieChart, Pie, Cell, Label, Legend, Tooltip, ResponsiveContainer} from "recharts"
import { LangValuePair } from "./App";

interface LangDonutChartProps {
    langData : LangValuePair[] | []
}

const LangDonutChart:FC<LangDonutChartProps> = ({ langData }) => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return  <div className="mt-12 z-50 mx-auto w-96 h-72">
                <ResponsiveContainer >
                    <PieChart>
                        <Pie
                            data={langData}
                            innerRadius={60}
                            outerRadius={88}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            label={({ value }) => `${value} lines`}
                        >
                            {langData.map((_entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <h1 className="text-2xl text-nowrap text-center tracking-wide font-mono mt-8">Languages used in Repository</h1>
            </div>

}

export default LangDonutChart;