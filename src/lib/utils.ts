import moment from "moment-timezone";

// export const formatDateUpload = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
export const formatDate_pl = (date : string) => moment(date).format("ddd DD MMM YYYY");


export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();

    const formattedDate = `${year}년 ${month < 10 ? "0" + month : month}월 ${day < 10 ? "0" + day : day}일 ${hours < 10 ? "0" + hours : hours}시`;
    return formattedDate;
  };