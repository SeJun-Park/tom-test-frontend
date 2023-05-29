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
    team : ITinyTeam
}

export interface IPlayerUser extends IUser {
    connected_players : ITinyPlayer[],
    connecting_players : ITinyPlayer[],
}

export interface ITinyTeam {
    pk : number,
    code : number,
    avatar : string,
    name : string,
    since : number,
    plan : string,
}

export interface ITeam extends ITinyTeam {
    id : number,
    spvsr : ISpvsrUser,
    is_connected : boolean,
    is_connected_player_pk : number,
    is_connecting : boolean,
    is_connecting_player_pk : number,
    is_spvsr : boolean,
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
    is_connected : boolean
}

export interface IPlayer extends ITinyPlayer {
    id : number,
    games : ITinyGame[],
    tom_games : ITinyGame[],
    superplayers : ISuperplayer[],
    connected_user : IPlayerUser,
    connected_at : string,
    connecting_user : IPlayerUser,
    connecting_at : string
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
    goals : IGoalPlayer[]
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