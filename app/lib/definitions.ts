export interface Credentials{
    email: string,
    user: string,
    password: string,
    receive_promotions: boolean
}

export interface User{
    id: number,
    email: string,
    username: string,
    password: string
    receive_promotions: boolean
}

export interface Login{
    email: string,
    password: string
}
export interface interfaceToken{
    id: number,
    email: string,
    username: string,
    expiresIn: number
}

export interface eventObject{
    name: string,
    date: string,
    location: string,
    description: string
}