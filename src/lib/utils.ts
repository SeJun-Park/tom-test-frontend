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



export const getPlayerQuotaFormation = ( formation : string, index : number ) => {
  if (formation === '4-2-3-1') {
    switch(index) {
      case 0:
        return "탑 공격수";
      case 1:
        return "왼쪽 윙";
      case 2:
        return "가운데 공격형 미드필더";
      case 3:
        return "오른쪽 윙";
      case 4:
        return "왼쪽 수비형 미드필더";
      case 5:
        return "오른쪽 수비형 미드필더";
      case 6:
        return "왼쪽 백";
      case 7:
        return "왼쪽 센터백";
      case 8:
        return "오른쪽 센터백";
      case 9:
        return "오른쪽 백";
      case 10:
        return "골키퍼";
      default:
        return null;
    }
  } else if (formation === '4-4-2') {
    switch(index) {
      case 0:
        return "왼쪽 탑 공격수";
      case 1:
        return "오른쪽 탑 공격수";
      case 2:
        return "왼쪽 윙";
      case 3:
        return "왼쪽 중앙 미드필더";
      case 4:
        return "오른쪽 중앙 미드필더";
      case 5:
        return "오른쪽 윙";
      case 6:
        return "왼쪽 백";
      case 7:
        return "왼쪽 센터백";
      case 8:
        return "오른쪽 센터백";
      case 9:
        return "오른쪽 백";
      case 10:
        return "골키퍼";
      default:
        return null;
    } 
  } else if (formation === '3-5-2') {
    switch(index) {
      case 0:
        return "왼쪽 탑 공격수";
      case 1:
        return "오른쪽 탑 공격수";
      case 2:
        return "왼쪽 윙";
      case 3:
        return "왼쪽 중앙 미드필더";
      case 4:
        return "가운데 중앙 미드필더";
      case 5:
        return "오른쪽 중앙 미드필더";
      case 6:
        return "오른쪽 윙";
      case 7:
        return "왼쪽 백";
      case 8:
        return "센터백";
      case 9:
        return "오른쪽 백";
      case 10:
        return "골키퍼";
      default:
        return null;
    }
  }
}