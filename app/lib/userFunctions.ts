import { getUserData } from "./db"
import { Credentials, Login, User } from "./definitions"
import bcrypt from 'bcryptjs';

export const checkCredentials = (user:Login ) => {
    if(!user.email || !user.password){
        return Response.json({message:"Missing credentials"}, {status:400})
    }
    
    if(user.email.length < 6 || user.password.length < 6){
        return Response.json({message:"Invalid credentials"}, {status:400})
    }

    if(user.email.length > 255 || user.password.length > 255){
        return Response.json({message:"Invalid credentials"}, {status:400})
    }
}

export const checkUserExists = async (user:Exclude<User, "id">) => {
    if(user["email"].length === 0){
        return Response.json({message:"Invalid credentials"}, {status:401})
    }
}

export const checkPassword = async (user:Exclude<User, "id">, userDB:User ) => {
    const match = await bcrypt.compare(user.password, userDB.password);
    if(!match){
        return Response.json({message:"Invalid credentials"}, {status:401})
    }
}