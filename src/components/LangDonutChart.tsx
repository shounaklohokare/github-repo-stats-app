import { FC } from "react"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer} from "recharts"
import { LangValuePair } from "./App";

interface LangDonutChartProps {
    langData : LangValuePair[] | []
}

const LangDonutChart:FC<LangDonutChartProps> = ({ langData }) => {

    const COLORS =['#C70039',  '#27AE60', '#0000FF', '#FDDA0D', '#FF00FF', '#00FFFF', '#800000', '#808000', '#800080', '#008080', '#808080', '#FFA500', 
                '#A52A2A', '#8A2BE2', '#DEB887', '#5F9EA0', '#7FFF00', '#D2691E', '#FF7F50', '#6495ED'];
    
    
    return  <div className="md:w-1/2 md:mt-8 w-full h-72">
                { langData.length > 0 && <h1 className="md:text-2xl text-xl text-nowrap text-center tracking-wide font-mono mb-12">Languages used in Repository</h1>}
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
                
            </div>

}

export default LangDonutChart;