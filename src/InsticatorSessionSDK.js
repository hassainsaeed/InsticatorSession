/**
 * InsticatorSessionSDK.js - A JavaScript SDK by Hassain Saeed.
 */


/*
 * Function that will be used by the webpage to get the session object on the current visitor
 * i. For a first time visitor, it will create and return a new user session object
 * ii. For a second(or more) time, extend the expiration of the session (cookie expiration date).
 * iii. For a visit more than 30 minutes after the previous visit, start a new session.
 // TODO: Ask if we should start a new session if after midnight as well
 * iv. For any visit on a different campaign, start a new session
*/
function getSession() {
  // First check if a session object exists or not for this user in the cookie
  // If it does not, then it is the first time visitor. Create and return a new user session object.
  // Else, this is a returning visitor. So read the session object from the browser cookie
  if (doesSessionObjectExistInCookie() === false) {
    return createNewSessionCookie();
  }
  const sessionObject = readSessionObjectFromCookie();


  // Now that we know session object exists (returning visitor),
  // We need to check if current campaign is different than what is in the session object. If so, generate new session
  if (sessionObject.campaign !== getCampaign()) {
    return createNewSessionCookie();
  }

  // Now that we know that the campaign has not changed for this session,
  // We need to check if the session is expired (i.e. 30 minutes since last activity, or after midnight).
  // ...If so, generate new session
  const currentTime = new Date();
  if (currentTime > new Date(sessionObject.expiration)) {
    return createNewSessionCookie();
  }

  // Verified that this session has met all the criteria to live, so extend the expiration of the session
  // Update the session object in the cookie to have the new expiration time, and return the updated session object
  sessionObject.expiration = generateNewExpirationTime();
  updateSessionObjectInCookie(sessionObject);

  return sessionObject;
}


/*
 * Function that checks if the session object for that user exists or not in the browser cookie
 * Output: Returns boolean True if session object exists, returns False if not
*/
function doesSessionObjectExistInCookie() {
  const documentCookie = document.cookie;
  const name = 'session=';

  // Use the indexOf() function to see if "session="" is in the document.cookie string
  // If indexOf() returns -1, then session object does not exist in browser cookie. Else, it does exist
  const checkCookie = documentCookie.indexOf(name);
  if (checkCookie === -1) {
    return false;
  }
  return true;
}

/*
  * Function that generates a brand new session object for the visiting user, and saves it into the browser cookie
  * Output: returns the session object (JSON object) after first saving it as a string in the browser cookie
  * The session object follows the following format - session = {
  *   "id" : "awd34!@a754" // 10 character string of random characters, to ID the sessionObject. String
  *   "expiration": "2019-01-17 23:42:23:134" // Time at which the session object will expire. In human readable format
  *   "referrer": "https://abc.com/whatever" // Referrer URL to the webpage. String
  *   "campaign": "summer_mailer"  // Campaign of the webpage, as indicated by Query String Parameter in URL. String
  * }
 */
function createNewSessionCookie() {
  const sessionObject = {};
  sessionObject.id = generateSessionID();
  sessionObject.expiration = generateNewExpirationTime();
  // TODO: Ask if referrer is the document.referrer
  sessionObject.referrer = document.referrer;
  sessionObject.campaign = getCampaign();

  document.cookie = `session=${JSON.stringify(sessionObject)}`;
  return sessionObject;
}


/*
 * Function that will generate the unique Session ID, which will be saved in the session object for the visiting user
 * Output: sessionID. A string with length 10 characters.
 * Session ID is generated by selecting 10 characters at random from a list of ASCII characters, and joining them
*/
function generateSessionID() {
  let sessionID = '';
  const lengthOfID = 10;
  const listOfCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  for (let i = 0; i < lengthOfID; i++) {
    sessionID += listOfCharacters.charAt(Math.floor(Math.random() * listOfCharacters.length));
  }
  return sessionID;
}

/*
  * Function that will get the campaign of the webpage that the user is visiting
  * The campaign is indicated by the "?campaign" query string parameter in the URL
  * If no Query String Parameter is found for "?campaign", then the string "no_campaign" will be used instead  ???
  * Output: campaign. A string indicating campaign of ther webpage.
 */
function getCampaign() {
  const queryStringParameters = new URLSearchParams(window.location.search);
  let campaign = queryStringParameters.get('campaign');

  // TODO: Ask how to handle the case of no campaign found in Query String Parameter
  if (campaign == null) {
    campaign = 'no_campaign';
  }

  return campaign;
}

/*
 * Function that determines what expiration time to set for the session object for the visiting user
 * Session will expire either at 30 minutes since last action, or at end of day
 * Output: Expiration time (time the session will expire). In JavaScript Date format
*/
function generateNewExpirationTime() {
  const currentTime = new Date();
  let expirationTime = new Date();

  // First check if we are less than 30 minutes til midnight (i.e. is it past 23:30:00?).
  // All sessions expire at end of day (23:59:59:9999)
  // If not 30 minutes or less til end of day, expiration is at 30 minutes after start time
  if ((currentTime.getHours() === 23) && (currentTime.getMinutes() >= 30)) {
    expirationTime.setHours(23, 59, 59, 999);
  } else {
    expirationTime = (currentTime.setMinutes(currentTime.getMinutes() + 30)).toString();
    expirationTime = new Date(parseInt(expirationTime));
  }

  return expirationTime;
}

/*
  // Function that reads the browser's cookie, and finds and returns the session object within the string
  // Output: The session object saved in the cookie. If session object not found, returns an empty object
  // Function was obtained from: https://www.quirksmode.org/js/cookies.html
 */

function readSessionObjectFromCookie() {
  const sessionObjectName = 'session=';
  const cookieArray = document.cookie.split(';');
  let sessionObject = {};
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(sessionObjectName) === 0) {
      sessionObject = JSON.parse(cookie.substring(sessionObjectName.length, cookie.length));
    }
  }
  return sessionObject;
}

/*
 // Updates the browsr's cookie with the new and updated session Object
 // Input: The updated Session object that needs to be saved in the cookie. JSON Object
*/
function updateSessionObjectInCookie(sessionObject) {
  document.cookie = `session=${JSON.stringify(sessionObject)}`;
}

// TODO: Get ESLint set up to lint the project
// TODO: Complete the README
// TODO: Get Unit tests set-up
