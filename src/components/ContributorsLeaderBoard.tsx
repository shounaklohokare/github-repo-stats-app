import { FC } from "react";
import { Contributor } from "./App";


interface ContrbutorProps{
    contributors : Contributor[] | []
}

const ContributorsLeaderBoard:FC<ContrbutorProps> = ({ contributors }) => {

    return (contributors.length > 0 && <div className="flex px-3">
                <table className="w-1/2">
                    <thead>
                        <th>Name</th> 
                        <th>Contributions</th>
                    </thead>
                    <tbody>
                        {contributors.map((contributor)=> (<LeaderBoardRow login={contributor.login} contributions={contributor.contributions} avatar_url={contributor.avatar_url} /> ))}
                       
                    </tbody>
                </table>


            </div>)


}

interface LeaderBoardRowProps{
    login: string;
    contributions: string;
    avatar_url: string;
}

const LeaderBoardRow:FC<LeaderBoardRowProps> = ({login, contributions, avatar_url}) => {

    return  <tr>
                <td className="flex p-6"><img src={avatar_url}  className="h-[4.23rem]"  />{login}</td>
                <td className="p-6">{contributions}</td>
            </tr>


}


export default ContributorsLeaderBoard;