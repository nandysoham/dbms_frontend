# Ecommerce Application 
### Part of DBMS Project

#### Soham Nandy CS20B046

DB diagram: https://dbdiagram.io/d/643a2e876b31947051a22c7c



### Tech Stack Used
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
![image](https://user-images.githubusercontent.com/67374926/234345132-6de9b3b1-bc5e-426e-b887-367d2a4a2074.png)


Attaching a screenshot of seller login
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234301286-c23a905e-aef8-48b9-bdc0-5b42eff0fc4b.png">


#### Seller adding new Product
![image](https://user-images.githubusercontent.com/67374926/234299334-722d64b0-bf99-43da-b2ae-7e1d964c5a28.png)

Lets go on adding a few more products
### the final screen
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234304030-a668295a-201f-4921-a213-068c83ea494a.png">

#### User acn search the with some keywords
Here for xample iphone
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234305453-f671b360-04a3-47f1-8ddf-78c1baaeb5d1.png">

#### Each product also has its individual page
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234305804-947ae70d-b404-4b5f-b9dd-81363a33facd.png">

#### User adding some products to his cart
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234306107-7526622e-6a17-454e-98f5-775236d489a0.png">

#### And proceeds to Payment
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234306283-6e935c43-f0c6-4809-8ba4-e5b0c323001c.png">

#### And here comes The payment portal
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234308098-aea34f27-ab22-4bad-aab8-cfc830edf842.png">


#### Now here comes a js script to create a dummy bank as a normal portal ransaction is rather invisible 
I capture the credit card no and the credit cvv to feed in the payment portal
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234306892-4f6f98f9-8383-4058-9248-bf56cdb9ab90.png">

#### Now the user can search for orders here in hs dashboard
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234308466-355fd2f6-34aa-400d-942b-0802da233e04.png">

#### User see the delivery status of the product
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234309656-2a4c4ae1-b9f3-4291-97c8-8daf1dd3d0c4.png">

#### And the user can apply for a return too
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234309906-34a99557-68dc-4d92-8f5a-9418fa3d2783.png">

#### But the request needs to be confirmed by the seller inorder to confirm it
Here is a snap of the seller doing it
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234310300-00eb5232-de51-4af0-bb81-78026ca2fd23.png">


#### Once return is done, Payment gets initiated and and is showcased in the user's orders list
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234311022-22de2bcb-c12d-4c15-b891-e037488088a7.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/67374926/234311136-8d879703-c7b1-4311-8e44-21e910f7d49e.png">

#### A peek at the seller's Dashbaord
![image](https://user-images.githubusercontent.com/67374926/234330439-b31f1357-c753-4fac-a2af-f9611627d6b1.png)

#### Seller Registering for an advertisement
![image](https://user-images.githubusercontent.com/67374926/234330778-c5cafe04-7957-49bb-8a7a-585a19e8415f.png)


#### All images and file assets are stored on cloud 
A snanpshot of cloud space
![image](https://user-images.githubusercontent.com/67374926/234357638-0d80e941-96cd-4098-a8df-93fedf9efe6f.png)





