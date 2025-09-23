import dotenv from 'dotenv';
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

'use strict';

import { google } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const redirect_uris = ["https://meet-chi-five.vercel.app/"];

const calendar = google.calendar("v3");
// eslint-disable-next-line no-undef
const { CLIENT_ID, CLIENT_SECRET, CALENDAR_ID} = process.env;

const oAuth2Client = new google.auth.OAuth2(
 CLIENT_ID,
 CLIENT_SECRET,
 redirect_uris[0]
);

export async function getAuthURL() {
 const authUrl = oAuth2Client.generateAuthUrl({
   access_type: "offline",
   scope: SCOPES,
 });


 return {
   statusCode: 200,
   headers: {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true,
   },
   body: JSON.stringify({
     authUrl,
   }),
 };
}

export async function getAccessToken(event) {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
}

export async function getCalendarEvents(event) {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then ((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch ((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  });
}