import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { IGameQuota } from "./types";

const instance = axios.create({
    baseURL : process.env.NODE_ENV === "development" ? "http://127.0.0.1:8001/api/v1/" : "https://api.3manofthematch.com/api/v1/",
    withCredentials : true,
        // 이 뜻은 Api 요청을 할 때 Cookie를 보내겠다는 의미
})

export const getMe = () => instance.get("users/me/").then((response) => response.data);

export interface IUpdateMeVariables {
    is_spvsr : boolean;
    is_player : boolean;
}

export const updateMe = ({ is_spvsr, is_player } : IUpdateMeVariables) => instance.put("users/me/", {is_spvsr, is_player}, {
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // logIn 관련해서는 항상 보내줘야 하는 듯
    },
}).then((response) => response.status);

export const logOut = () => instance.post("users/logout/", null, {
    // url, data, config 객체를 보낼 수 있음
    headers : {
    "X-CSRFToken" : Cookie.get("csrftoken") || ""
    // post 요청을 보낼 때 브라우저의 Cookie에서 csrftoken 을 추출하여 header에 "X-CSRFToken"에 넣어 보내고 있음
    // Django의 룰임, 비활성화 시킬 수도 있지만 추천하지 않음
    }
}).then((response) => response.data);


export interface IPlayerLoginVariables {
    code : string;
}

export const kakaoLogIn = ({code} : IPlayerLoginVariables) => instance.post("users/isplayer/kakaologin/", {code}, {
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // logIn 관련해서는 항상 보내줘야 하는 듯
    },
}).then((response) => response.status);

export interface ISpvsrLoginVariables {
    username : string;
    password : string;
}

export interface ISpvsrLoginSuccess {
    ok : string;
}

export interface ISpvsrLoginError {
    error : string;
}

export const spvsrLogIn = ({username, password}:ISpvsrLoginVariables) => 
    instance.post("users/isspvsr/login/", 
                { username, password }, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // logIn 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data);

export interface ISpvsrSignUpVariables {
    email : string; 
    username : string;
    password : string;
}

export const spvsrSignUp = ({ email, username, password } : ISpvsrSignUpVariables ) => 
    instance.post("users/spvsr/", 
                { email, username, password },
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const isPlayer = () => instance.get("users/isplayer/").then((response) => response.data);
export const isPlayerTeams = () => instance.get("users/isplayer/teams/").then((response) => response.data);
export const isPlayerGames = () => instance.get("users/isplayer/games/").then((response) => response.data);
export const isPlayerTomGames = () => instance.get("users/isplayer/toms/").then((response) => response.data);
export const isPlayerGoals = () => instance.get("users/isplayer/goals/").then((response) => response.data);
export const isPlayerGoalGames = () => instance.get("users/isplayer/goalgames/").then((response) => response.data);
export const isPlayerSuperplayers = () => instance.get("users/isplayer/superplayers/").then((response) => response.data)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const isSpvsr = () => instance.get("users/isspvsr/").then((response) => response.data)
export const isSpvsrTeams = () => instance.get("users/isspvsr/teams/").then((response) => response.data)
export const isSpvsrGames = () => instance.get("users/isspvsr/games/").then((response) => response.data)
export const isSpvsrTomGames = () => instance.get("users/isspvsr/toms/").then((response) => response.data)
export const isSpvsrSuperplayers = () => instance.get("users/isspvsr/superplayers/").then((response) => response.data)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getTeam = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/`)
    return response.data
}

export const getTeamReadOnly = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/readonly/`)
    return response.data
}

export const getTeamGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/games/`)
    return response.data
}

export const getTeamTomVoteIngGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/tomvoteing/`)
    return response.data
}

export const getTeamTomGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/toms/`)
    return response.data
}

export const getTeamGoals = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/goals/`)
    return response.data
}

export const getTeamGoalsAgainst = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/goals/against/`)
    return response.data
}

export const getTeamPlayers = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/`)
    return response.data
}

export const getTeamPlayersGoalStats = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/goalstats/`)
    return response.data
}

export const getTeamPlayersTOMStats = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/tomstats/`)
    return response.data
}

