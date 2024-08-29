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

    return (basicRepoInfo.forks && <div className="flex my-10">
                    <div className="flex space-x-8 mt-6">
                        <RepoStat Icon={GoRepoForked} property="Forks" value={basicRepoInfo?.forks} />
                        <RepoStat Icon={GoIssueOpened} property="Open Issues" value={basicRepoInfo?.open_issues} />
                        <RepoStat Icon={GoStar} property="Stars" value={basicRepoInfo?.watchers_count} />
                        <RepoStat Icon={GoGitBranch} property="Default Branch" value={basicRepoInfo?.default_branch} />
                        <div className="flex font-mono">
                        <img src={userData?.avatar_url} className="h-[5.83rem]"/>
                        <div className="flex flex-col pl-6 mt-4">
                            <span>{basicRepoInfo?.owner?.login}</span>
                            <span>{basicRepoInfo?.name}</span>
                        </div>
                    </div>
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