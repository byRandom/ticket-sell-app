// Definition of the types used in the application

// User interface
export interface User{
    id: number,
    email: string,
    username: string,
    password: string
    receive_promotions: boolean
}

// Types from the user interface
export type Credentials = Pick<User,  'email' | 'username' | 'password' | 'receive_promotions'>

export type Login = Pick<User, 'email' | 'password'>

// Token interface
export interface interfaceToken{
    id: number,
    email: string,
    username: string,
    expiresIn: number
}

// Event interface
export interface eventObject{
    name: string,
    date: string,
    location: string,
    description: string
}