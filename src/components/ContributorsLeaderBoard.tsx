import { FC } from "react";
import { Contributor } from "./App";


interface ContrbutorProps{
    contributors : Contributor[] | []
}

const ContributorsLeaderBoard:FC<ContrbutorProps> = ({ contributors }) => {

    return (contributors.length > 0 && <div className="md:w-1/2 w-full flex flex-col items-center ">   
        <h1 className="md:text-2xl text-xl mt-10 text-center font-mono">Contributors Leaderboard</h1>
        <div className="md:w-[37rem] w-[25rem] mt-8 border-y border-black custom-scrollbar max-h-[34rem] overflow-x-hidden ">
                <table className="min-w-full  border-separate border border-t-0 border-gray-800 rounded-[0.375rem] text-black">
                    <thead className="sticky top-0 z-10 bg-[#F6F8FA]">
                        <tr>
                            <th className="py-2 px-14 md:py-6 md:px-24 text-center font-bold uppercase tracking-wider"><span className="">Name</span></th> 
                            <th className="py-2 px-14 md:py-6 md:px-20 text-center font-bold uppercase tracking-wider">Contributions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {contributors.map((contributor)=> (<LeaderBoardRow login={contributor.login} contributions={contributor.contributions} avatar_url={contributor.avatar_url} html_url={contributor.html_url} /> ))}
                    </tbody>
                </table>
            </div></div>)


}

interface LeaderBoardRowProps{
    login: string;
    contributions: string;
    avatar_url: string;
    html_url: string;
}

const LeaderBoardRow:FC<LeaderBoardRowProps> = ({login, contributions, avatar_url, html_url}) => {

    return  <tr className="font-medium cursor-pointer" onClick={()=> {  window.open(html_url, '_blank'); }}>
                <td className="flex md:p-6 p-2"><img src={avatar_url}  className="w-14 h-14  mr-4 rounded-full"  /><span className="pt-[0.85rem]">{login}</span></td>
                <td className="md:p-6 p-2 text-center"><span className="mx-6">{contributions}</span></td>
            </tr>


}


export default ContributorsLeaderBoard;