### Starts the btc app

### Setup
Requires a postgres.env file that contains:

POSTGRES_PASSWORD=set_password_here  
POSTGRES_USER=set_username_here  
POSTGRES_DB=set_db_here  

btc-backend requires /src/config/secrets.js which contains:

```module.exports = {
  POSTGRES_PASSWORD: <password_here>
};
```

### Run
Clone both btc-backend and btc-frontend  
In this repository, run: `docker-compose up --build`
