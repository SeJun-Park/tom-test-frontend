import { atom } from "recoil";

export const tomAvatarState = atom({
    key : "tomAvatar",
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbKxBAKmUbmXN4cIVobSubN22RxbFNVkRJ1t0NIzT5i7TDnEsjUfZwNdbdG17L6zRia0&usqp=CAU"
})

export const gameAvatarState = atom({
    key : "gameAvatar",
    default : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/640px-Soccerball.svg.png"
})

export const formationState = atom({
    key : "formation",
    default : ["4-2-3-1", "4-4-2", "3-5-2"]
})

export const paymentState = atom({
    key : "payment",
    default : [
        ["미기록", "non"],
        ["납부", "paid"],
        ["미납", "non_paid"],
        ["면제", "na"]
    ]
})

export const loginRequiredImageState = atom({
    key : "loginRequiredImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/8cf2d95c-9df7-4d8b-0811-10727e6f8300/public"
})