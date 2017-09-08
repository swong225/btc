### Starts the btc app

### Setup
Requires a postgres.env file that contains:

POSTGRES_PASSWORD=set_password_here  
POSTGRES_USER=set_username_here  
POSTGRES_DB=set_db_here  

### Run
Clone both the btc-backend and btc-frontend submodules  
In this repository, run: `docker-compose up --build`

### Desired features:

1. Links (Menu/Prices, Our Story, Contact Us/Location/Hours, Order Online)
2. Order Online Button will be a modal that pops up
3. Your Orders will be tracked via redux state
4. A login feature that tracks past orders, current orders, loyalty status
