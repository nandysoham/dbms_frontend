# Ecommerce Application 
### Part of DBMS Project

#### Soham Nandy CS20B046


Tech Stack Used
#### Databases
1. Mongoose as NoSql Database
2. Sqlite as Sql database


#### Backend
1. Nodejs
2. Expressjs


#### Frontend
1. Reactjs
2. MDBootstrap


#### Cloud for asset management
1. Cloudinary https://cloudinary.com/

Steps for Execution:
Requirements

1. Create a .env file in the frontend root directory
2. The following  should be the format

File .env in frontend root
```
REACT_APP_BACKENDURL=http://localhost:8000
REACT_APP_FRONTENDURL=http://localhost:3000       
REACT_APP_CLOUDINARY_URL=                       <- get the public url of your acount from cloudinary account settings
REACT_APP_SIGNTOKEN=                             <-   create a random signtoken to ensure the authentication from client
``` 

3. Follow the scripts
```
> cd frontend
> npm i
> npm start
```

4. create a .env file in the backend rooot directory  at https://github.com/nandysoham/dbms_backend

5. File .env at backend root folder
```
PORT=8000
MONGOURI=
BACKENDURL=http://localhost:8000
FRONTENDURL=http://localhost:3000
JWT_SECRET=                                   <-- any token | required in authentical via brcypt
SIGNTOKEN=                                    <-- same as REACT_APP_SIGNTOKEN in frontend .env | should be exactly same

CLOUDINARY_CLOUD_NAME=                        <-- get from cloudinary your account essentials
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

6. Follow the script
```
> cd frontend
> npm i
> npm start
```


### Coolest Features of the website

#### User Sign up

![image](https://user-images.githubusercontent.com/67374926/234299513-40bc39cd-c061-4550-9046-1963210afa7e.png)

#### User Dashboard after Login
Ofcourse it is empty as it's a new user
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234299713-ec9d38b0-1b24-40aa-9c00-0a0378999909.png">
The authentication is backed by jwt and Bcrypt
Passwords are never stored in plain text in database, instaed they are hahed and the hashes are stored
whenever a user logs in a jwt token is created ad is stored in localStorage throught the time the user is logged in

#### Userdata as stored in Database
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234300708-0676b871-6ee9-4eae-8bb5-4ffc5ecb01ae.png">
Notice the passwords are always stored in hashes and the profile picture is stored in cloud
you can directly access the pic from cloudinary

#### Seller Creation and login (Same as user)
Attaching a screenshot of seller login
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234301286-c23a905e-aef8-48b9-bdc0-5b42eff0fc4b.png">


#### Seller adding new Product
![image](https://user-images.githubusercontent.com/67374926/234299334-722d64b0-bf99-43da-b2ae-7e1d964c5a28.png)

Lets go on adding a few more products
### the final screen
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234304030-a668295a-201f-4921-a213-068c83ea494a.png">

