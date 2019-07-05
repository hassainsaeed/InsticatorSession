# InsticatorSession

## About

InsticatorSession is a JavaScript SDK that can generate, extend, and/or expire a user session object and store it in the browser's cookie, in order to track a browser side session for a user

The session object has the format list below:
```
session {
 "id": "awd34!@a754",
 "expiration": "2019-01-17 23:42:23:134",
 "referrer": "https://abc.com/whatever",
 "campaign": “summer_mailer”
}
```

There is a public function in the SDK called `getSession()`​  that can be used to get the session object on the current visitor. This function will work in the following manner:
i. For first time visit, create a new session.
ii. For a second(or more) time, extend the expiration of the session(cookie
expiration date).
iii. For a visit more than 30 minutes after the previous visit, or after end of day, start a new session.
iv. For any visit on a different campaign, start a new session

## Usage

### Installation

This SDK is intended to be used in a browser

To run the SDK in the browser, load the following script tag on your webpage which will load the InsticatorSession SDK from the CDN:
```
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/hassainsaeed/InsticatorSession@latest/src/InsticatorSession.js"></script>
```
Then the `getSession()` function will be available to you in order to generate and extend a session object in the browser's cookie which track the user's browser side session

```
<script>
		document.getElementById("getSessionButton").onclick = function() {
		window.sessionObject = getSession()
</script>
```
### Example Test Webpage

In this repository is an example test webpage that demonstrates the InsticatorSession SDK working according to specifications, and allows you to test the SDK. To get the example test webpage set up and running, you have to build it yourself by cloning this repository and running

```
$ npm install
$ npm start
```
Then open up your browser of choice and go to the URL of `http://localhost:8000/examples/Session_Test_Page.html` in order to see the example test webpage, and in order to test the SDK yourself

## Security Concerns, Notes, and Assumptions

### Security Concerns

### Notes

### Assumptions

## How to Test this SDK
