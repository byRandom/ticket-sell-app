import { Credentials } from "@/app/lib/definitions";

export async function POST(req:Request){

    const data: Credentials = await req.json();
    


    console.log(data)

   return Response.json({message:"credentials"} , {status:200})
}