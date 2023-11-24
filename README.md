# User Management

## Installation

```bash
git clone https://github.com/kiron0/l2b2a2.git
```

```bash
cd l2b2a2
```

```bash
yarn
```

```bash
yarn dev
```

## Set up environment variable

> Create a .env file root of the project, then add some variable like this:

```
   MONGO_URI=<YOUR_MONGODB_URL>
   PORT=<YOUR_PORT>
```

## Endpoints

> This is a simple users api that allows you to create, read, update, delete, add order, get total orders using the following endpoints:

> 1. Create user: POST

```
   /api/users
```

> Request Body:

```
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}

```

> 2. Get all users: GET

```
   /api/users
```

> 3. Get a single user: GET

```
   /api/users/:userId
```

> 4.  Update a user: PUT

```
   /api/users/:userId
```

> 5.  Delete users: PUT

```
   /api/users/:userId
```

> 6.  Create a order: PUT

```
   /api/users/:userId/orders
```

> Request Body:

```
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
```

> 7.  Get all orders: GET

```
   /api/users/:userId/orders
```

> 8.  Total Price of Orders: GET

```
   /api/users/:userId/orders/total-price
```

> The api is hosted on Heroku, to get the api [**`Click here`**](https://l2b2a2.kiron.dev)
