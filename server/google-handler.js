const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const CalEvent = require('./models/CalEvent');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');


const SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    
    await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }

    return renewAuth();
}

async function renewAuth() {
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
        await saveCredentials(client);
    }

    return await client;
}

async function getListAndCheckIfTokenExpired(auth, retries) {
    var result;
    try {
        const calendar = google.calendar({ version: 'v3', auth });

        result = await calendar.events.list({
            calendarId: CALENDAR_ID,
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
    } catch (err) {
        if (retries > 0) {
            console.log("Error:" + err);
            await fs.rm(TOKEN_PATH);
            auth = await renewAuth();
            return await getListAndCheckIfTokenExpired(auth, --retries);
        } else 
            throw new Error("Failed to properly retrieve events list after all retries.");
    }

    return result;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
    const res = await getListAndCheckIfTokenExpired(auth, 2);

    const events = res.data.items;
    if (!events || events.length === 0) {
        console.log('No upcoming events found.');
        return;
    }

    console.log('Upcoming 10 events:');
    let results = JSON.stringify(events.map((event, i) => {
        let startDate = new Date(event.start.dateTime || event.start.date);
        console.log(startDate.toTimeString());
        startDate = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear() + "-" + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();

        let eventID = event.summary.replaceAll(" ", "") + "-" + startDate;

        return new CalEvent(eventID, new Date(event.start.dateTime || event.start.date), event.summary);
    }));

    return results;
}

function getEvents() {
    return authorize().then(listEvents).catch(console.error);
}

module.exports.getEvents = getEvents;