export const getTeamPlayersConnected = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/connected/`)
    return response.data
}

export const getTeamPlayersNotConnected = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/notconnected/`)
    return response.data
}

export const getTeamPlayersConnecting = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/connecting/`)
    return response.data
}

export const getTeamSuperplayers = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/superplayers/`)
    return response.data
}

export const getTeamStats = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/stats/`)
    return response.data
}

export const getTeamVSteams = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/vsteams/`)
    return response.data
}

export interface IGetTeamStatsRelativeVariables {
    teamPk : string,
    vsteam : string,
}

export const getTeamStatsRelative = ({ teamPk, vsteam } : IGetTeamStatsRelativeVariables) => instance.post(`teams/${teamPk}/stats-relative/`, 
    { vsteam }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IGetTeamGamesRelativeVariables {
    teamPk : string,
    vsteam : string,
}

export const getTeamGamesRelative = ({ teamPk, vsteam } : IGetTeamGamesRelativeVariables) => instance.post(`teams/${teamPk}/games-relative/`, 
    { vsteam }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IGetTeamGoalsRelativeVariables {
        teamPk : string,
        vsteam : string,
}
    
export const getTeamGoalsRelative = ({ teamPk, vsteam } : IGetTeamGoalsRelativeVariables) => instance.post(`teams/${teamPk}/goals-relative/`, 
    { vsteam }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IGetTeamGoalsAgainstRelativeVariables {
        teamPk : string,
        vsteam : string,
}


export const getTeamGoalsAgainstRelative = ({ teamPk, vsteam } : IGetTeamGoalsAgainstRelativeVariables) => instance.post(`teams/${teamPk}/goals-relative/against/`, 
    { vsteam }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getTeamVotes = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/votes/`)
    return response.data
}

export const getTeamFeeds = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/feeds/`)
    return response.data
}

export const getTeamFeed = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, feedPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/feeds/${feedPk}/`)
    return response.data
}


export const getTeamNotisMonth = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/notis/month/`)
    return response.data
}

export interface IGetTeamNotisByMonthVariables {
    teamPk : string,
    year : string,
    month : string
}

export const getTeamNotisByMonth = ({ teamPk, year, month } : IGetTeamNotisByMonthVariables) => instance.post(`teams/${teamPk}/notis/bymonth/`, { year, month }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export const getTeamSchedulesMonth = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/schedules/month/`)
    return response.data
}

export interface IGetTeamSchedulesByMonthVariables {
    teamPk : string,
    year : string,
    month : string
}

export const getTeamSchedulesByMonth = ({ teamPk, year, month } : IGetTeamSchedulesByMonthVariables) => instance.post(`teams/${teamPk}/schedules/bymonth/`, { year, month }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export const getTeamDuesPaymentList = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/list/`)
    return response.data
}

export interface IDuesPaymentAddVariables {
    teamPk : string,
    title : string,
    memo? : string
}

export const duesPaymentAdd = ({ teamPk, title, memo } : IDuesPaymentAddVariables) => instance.post(`teams/${teamPk}/dues/payments/`, 
    { title, memo }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export const getTeamDuesDetailList = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/list/`)
    return response.data
}

export const getTeamDuesDetail = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, detailPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/${detailPk}/`)
    return response.data
}

export interface IDuesDetailAddVariables {
    teamPk : string,
    title : string,
    memo? : string,
    carry_over? : number
}

export const duesDetailAdd = ({ teamPk, title, memo, carry_over } : IDuesDetailAddVariables) => instance.post(`teams/${teamPk}/dues/details/`, 
    { title, memo, carry_over }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesDetailDeleteVariables {
    teamPk : string,
    detailPk : string,
}

export const duesDetailDelete = ({ teamPk, detailPk } : IDuesDetailDeleteVariables) => instance.delete(`teams/${teamPk}/dues/details/${detailPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ICarryOverAddVariables {
    teamPk : string,
    detailPk : string,
    carry_over : number
}

export const carryOverAdd = ({ teamPk, detailPk, carry_over } : ICarryOverAddVariables) => instance.put(`teams/${teamPk}/dues/details/${detailPk}/`, { carry_over }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesDetailUpdateVariables {
    teamPk : string,
    detailPk : string,
    title : string,
    memo? : string
}

export const duesDetailUpdate = ({ teamPk, detailPk, title, memo } : IDuesDetailUpdateVariables) => instance.put(`teams/${teamPk}/dues/details/${detailPk}/`, { title, memo }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export const getTeamDuesInItems = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, detailPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/${detailPk}/in/items/`)
    return response.data
}

