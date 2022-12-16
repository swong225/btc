### Starts the btc App

### Setup
git clone this repository  
Ensure ./postgres.env values match btc-backend/src/config/index.js  

### Run
In btc-backend and btc-frontend do a `npm install`  
In this repository, run: `docker-compose up --build`  

### Access
Hit the UI at: http://localhost:3000/  
Inspect the DB with adminer at: http://localhost:8080/  
Adminer login credentials should match btc/btc-backend/src/config/index.js
