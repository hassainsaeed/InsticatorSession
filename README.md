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
    }
</script>
```
### Example Test Webpage

In this repository is an example test webpage that demonstrates the InsticatorSession SDK working according to specifications, and allows you to test the SDK. To get the example test webpage set up and running, you have to build it yourself by cloning this repository and running

```
$ npm install
$ npm start
```
Then open up your browser of choice and go to the URL of `http://localhost:8000/examples/Session_Test_Page.html` in order to see the example test webpage, and in order to test the SDK yourself

## Security Concerns, Notes and Assumptions

### Security Concerns
The InsticatorSession object saved in the cookie is unrestricted and non-encrypted. Meaning that pretty much anyone can access, and read, and update this object if they were on the webpage as well and had access to the user's browser. This could lead to a unauthorized source reading from our session object to track user activity and campaign information for a current user's session, or a malicious source intentionally altering the session object for any purpose.

These concerns can be mitigated by encrypting the keys and values inside of the session object so it cannot be as easily read or manipulated, and also storing the cookie at a different domain or subdomain so that most browsers will restrict unauthorized access to the cookie via the 'same-origin policy'

### Notes and Assumptions

- The session object is a transient cookie (aka a session cookie), meaning that it is not persistent and it will disappear when the user closes the browser  
- This SDK will not serve for users on for browsers of IE 10 and below, because they do not take the ES5 naming convention of defining variables with `const` and `let`. This SDK will throw a syntax error on these browsers and stop working.
- The time used to determine when the session object will expire is based on Javascript's `Date()` Object, which reads the date and time from the user's browser (and the browser usually gets the date and time from the user's OS). The date and time is not read from an external verifiable source over the Internet, so users can update their date and time in their computer's OS to manipulate and force the expiration of the session object.

## How to Test this SDK

The functional testing of this SDK can be completed through the example test webpage located in this repository (read above in this README document for information on how to set-up and run the example test webpage using npm). Here are some of functional test cases you can perform on the example test webpage in order to test the functionality and features of the SDK:
1) With no session object previously stored in your browser's cookies (i.e. first time visitor), verify that going to the webpage for the first time  `getSession()` is called and the SDK generates a brand new session object and stores it into the browser's cookies
2) After just a few minutes of inactivity and before 11:30pm, verify that calling `getSession()` from the SDK will update the existing session object by extending the expiration time to 30 minutes after the current time.
3) After just a few minutes of inactivity and after 11:30pm but before midnight, verify that calling `getSession()` from the SDK will update the existing session object by extending the expiration time to 11:59:59.999 PM (i.e. end of day).
4) After 30 minutes of inactivity, verify that calling `getSession()` from the SDK will generate a brand new session object with a new session ID, and replace the old session object in the browser's cookies with it.
5) After a few minutes of inactivity and after midnight (i.e. the start of the new day),  verify that calling `getSession()` from the SDK will generate a brand new session object with a new session ID, and replace the old session object in the browser's cookies with it.
6) Reloading the webpage with a new campaign query string parameter, verify that calling `getSession()` from the SDK will generate a brand new session object with a new session ID, and replace the old session object in the browser's cookies with it.

On top of the functional testing, some other testing that could be implemented is Unit Testing on all of the available functions in the InsticatorSession SDK (not just `getSession()`) so that all units in the SDK can be individually tested and there can be more confidence whenever changing or maintaining the code
