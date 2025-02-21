// Definition of the types used in the application

// User interface
export interface User{
    id: number,
    email: string,
    username: string,
    password: string,
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
    description: string,
    max_tickets: number,
    price: number,
    image: string,
    category: string,
    tickets_sold: number
}

export interface ticketObject{
    event_id: number,
    user_id: number,
    uuid: string,
    enabled: boolean
}


export interface customerRelation{
    user_id:number,
    stripe_id: string
}

export interface customer{
    name: string,
    email: string,
    address: {
        line1: string,
        city: string,
        state: string,
        postal_code: string,
        country: string
    },
    prefered_locales: string[]
}