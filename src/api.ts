import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { formatDate } from "./lib/utils";

const instance = axios.create({
    baseURL : "http://127.0.0.1:8001/api/v1/",
    withCredentials : true,
        // 이 뜻은 Api 요청을 할 때 Cookie를 보내겠다는 의미
})

export const getMe = () => instance.get("users/me/").then((response) => response.data);

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
export const isSpvsrTeam = () => instance.get("users/isspvsr/team/").then((response) => response.data)
export const isSpvsrGames = () => instance.get("users/isspvsr/games/").then((response) => response.data)
export const isSpvsrTomGames = () => instance.get("users/isspvsr/toms/").then((response) => response.data)
export const isSpvsrSuperplayers = () => instance.get("users/isspvsr/superplayers/").then((response) => response.data)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getTeam = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/`)
    return response.data
}

export const getTeamGames = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/games/`)
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

export const getTeamPlayers = async ({ queryKey } : QueryFunctionContext) => {
    const [ _, teamPk ] = queryKey;
    const response = await instance.get(`teams/${teamPk}/players/`)
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

    export interface IGetTeamGamesRelativeVariables {
        teamPk : string,
        vsteam : string,
    }
    
export const getTeamGoalsRelative = ({ teamPk, vsteam } : IGetTeamGamesRelativeVariables) => instance.post(`teams/${teamPk}/goals-relative/`, 
    { vsteam }, 
    {
        headers :  {
            "X-CSRFToken" : Cookie.get("csrftoken") || ""
                // post 관련해서는 항상 보내줘야 하는 듯
        },
    }
    ).then((response) => response.data)

export interface ISpvsrTeamRegsiterVariables {
    name : string;
    since : number;
}

export const teamRegister = ({ name, since } : ISpvsrTeamRegsiterVariables ) => 
    instance.post("/teams/", 
                { name, since }, 
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
    backnumber : number
}

export const playerAdd = ({ teamPk, name, backnumber } : IPlayerAddVariables) => instance.post(`teams/${teamPk}/players/`, { name, backnumber }, 
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
    backnumber : number
}

export const playerUpdate = ({ playerPk, name, backnumber } : IPlayerUpdateVariables) => instance.put(`players/${playerPk}/`, { name, backnumber }, 
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
        participants? : number[],
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////