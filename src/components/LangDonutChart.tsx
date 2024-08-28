import { FC } from "react"
import { PieChart, Pie, Cell, Label, Legend, Tooltip, ResponsiveContainer} from "recharts"
import { LangValuePair } from "./App";

interface LangDonutChartProps {
    langData : LangValuePair[] | []
}

const LangDonutChart:FC<LangDonutChartProps> = ({ langData }) => {

    const COLORS =['#C70039',  '#27AE60', '#0000FF', '#FDDA0D', '#FF00FF', '#00FFFF', '#800000', '#808000', '#800080', '#008080', '#808080', '#FFA500', 
                '#A52A2A', '#8A2BE2', '#DEB887', '#5F9EA0', '#7FFF00', '#D2691E', '#FF7F50', '#6495ED'];
    
    
    return  <div className="mt-12 z-50 mx-auto w-96 h-72">
                <ResponsiveContainer >
                    <PieChart>
                        <Pie
                            data={langData}
                            innerRadius={52}
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
                { langData.length > 0 && <h1 className="text-2xl text-nowrap text-center tracking-wide font-mono mt-8">Languages used in Repository</h1>}
            </div>

}

export default LangDonutChart;