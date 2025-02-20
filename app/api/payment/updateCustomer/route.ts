import { checkToken } from "@/app/lib/token";


export async function PATCH(req:Request){
    //Check if user is logged in
    const dataResponse = await checkToken();
    if(!dataResponse){
        return Response.json({message:"Invalid token"}, {status:401});
    }

    //Check if user id is related to the payment customer id
    
}