import { neon } from "@neondatabase/serverless";
import process from "process";
import { Credentials, eventObject, Login } from "./definitions";
export async function getData() {
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users;`;
    return data;
}
//function to create a user
export async function createUser(credentials:Credentials){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`INSERT INTO users (email, username, password, receive_promotions) VALUES (${credentials.email}, ${credentials.username}, ${credentials.password}, ${credentials.receive_promotions})`;
    return data;
}
//function to check if the user exists
export async function checkDuplicateEmail(email: string){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data.length;
}
//function to get the user data
export async function getUserData(email: string){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM users WHERE email = ${email}`;
    return data;
}
//function to check if the user is an admin
export async function checkAdmin(id: number){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM admins WHERE id = ${id}`;
    return data[0].admin;
}

export async function addEvent(event: eventObject){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const response = await sql`INSERT INTO events (name, date, location, description) VALUES (${event.name}, ${event.date}, ${event.location}, ${event.description});`;
    return event;
}

export async function getEvents(){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM events;`;
    return data;
}