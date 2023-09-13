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

export const formatGamesDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}년 ${month < 10 ? "0" + month : month}월 ${day < 10 ? "0" + day : day}일`;
    return formattedDate;
  };

export const formatCardsDate = (dateString: string): string => {
    const date = new Date(dateString);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = dayNames[date.getDay()]; // 요일 이름을 가져옵니다.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${year}년 ${month < 10 ? "0" + month : month}월 ${day < 10 ? "0" + day : day}일 ${dayOfWeek}요일 ${hours < 10 ? "0" + hours : hours}시 ${minutes < 10 ? "0" + minutes : minutes}분`;
    return formattedDate;
};

export const formatSchedulesDate = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayNames[date.getDay()]; // 요일 이름을 가져옵니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day < 10 ? "0" + day : day}일(${dayOfWeek}) ${hours < 10 ? "0" + hours : hours}시 ${minutes < 10 ? "0" + minutes : minutes}분`;
  return formattedDate;
};

export const formatDuesItemDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
  return formattedDate;
};