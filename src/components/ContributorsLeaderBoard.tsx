import { FC } from "react";
import { Contributor } from "./App";


interface ContrbutorProps{
    contributors : Contributor[] | []
}

const ContributorsLeaderBoard:FC<ContrbutorProps> = ({ contributors }) => {

    return (contributors.length > 0 && <div className="w-1/2 flex flex-col items-center">   
        <h1 className="text-2xl text-center font-mono">Contributors Leaderboard</h1>
        <div className="w-[37rem] mt-6 border-y border-black custom-scrollbar max-h-[34rem] overflow-x-auto ">
                <table className="min-w-full  border-separate border border-t-0 border-gray-800 rounded-[0.375rem] text-black">
                    <thead className="sticky top-0 z-10 bg-[#F6F8FA]">
                        <tr>
                            <th className="py-6 px-24 text-center font-bold uppercase tracking-wider"><span className="">Name</span></th> 
                            <th className="py-6 px-20 text-center font-bold uppercase tracking-wider">Contributions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {contributors.map((contributor)=> (<LeaderBoardRow login={contributor.login} contributions={contributor.contributions} avatar_url={contributor.avatar_url} /> ))}
                    </tbody>
                </table>
            </div></div>)


}

interface LeaderBoardRowProps{
    login: string;
    contributions: string;
    avatar_url: string;
}

const LeaderBoardRow:FC<LeaderBoardRowProps> = ({login, contributions, avatar_url}) => {

    return  <tr className="font-medium">
                <td className="flex p-6"><img src={avatar_url}  className="w-14 h-14 ml-4 mr-4 rounded-full"  /><span className="pt-[0.85rem]">{login}</span></td>
                <td className="p-6 text-center"><span className="mx-6">{contributions}</span></td>
            </tr>


}


export default ContributorsLeaderBoard;