# Authentication Carcass application module

- Passport local strategy + memoray storage + password memory encryption 

## application/auth.js

- passport initialization (serializeUser/deserializeUser/LocalStrategy)
- Express session setting / cookieParser...

- Routes :
	- GET / : return success
	- POST /register : register password with username + password
	- POST /login : send username/password = login user + encrypt password (salt + hash)
	- GET /logout : logout
	- GET /whoami : get current user object
