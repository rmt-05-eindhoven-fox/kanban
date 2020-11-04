# Kanban Documentation

Kanban is an application to manage your task with friend. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response


## RESTful endpoints
### POST /login

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401)_
```
{
  "error": "Wrong Email/Password"
}
```

_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
---
### POST /register

> Create new user

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```
_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
_Response (400)_
```
{
  "error": "Password is required!, Password must be more than 6 character"
}
```
_Response (400)_
```
{
  "error": "Email is required!, Email must be a format sample@mail.com"
}
```
---
### POST /loginGoogle

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
    "token_id": "<token id from google>"
}
```

_Response (200)_
```
{
    "id": "<user id>",
    "email": "<user email>"
    "access_token": "<generated accesss token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```
---
### GET /tasks

> Get all tasks

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": "<tasks id>",
    "title": "<tasks title>",
    "category": "<tasks category>",
    "UserId": "<id User>"
}
```
_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
---
### POST /tasks

> Create new tasks

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "category": "<posted description>",
  "UserId": "<posted status>",
}
```
_Response (400 - Bad Request)_
```
{
  "error": "Title is required!, Category is required!"
}
```
_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
---
### PUT /tasks/:id

> Update tasks with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "id": "<tasks id>",
  "title": "<tasks previous title>",
  "category": "<tasks previous category>"
}
```
_Response (200)_
```
{
  "id": <tasks id>,
  "title": "<tasks updated title>",
  "category": "<tasks updated category>",
  "UserId": "<User Id>"
}
```
_Response (400 - Bad Request)_
```
{
  "error": "Title is required!, Category is required!"
}
```
_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "error": "Error not found!"
}
```
---
### DELETE /todos/:id

> Delete todos with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Todo's ID
```
_Response (200)_
```
{
  "Task Deleted Successfully"
}
```
_Response (500 - Bad Request)_
```
{
  "error": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "error": "Error not found!"
}
```
---