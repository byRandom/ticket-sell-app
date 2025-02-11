export async function POST(req:Request) {
    let data = await req.json();
    console.log(data);
    return Response.json({ message: "User created" }, { status: 200 });
}