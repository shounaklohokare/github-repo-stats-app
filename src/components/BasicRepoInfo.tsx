import { FC } from "react"
import { getFormattedDate } from "../utils/utils"
import { GoRepoForked, GoIssueOpened, GoStar, GoGitBranch, GoEye } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { IconType } from "react-icons";

interface BasicRepoInfo {
    forks: string;
    open_issues: string;
    watchers_count: string;
    default_branch: string;
    created_at: string;
    updated_at: string;
    subscribers_count: string;
    name: string;
    owner: Owner;
}

interface Owner{
    login: string;
}

interface BasicRepoInfoProps {
    basicRepoInfo : BasicRepoInfo
    userData : any
}

const BasicRepoInfo:FC<BasicRepoInfoProps> = ({ basicRepoInfo, userData  }) => {

    return (userData.id && <div className="ml-6 flex my-8">
                                <div className="flex md:flex-row flex-col md:space-x-8 mt-1 md:mx-8">
                                    <RepoStat Icon={GoRepoForked} property="Forks" value={basicRepoInfo?.forks} />
                                    <RepoStat Icon={GoIssueOpened} property="Open Issues" value={basicRepoInfo?.open_issues} />
                                    <RepoStat Icon={GoStar} property="Stars" value={basicRepoInfo?.watchers_count} />
                                    <RepoStat Icon={GoGitBranch} property="Default Branch" value={basicRepoInfo?.default_branch} />
                                </div>
                                <div className="flex md:flex-row flex-col font-mono">
                                        <img src={userData?.avatar_url} className="md:h-[5.83rem] md:w-[5.83rem] h-[4.23rem] w-[4.23rem] rounded-md"/>
                                        <div className="flex flex-col md:pl-6 mt-4">
                                            <span>{basicRepoInfo?.owner?.login}</span>
                                            <span>{basicRepoInfo?.name}</span>
                                        </div>
                                </div>
                                <div className="flex md:flex-row flex-col md:space-x-8 mt-1 md:mx-8">
                                    <RepoStat Icon={GoEye} property="Watchers" value={basicRepoInfo.subscribers_count} />
                                    <RepoStat Icon={MdDateRange} property="Created" value={getFormattedDate(basicRepoInfo?.created_at)} />
                                    <RepoStat Icon={MdDateRange} property="Updated" value={getFormattedDate(basicRepoInfo?.updated_at)} />
                                </div>
                            </div>)

}

interface RepoStatProps{
    Icon: IconType;
    property: string;
    value: string;
}


const RepoStat:FC<RepoStatProps> = ({Icon, property, value}) => {

    return <div className="flex space-x-3 pt-7 font-mono">
                <Icon size="24"/>
                <span>{property}</span>
                <span>{value}</span>
            </div>

}
export default BasicRepoInfo;