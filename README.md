# bakery
A collection of decoupled serverless microservices modeled off a bakery using event driven architecture.

## Outline
The purpose of this project is to build a collection of services that are decoupled in nature but work together to create a system that replicates a real world bakery. To acheive this a couple extra systems will need to be built on the side to support this, such as a banking (transaction) service, a customer / user service, etc. While each service needs to be made in a way that they can run completely by themselves and be changed out / updated with little to no change to the services they talk too. The sum of the services should be greater than the parts. The focus of this project is the backend, using event driven tools to use as the communication method between services. Rest endpoints (and websocket) can be used for the communication layer between clients of the services. Serverless technology will be utilised as much as possible to build a system that can scale effortlessly, best case is it can scale from 0, allowing it to sit dormant when nobody is using it with zero cost. This project should be modeled as closely as possible to a real world bakery, but where possible, use the advantage of it running in code to make it better.

For this project I will be using a Turborepo to manage the multiple services. If I was building this for real, I would put each service in its own repo but as this is a small project I will use a monorepo to make development easier. Each service will be written in Typescript running on Node.js, they must be stateless to ensure ease of scalability. 

# Usage
The final frontend usage should be as simple as possible: given they have enough money in the bank -> they receive a menu of items -> they pick what the want and quantity -> they submit the order -> there bank account gets charged -> they recieve the items
How this goes on under the hood only needs to be as complicated as necessary to make sure the above process goes as smoothly as possible.

# Flows

## Products are made throughout the day
- Each product has an interval that they are produced at, for example every 30 minutes 5 loafs of bread are produced, but every 1 minute, 1 donut is produced
- Each product has its own uuid representing it, instead of having 24 x breads and 5 x donuts, the system has 29 products, some are type bread, some are type donut, etc
- After a set amount of time a product will go bad, eg bread can last all day but donuts get stale after 25 minutes
- 30 minutes before the end of the day every product goes on a discount, this is described by the product as to how much it goes on discount
- At the end of each day all the remaining products are thrown out
- Every 15 minutes or on some interval, all the stale products need to be removed from possible sale

## Buying some food
- Person submits an order for 1 x loaf of bread & 1 x donut
- The quantity of bread and donuts is checked, if the quantity of the requested goods is high enough it continues
    - by selecting the oldest stock that is still available, it is set to reserved, it can not be thrown out and can not be double sold
- A charge is placed on the person through the bank, requesting the amount of money needed for all the products
- On a confirmation event from the bank, the products are transferred to the user
- If the bank rejects the request, the products get un-reserved

# Services
- Menu
- Products
- Production
- Sales Person
- Point of Sales
- Bank
- Users
- Authentication

# Technology
- Typescript 
- Node.js
- Kafka
- Fastify

# Discussions

## Do we need a `Users` service

### Pros
- A users service provides a single point to get all the information about a specific user.
- This single point of truth can be trusted.
- It simplifies the system, its simple to find information about a user from any service.
- It creates a simple interface for people to get there user info in an App or Website.

### Cons
- Its a single point of failure, if the Users api goes down then anything that calls its endpoints will fail
- Requires duplication of information. If following event driven, both the main service that is effected by an event and the user service would need to store details about a user potentially.

For now I am going to create a Users service, but in an event driven way. That means that if any of the other services require some data on a user, it is there responsability to store that data. But the Users service will consume as many events as it can and store as much information on users as possible in a NoSQL database, without any kind of relations. On a page that displays user data, the can get the id from the Users service and then go to the service that is storing that data and get the details.