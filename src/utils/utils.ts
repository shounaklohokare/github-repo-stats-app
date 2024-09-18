import { Bounce, toast } from "react-toastify";


export const toastError = (message : string) => {

    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

}

export const getRepoPath = (url: string) => {

    if(url === "") return url

    const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/;

    const match = url?.match(regex)


    if(match){
      return match[1] + "/" + match[2]
    }

    return "NULL"

}

export const getFormattedDate = (isoDate : string) => {

    const date = new Date(isoDate);

    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();


    return `${day} ${month} ${year}`;


}

export const getShortDate = (isoDate : string) => {

    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear().toString().slice(-2);


    return `${day}/${month}/${year}`;

}

export const formatCommitDetails = (commit_details : string) => {

    const committsByYear: { [key: string]: number } = {}
    for(const x of JSON.parse(commit_details)){
    
        const date = new Date(x?.commit?.author?.date);

        const year = date.getFullYear();


        if(year.toString() in committsByYear){
            committsByYear[year] += 1;
        }else{
            committsByYear[year] = 1;
        }

    }

    return Object.keys(committsByYear).map(year => ({
        year: year,
        commits: committsByYear[year]
      }))
}

