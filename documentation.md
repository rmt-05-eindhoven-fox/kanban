# Kanban Documentation 

## User Register

* ### URL

```
http://localhost:3000/register
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@mail.com",
    "password": "johndoe"
}
```

* ### Success Response:

`Status: 201`
```json
{
    "id": 1,
    "email": "johndoe@mail.com"
}
```
* ### Error Response:

`Status: 400`
```
{
    "msg": "First name is required, Second name is required, Email is required, Password is required"
}

{
    "msg": "Please fill email with correct format (yourmail@mail.com)"
}

{
    "msg": "First name cannot contain space, Second name cannot contain space"
}

{
    "msg": "Password should be minimum 6 characters"
}

{
    "msg": "Email has already been taken"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## User Login

* ### URL

```http
http://localhost:3000/login
```

* ### Method:

    `POST`

* ### URL Params

    `None`

* ### Data Params

 ```json
{
    "email": "user@gmail.com",
    "password": "user"
}
```

* ### Success Response:

`Status: 200`
```json
{
    "username": "demo_account",
    "email": "demo12345@mail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJkZW1vX2FjY291bnQiLCJlbWFpbCI6ImRlbW8xMjM0NUBtYWlsLmNvbSIsImlhdCI6MTYwNDQyNjg1M30.XsRs96v6U3AVtmxjvcpJmweHashASK7xziB4Yo_Rh8s"
}
```
* ### Error Response:

`Status: 401`
```json
{
    "msg": "Wrong email or password"
}
```

`Status: 500`
```json
{
    "msg": "Internal server error"
}
```

----------------------------------------------
<br>
<br>