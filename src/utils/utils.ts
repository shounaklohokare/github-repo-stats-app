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



}

