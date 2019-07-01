# InsticatorSession
JavaScript SDK that will that will generate, extend, and/or expire a user session object and store it in the browsers cookie, in order to track browser side session for a user

The Session object should be in the format list below:
session {
 "id": "awd34!@a754",
 "expiration": "2019-01-17 23:42:23:134",
 "referrer": "https://abc.com/whatever",
 "campaign": “summer_mailer”
}


There will be a function called getSession()​ in the SDK that can be used to get the
session object on the current visitor:
i. For first time visit, create a new session.
ii. For a second(or more) time, extend the expiration of the session(cookie
expiration date).
iii. For a visit more than 30 minutes after the previous visit, start a new session.
iv. For any visit on a different campaign, start a new session
