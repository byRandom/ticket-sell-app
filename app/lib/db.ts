import { neon } from "@neondatabase/serverless";
import process from "process";
import { Credentials, eventObject, ticketObject, User } from "./definitions";
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
    const data:any = await sql`SELECT * FROM users WHERE email = ${email}`;
    const typedData:User = {
        id: data.id,
        email: data.email,
        username: data.username,
        password: data.password,
        receive_promotions: data.receive_promotions
    }
    return typedData;
}
//function to check if the user is an admin
export async function checkAdmin(id: number){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM admins WHERE id = ${id}`;
    return data[0].admin;
}

//function to add an event
export async function addEvent(event: eventObject){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const response = await sql`INSERT INTO events (name, date, location, description, category, max_tickets, price, image, tickets_sold) VALUES (${event.name}, ${event.date}, ${event.location}, ${event.description}, ${event.category},${event.max_tickets}, ${event.price}, ${event.image}, ${event.tickets_sold} );`;
    return event;
}

//function to get the events
export async function getEvents(){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM events;`;
    return data;
}

//function to create a ticket

export async function addTicket(ticket: ticketObject){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const response = await sql`INSERT INTO tickets (event_id, user_id, uuid, enabled) VALUES (${ticket.event_id}, ${ticket.user_id}, ${ticket.uuid}, true);`;
    return ticket;
}

//function to get the tickets
export async function getTickets(){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM tickets;`;
    return data;
}

//function to get the tickets by user
export async function getTicketsByUser(id: number){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM tickets WHERE user_id = ${id};`;
    return data;
}

//function to get the tickets by event

export async function getTicketsByEvent(id: number){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM tickets WHERE event_id = ${id};`;
    return data;
}

//function to get ticket by uuid

export async function getTicketByUuid(uuid: string){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const data = await sql`SELECT * FROM tickets WHERE uuid = ${uuid};`;
    return data;
}


export async function disableTicket(uuid: Pick<ticketObject, 'uuid'>){
    let url = process.env.DATABASE_URL;
    const sql = url ? neon(url) : neon('');
    const response = await sql`UPDATE tickets SET enabled = false WHERE uuid = ${uuid};`;
    return uuid;
}