export const getTeamDuesOutItems = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, detailPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/${detailPk}/out/items/`)
    return response.data
}

export interface IDuesInItemAddVariables {
    teamPk : string,
    detailPk : string,
    title : string,
    date : string,
    amount : number,
    note? : string,
}

export const duesInItemAdd = ({ teamPk, detailPk, title, date, amount, note } : IDuesInItemAddVariables) => instance.post(`teams/${teamPk}/dues/details/${detailPk}/in/items/`, 
    { title, date, amount, note }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesOutItemAddVariables {
    teamPk : string,
    detailPk : string,
    title : string,
    date : string,
    amount : number,
    note? : string,
}

export const duesOutItemAdd = ({ teamPk, detailPk, title, date, amount, note } : IDuesOutItemAddVariables) => instance.post(`teams/${teamPk}/dues/details/${detailPk}/out/items/`, 
    { title, date, amount, note }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IDuesInItemDeleteVariables {
    teamPk : string,
    itemPk : string,
}

export const duesInItemDelete = ({ teamPk, itemPk } : IDuesInItemDeleteVariables) => instance.delete(`teams/${teamPk}/dues/details/in/${itemPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesOutItemDeleteVariables {
    teamPk : string,
    itemPk : string,
}

export const duesOutItemDelete = ({ teamPk, itemPk } : IDuesOutItemDeleteVariables) => instance.delete(`teams/${teamPk}/dues/details/out/${itemPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export const getTeamDuesInAmount = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, detailPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/${detailPk}/in/amount/`)
    return response.data
}

export const getTeamDuesOutAmount = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, detailPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/details/${detailPk}/out/amount/`)
    return response.data
}

export const getTeamDuesPayment = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, paymentPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/${paymentPk}/`)
    return response.data
}

export const getTeamDuesPaymentItems = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, paymentPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/${paymentPk}/items/`)
    return response.data
}

export const getTeamDuesPaymentItemsReadOnly = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, paymentPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/${paymentPk}/items/readonly/`)
    return response.data
}

