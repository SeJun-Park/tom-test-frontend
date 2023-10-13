export interface IUser {
    last_login: string;
    username: string;
    email: string;
    avatar: string;
    is_player: boolean;
    is_spvsr: boolean;
    date_joined: string;
}

export interface ISpvsrUser extends IUser {
    id : number,
    is_founder : boolean
}

export interface IPlayerUser extends IUser {
    connected_players : ITinyPlayer[],
    connecting_players : ITinyPlayer[],
}

export interface ITinyTeam {
    pk : number,
    avatar : string,
    description : string,
    name : string,
    since : number,
    is_spvsr : boolean,
}

export interface ITeam extends ITinyTeam {
    id : number,
    is_connecting_spvsr : boolean,
    founder : ISpvsrUser,
    is_founder : boolean,
    is_connected : boolean,
    is_connected_player_pk : number,
    is_connecting : boolean,
    is_connecting_player_pk : number,
}

export interface ITeamAllStats {
    not : number,
    win : number,
    draw : number,
    lose : number
}

export interface IVSteams {
    vsteams : string[]
}

export interface ITeamStatsRelative extends ITeamAllStats {
    vsteam : string
}

export interface IGoalPlayer {
    game : ITinyGame,
    player : ITinyPlayer
}

export interface IGoals {
    goals : number
}

export interface ITinyPlayer {
    pk : number,
    team : ITinyTeam,
    avatar : string,
    backnumber : number,
    name : string,
    is_connecting : boolean,
    is_connected : boolean,
    is_daily : boolean
}

export interface IPlayer extends ITinyPlayer {
    id : number,
    description : string,
    games : ITinyGame[],
    tom_games : ITinyGame[],
    superplayers : ISuperplayer[],
    connected_user : IPlayerUser,
    connected_at : string,
    connecting_user : IPlayerUser,
    connecting_at : string
}

export interface IVideo {
    id : number,
    file : string,
    game : ITinyGame,
    team : ITinyTeam,
}

export interface IPhoto {
    id : number,
    file : string,
    game : ITinyGame,
    team : ITinyTeam
}

export interface ITinyGame {
    pk : number,
    date : string,
    team : ITinyTeam,
    vsteam : string,
    team_score : number,
    vsteam_score : number,
    toms : ITinyPlayer[],
}

export interface IGame extends ITinyGame {
    id : number,
    location : string,
    start_time : string,
    end_time : string,
    participants : ITinyPlayer[],
    goals : IGoalPlayer[],
    videos : IVideo[],
    photos : IPhoto[],
    quotas : IGameQuota[]
}

export interface IGameVote {
    game : ITinyGame,
    start : string,
    end : string,
    candidates : ITinyPlayer[],
    participants : number[],
    is_candidate : boolean,
    is_participant : boolean,
}

export interface ISuperplayer {
    pk : number,
    player : ITinyPlayer,
    team : ITinyTeam,
}

export interface IFeed {
    id : number,
    team : ITinyTeam,
    created_at : string,
    title : string,
    payload : string,
    photos : IPhoto[],
}

export interface INoti {
    pk : number,
    team : ITinyTeam,
    name : string,
    description : string,
    dateTime : string,
    title : string,
    category : string,
    payload : string,
}

export interface ISchedule {
    id : number,
    team : ITinyTeam,
    dateTime : string,
    category : string,
    title : string,
}

export interface ITeamVote {
    pk : number,
    team : ITinyTeam,
    start : string,
    title : string,
    description : string,
    candidates : ITinyPlayer[],
    participants : number[],
    winners : ITinyPlayer[],
}

export interface IDuesDetail {
    id : number,
    team : ITinyTeam,
    title : string,
    memo : string,
    carry_over : number,
}

export interface IDuesInItem {
    id : number,
    dues_detail : IDuesDetail,
    title : string,
    date : string,
    amount : number,
    note : string,
}

export interface IDuesOutItem {
    id : number,
    dues_detail : IDuesDetail,
    title : string,
    date : string,
    amount : number,
    note : string,
}

export interface IDuesPayment {
    id : number,
    team : ITinyTeam,
    title : string,
    memo : string
}

export interface IDuesPaymentItem {
    id : number,
    dues_payment : IDuesPayment,
    player : ITinyPlayer,
    payment : string
}

export interface IDuesPaymentItemExtra {
    id : number,
    name : string,
    backnumber : number
}

export interface IGameQuota {
    id : number,
    game : ITinyGame,
    formation : string,
    lineups : ITinyPlayer[],
    memo : string,
}

export interface IAmount {
    amount : number;
}

export type Formation = '4-2-3-1' | '4-4-2' | '3-5-2'; // 여기에 모든 가능한 포메이션들을 추가합니다.

export interface IPlayerQuotasLength {
    playerId : number,
    gameQuotasLength : number
}