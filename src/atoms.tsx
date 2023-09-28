import { atom } from "recoil";

export const tomAvatarState = atom({
    key : "tomAvatar",
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnbKxBAKmUbmXN4cIVobSubN22RxbFNVkRJ1t0NIzT5i7TDnEsjUfZwNdbdG17L6zRia0&usqp=CAU"
})

export const gameAvatarState = atom({
    key : "gameAvatar",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/a703565c-e647-46fd-d0c0-5b7a2ea3d600/public"
})

export const gameTomsShareImageState = atom({
    key : "gameTomsShareImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/aa7939f9-ee2f-4f14-f5ba-61ed7f88da00/public"
})

export const gameQuotasShareImageState = atom({
    key : "gameQuotasShareImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/18c9136f-6390-46b0-b2f5-aadb868c2f00/public"
})

export const teamScheduleShareImageState = atom({
    key : "teamScheduleShareImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/a10c1b78-899c-4110-e600-420bcc7e1200/public"
})

export const duesDetailsDetailShareImageState = atom({
    key : "duesDetailsDetailShareImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/d045e373-754f-48d1-0adc-c19128547600/public"
})

export const duesPaymentDetailShareImageState = atom({
    key : "duesPaymentDetailShareImage",
    default : "https://imagedelivery.net/SbAhiipQhJYzfniSqnZDWw/03609efa-45e6-40a0-44bf-6c8e0e6b7a00/public"
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