export const getTeamDuesPaymentItemsExtra = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, paymentPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/${paymentPk}/items/extra/`)
    return response.data
}


export interface IDuesPaymentDeleteVariables {
    teamPk : string,
    paymentPk : string,
}

export const duesPaymentDelete = ({ teamPk, paymentPk } : IDuesPaymentDeleteVariables) => instance.delete(`teams/${teamPk}/dues/payments/${paymentPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesPaymentUpdateVariables {
    teamPk : string,
    paymentPk : string,
    title : string,
    memo? : string
}

export const duesPaymentUpdate = ({ teamPk, paymentPk, title, memo } : IDuesPaymentUpdateVariables) => instance.put(`teams/${teamPk}/dues/details/${paymentPk}/`, { title, memo }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)



export const getTeamDuesPaymentItemDetail = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk, itemPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/dues/payments/items/${itemPk}/`)
    return response.data
}


export interface IDuesPaymentItemDeleteVariables {
    teamPk : string,
    itemPk : string,
}

export const duesPaymentItemDelete = ({ teamPk, itemPk } : IDuesPaymentItemDeleteVariables) => instance.delete(`teams/${teamPk}/dues/payments/items/${itemPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesPaymentItemUpdateVariables {
    teamPk : string,
    itemPk : string,
    payment : string
}

export const duesPaymentItemUpdate = ({ teamPk, itemPk, payment } : IDuesPaymentItemUpdateVariables) => instance.put(`teams/${teamPk}/dues/payments/items/${itemPk}/`, { payment }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IDuesPaymentItemExtraAddVariables {
    teamPk : string,
    paymentPk : string,
    player : number
}

export const duesPaymentItemExtraAdd = ({ teamPk, paymentPk, player } : IDuesPaymentItemExtraAddVariables) => instance.post(`teams/${teamPk}/dues/payments/${paymentPk}/items/`, { player },
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ISpvsrFeedAddVariables {
    teamPk : string,
    title : string,
    payload : string
}

export const feedAdd = ({ teamPk, title, payload } : ISpvsrFeedAddVariables ) => 
    instance.post(`teams/${teamPk}/feeds/`, 
                { title, payload }, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)

export interface IFeedUpdateVariables {
    teamPk : string,
    feedPk : string,
    title : string,
    payload : string
}

export const feedUpdate = ({ teamPk, feedPk, title, payload } : IFeedUpdateVariables) => instance.put(`teams/${teamPk}/feeds/${feedPk}/`, { title, payload }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ISpvsrFeedDeleteVariables {
    teamPk : string,
    feedPk : string,
}
                
export const feedDelete = ({ teamPk, feedPk } : ISpvsrFeedDeleteVariables ) => 
    instance.delete(`teams/${teamPk}/feeds/${feedPk}/`, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)


export interface ICreateFeedPhotoVariables {
    teamPk : string;
    feedPk : string;
    file : string;
}

export const createFeedPhoto = ({ teamPk, feedPk, file } : ICreateFeedPhotoVariables ) => instance.post(`teams/${teamPk}/feeds/${feedPk}/photos/`, { file }, {
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // logIn 관련해서는 항상 보내줘야 하는 듯
            // post 관련해서 항상 보내줘야 함
    },
}).then((response) => response.data); 

    
export interface IPhotoDeleteVariables {
    photoPk : string;
}


export interface ISpvsrScheduleAddVariables {
    teamPk : string,
    title : string,
    date : string,
    time : string,
    category : string,
}

export const scheduleAdd = ({ teamPk, title, date, time, category } : ISpvsrScheduleAddVariables ) => 
    instance.post(`teams/${teamPk}/schedules/`, 
                { title, date, time, category }, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)


export interface ISpvsrScheduleDeleteVariables {
    teamPk : string,
    schedulePk : string,
}
                
export const scheduleDelete = ({ teamPk, schedulePk } : ISpvsrScheduleDeleteVariables ) => 
    instance.delete(`teams/${teamPk}/schedules/${schedulePk}/`, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)


export interface ITeamUpdateVariables {
    teamPk : string;
    description? : string;
    since? : number;
    code : number;
}

export const teamUpdate = ({ teamPk, description, since, code } : ITeamUpdateVariables) => instance.put(`teams/${teamPk}/`, { description, since, code }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ITeamPhotoUploadVariables {
    teamPk : string;
    avatar : string;
}

export const teamPhotoUpload = ({ teamPk, avatar } : ITeamPhotoUploadVariables) => instance.put(`teams/${teamPk}/photo/`, { avatar }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ITeamPhotoDeleteVariables {
    teamPk : string;
}

export const teamPhotoDelete = ({teamPk} : ITeamPhotoDeleteVariables) => instance.delete(`teams/${teamPk}/photo/`, 
{
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // post 관련해서는 항상 보내줘야 하는 듯
    },
}
).then((response) => response.data)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface ISpvsrTeamRegsiterVariables {
    name : string;
    since : number;
    description? : string;
    code : number;
}

export const teamRegister = ({ name, since, description, code } : ISpvsrTeamRegsiterVariables ) => 
    instance.post("/teams/", 
                { name, since, description, code }, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)


export interface ISearchTeamVariables {
    name : string;
}

export const searchTeam = ({ name } : ISearchTeamVariables ) => 
    instance.post("/teams/search/", 
                { name }, 
                {
                    headers :  {
                        "X-CSRFToken" : Cookie.get("csrftoken") || ""
                            // post 관련해서는 항상 보내줘야 하는 듯
                    },
                }
                ).then((response) => response.data)



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPlayer = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/`)
    return response.data;
}

export const getPlayerGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/games/`)
    return response.data
}

export const getPlayerGoals = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/goals/`)
    return response.data
}

export const getPlayerGoalGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/goalgames/`)
    return response.data
}

export const getPlayerTomGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/toms/`)
    return response.data
}

export const getPlayerSuperplayers = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, playerPk ] = queryKey;
    const response = await instance.get(`players/${playerPk}/superplayers/`)
    return response.data
}

export interface IPlayerConnectingVariables {
    playerPk : string,
    code : number
}

export const playerConnecting = ({ playerPk, code } : IPlayerConnectingVariables) => instance.post(`players/${playerPk}/connecting/`, {code}, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IPlayerConnectingCancelVariables {
    playerPk : string,
}

export const playerConnectingCancel = ({ playerPk } : IPlayerConnectingCancelVariables) => instance.post(`players/${playerPk}/connecting-cancel/`, null, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IPlayerAddVariables {
    teamPk : string,
    name : string,
    backnumber : number,
    description? : string
}

export const playerAdd = ({ teamPk, name, backnumber, description } : IPlayerAddVariables) => instance.post(`teams/${teamPk}/players/`, { name, backnumber, description }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IPlayerDailyAddVariables {
    gamePk : string,
    name : string,
}

export const playerDailyAdd = ({ gamePk, name } : IPlayerDailyAddVariables) => instance.post(`games/${gamePk}/players/`, { name }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IPlayerUpdateVariables {
    playerPk : string,
    name : string,
    backnumber : number,
    description? : string
}

export const playerUpdate = ({ playerPk, name, backnumber, description } : IPlayerUpdateVariables) => instance.put(`players/${playerPk}/`, { name, backnumber, description }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IPlayerDeleteVariables {
    playerPk : string
}

export const playerDelete = ({ playerPk } : IPlayerDeleteVariables) => instance.delete(`players/${playerPk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IPlayerConnectVariables {
        playerPk : string,
    }

export const playerConnect = ({ playerPk } : IPlayerConnectVariables) => instance.post(`players/${playerPk}/connect/`, null, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IPlayerPhotoUploadVariables {
    playerPk : string;
    avatar : string;
}

export const playerPhotoUpload = ({ playerPk, avatar } : IPlayerPhotoUploadVariables) => instance.put(`players/${playerPk}/photo/`, { avatar }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IPlayerPhotoDeleteVariables {
    playerPk : string;
}

export const playerPhotoDelete = ({ playerPk } : IPlayerPhotoDeleteVariables) => instance.delete(`players/${playerPk}/photo/`, 
{
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // post 관련해서는 항상 보내줘야 하는 듯
    },
}
).then((response) => response.data)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getGame = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, gamePk ] = queryKey;
    const response = await instance.get(`games/${gamePk}/`)
    return response.data;
}

export const getGameVote = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, gamePk ] = queryKey;
    const response = await instance.get(`games/${gamePk}/vote/`)
    return response.data;
}

