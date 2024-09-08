import { FC } from "react"
import { getFormattedDate, getShortDate } from "../utils/utils"
import { GoRepoForked, GoIssueOpened, GoStar, GoGitBranch, GoEye } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { IconType } from "react-icons";
import { useMediaQuery } from 'react-responsive';

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

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    return (userData.id && (isMobile ? <InfoPanelMobile basicRepoInfo={basicRepoInfo} userData={userData}/> : <InfoPanelDesktop basicRepoInfo={basicRepoInfo} userData={userData}/>))

}

interface RepoStatProps{
    Icon: IconType;
    property: string;
    value: string;
}

const InfoPanelDesktop:FC<BasicRepoInfoProps> = ({ basicRepoInfo, userData  }) => {

    return (<div className="ml-6 flex my-8">
            <div className="flex p-2 flex-row space-x-8 mt-1 mx-8">
                <RepoStat Icon={GoRepoForked} property="Forks" value={basicRepoInfo?.forks} />
                <RepoStat Icon={GoIssueOpened} property="Open Issues" value={basicRepoInfo?.open_issues} />
                <RepoStat Icon={GoStar} property="Stars" value={basicRepoInfo?.watchers_count} />
                <RepoStat Icon={GoGitBranch} property="Default Branch" value={basicRepoInfo?.default_branch} />
            </div>
            <div className="flex p-2 flex-row font-mono">
                    <img src={userData?.avatar_url} className="md:h-[5.83rem] md:w-[5.83rem] h-[4.23rem] w-[4.23rem] rounded-md"/>
                    <div className="flex flex-col md:pl-6 mt-4">
                        <span>{basicRepoInfo?.owner?.login}</span>
                        <span>{basicRepoInfo?.name}</span>
                    </div>
            </div>
            <div className="flex p-2 flex-row md:space-x-8 mt-1 mx-8">
                <RepoStat Icon={GoEye} property="Watchers" value={basicRepoInfo.subscribers_count} />
                <RepoStat Icon={MdDateRange} property="Created" value={getFormattedDate(basicRepoInfo?.created_at)} />
                <RepoStat Icon={MdDateRange} property="Updated" value={getFormattedDate(basicRepoInfo?.updated_at)} />
            </div>
        </div>)

}

const InfoPanelMobile:FC<BasicRepoInfoProps> = ({ basicRepoInfo, userData  }) => {

    return (<div className="flex flex-col mt-8 mb-12">
                 <div className="flex w-full p-2 items-center  flex-col font-mono">
                    <img src={userData?.avatar_url} className="md:h-[5.83rem] md:w-[5.83rem] h-[4.23rem] w-[4.23rem] rounded-md"/>
                    <div className="flex flex-col items-center md:pl-6 mt-4">
                        <span>{basicRepoInfo?.owner?.login}</span>
                        <span>{basicRepoInfo?.name}</span>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex w-1/2 flex-col">
                        <RepoStat Icon={GoRepoForked} property="Forks" value={basicRepoInfo?.forks} />
                        <RepoStat Icon={GoIssueOpened} property="Open Issues" value={basicRepoInfo?.open_issues} />
                        <RepoStat Icon={GoStar} property="Stars" value={basicRepoInfo?.watchers_count} />
                        <RepoStat Icon={GoGitBranch} property="Default Branch" value={basicRepoInfo?.default_branch} />
                    </div>
                    <div className="flex w-1/2  flex-col">
                        <RepoStat Icon={GoEye} property="Watchers" value={basicRepoInfo.subscribers_count} />
                        <RepoStat Icon={MdDateRange} property="Created" value={getShortDate(basicRepoInfo?.created_at)} />
                        <RepoStat Icon={MdDateRange} property="Updated" value={getShortDate(basicRepoInfo?.updated_at)} />
                    </div>
                </div>
            </div>)



}

const RepoStat:FC<RepoStatProps> = ({Icon, property, value}) => {

    return <div className="flex space-x-3 pt-7 ml-7 font-mono text-nowrap">
                <Icon size="24"/>
                <span>{property}</span>
                <span>{value}</span>
            </div>

}
export default BasicRepoInfo;