export interface ITomVoteBallotVariables {
    gamePk : string,
    ballots : number[]
}

export const tomVoteBallot = ({ gamePk, ballots } : ITomVoteBallotVariables) => instance.put(`games/${gamePk}/vote/`, 
    { ballots }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IGameUploadVariables {
    teamPk : string,
    team : string,
    vsteam : string,
    location : string,
    date : string,
    start_time : string,
    end_time : string,
    participants : number[],
}

export const gameUpload = ({ teamPk, team, vsteam, location, date, start_time, end_time, participants } : IGameUploadVariables) => instance.post(`teams/${teamPk}/games/`, 
    { team, vsteam, location, date, start_time, end_time, participants }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IGameUpdateVariables {
        gamePk : string,
        vsteam : string,
        team_score? : number,
        vsteam_score? : number,
        location : string,
        start_time : string,
        end_time : string,
        participants : number[],
        goals? : number[]
    }

export const gameUpdate = ({ gamePk, vsteam, team_score, vsteam_score, location, start_time, end_time, participants, goals } : IGameUpdateVariables) => instance.put(`games/${gamePk}/`, 
    { vsteam, team_score, vsteam_score, location, start_time, end_time, participants, goals }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface IGameDeleteVariables {
    gamePk : string
}

export const gameDelete = ({ gamePk } : IGameDeleteVariables) => instance.delete(`games/${gamePk}/`, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface IGameVideoAddVariables {
    gamePk : string,
    file : string
}

export const gameVideoAdd = ({ gamePk, file } : IGameVideoAddVariables) => instance.post(`games/${gamePk}/videos/`, { file },
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)


export interface ICreateGamePhotoVariables {
    gamePk : string;
    file : string;
}

export const createGamePhoto = ({gamePk, file } : ICreateGamePhotoVariables ) => instance.post(`games/${gamePk}/photos/`, { file }, {
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // logIn 관련해서는 항상 보내줘야 하는 듯
            // post 관련해서 항상 보내줘야 함
    },
}).then((response) => response.data); 

    
export interface IPhotoDeleteVariables {
    photoPk : string;
}

export const photoDelete = ({ photoPk } : IPhotoDeleteVariables) => instance.delete(`medias/photos/${photoPk}/`, 
{
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // post 관련해서는 항상 보내줘야 하는 듯
    },
}
).then((response) => response.data)


export interface IVideoDeleteVariables {
    videoPk : string;
}

export const videoDelete = ({ videoPk } : IVideoDeleteVariables) => instance.delete(`medias/videos/${videoPk}/`, 
{
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // post 관련해서는 항상 보내줘야 하는 듯
    },
}
).then((response) => response.data)


export const getGameQuotas = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, gamePk ] = queryKey;
    const response = await instance.get(`games/${gamePk}/quotas/`)
    return response.data;
}

export const getGameQuota = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, gamePk, quotaPk ] = queryKey;
    const response = await instance.get(`games/${gamePk}/quotas/${quotaPk}/`)
    return response.data;
}


export interface IGameQuotaUploadVariables {
    gamePk : string,
    quotasData : IGameQuota[],
}

export const gameQuotaUpload = ({ gamePk, quotasData } : IGameQuotaUploadVariables) => instance.post(`games/${gamePk}/quotas/`, quotasData, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || "",
                // post 관련해서는 항상 보내줘야 하는 듯
            "Content-Type": "application/json"
        },
    }
    ).then((response) => response.data)


export interface IGameQuotaUpdateVariables {
    gamePk : string,
    quotaPk : string,
    formation : string,
    lineups : number[],
    memo? : string
}

export const gameQuotaUpdate = ({ gamePk, quotaPk, formation ,lineups ,memo } : IGameQuotaUpdateVariables) => instance.put(`games/${gamePk}/quotas/${quotaPk}/`, { formation ,lineups ,memo }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || "",
                // post 관련해서는 항상 보내줘야 하는 듯
            "Content-Type": "application/json"
        },
    }
    ).then((response) => response.data)


export interface IGameQuotasDeleteVariables {
    gamePk : string;
}

export const gameQuotasDelete = ({ gamePk } : IGameQuotasDeleteVariables) => instance.delete(`games/${gamePk}/quotas/`, 
{
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // post 관련해서는 항상 보내줘야 하는 듯
    },
}
).then((response) => response.data)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 진짜 그냥 URL만 요청하는 Post request라 args가 없음 (logout마냥)
export const getUploadURL = () => instance.post("medias/photos/get-url/", null, {
    headers :  {
        "X-CSRFToken" : Cookie.get("csrftoken") || ""
            // logIn 관련해서는 항상 보내줘야 하는 듯
            // post 할 떄 항상 보내주는 듯!
    },
}).then((response) => response.data)


export interface IUploadImageVariables {
    file : FileList;
    uploadURL : string;
}

// 실제 upload 하는 request
export const uploadImage = async ( { file, uploadURL } : IUploadImageVariables ) => {
    const formData = new FormData();
        // form을 강제로 추가하고 (진짜 HTML form을 만드는 것처럼)
    formData.append("file", file[0]);
        // 'file' -> 파일 이름을 적는 input을 추가, FileList 형태의 file을 입력받아 file의 첫 번째 요소인 이미지를 입력받은 것처럼 강제로 만들고 있음, 여러 개일 경우 index를 여러 개 뽑아주면 됨
        // 우리가 파일을 업로드 하면, 그 파일은 file(FileList)의 첫 번째 항목에 들어감
    return axios.post(uploadURL, formData, {
        headers : {
            "Content-Type" : "multipart/form-data",
            // 이건 CloudFlare에게 우리가 파일을 업로드한다고 알려주는 것
        }
    }).then((response) => response.data)
}