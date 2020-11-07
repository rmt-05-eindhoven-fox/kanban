# Kanban
Kanban App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "email": "odading@mail.com",
  "password": "asdasd",
  "first_name": "Mang",
  "last_name": "Oleh"
}
```

_Response (201 - Created)_
```
{
  "email": "odading@mail.com",
  "first_name": "Mang",
  "last_name": "Oleh"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "Email is required!, Password min. 6 characters!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### POST /login

> Login user

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "email": "odading@mail.com",
  "password": "asdasd"
}
```

_Response (200 - OK)_
```
{
  "accesstoken": "<your access token>",
  "first_name": "Mang",
  "last_name": "Oleh"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "Email is required!, Password min. 6 characters!"
}
```
_Response (401 - Unauthorized)_
```
{
  "errors": "Wrong password/email!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
///////////
### POST /loginGoogle

> Login user with google OAuth

_Request Header_
```
<not needed>
```

_Request Body_
```
{
  "access_token": <"your_google_token">
}
```

_Response (200 - OK)_
```
{
  "accesstoken": "<your access token>",
  "first_name": "Mang",
  "last_name": "Oleh"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### POST /tasks

> Create new task

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Membuat server Kanban",
  "category": "Backlog"
}
```

_Response (201 - Created)_
```
{
  "title": "Membuat server Kanban",
  "category": "Backlog",
  "userId": 1,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "Title is required!, Category is required!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### GET /tasks

> Get all tasks

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
[
  {
    "id": 3,
    "title": "Membuat server Kanban",
    "category": "Done"
    "email": "ceer7@mail.com",
    "UserId": 1,
    "updatedAt": "11/4/2020, 21:15:27"
  },
  {
    "id": 4,
    "title": "Membuat client Kanban",
    "category": "Backlog"
    "email": "zaza@mail.com",
    "UserId": 2,
    "updatedAt": "11/6/2020, 11:13:02"
  }
]
```
_Response (400 - Bad request)_
```
{
  "errors": "Title is required!, Category is required!"
}
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### GET /tasks/:id

> Get task by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
<not needed>
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Membuat server Kanban",
  "category": "Backlog"
  "email": "aher@mail.com",
  "createdAt": "10/6/2020, 09:53:32",
  "updatedAt": "11/6/2020, 11:13:02"
}
```
_Response (401 - Not authorized!)_
```
{
  "errors": "Not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "errors": "task not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### PUT /tasks/:id

> Update task

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
{
  "title": "Membuat layout client",
  "category": "Done"
}
```

_Response (200 - OK)_
```
{
  "id": 5,
  "title": "Membuat layout client",
  "category": "Done"
  "email": "007@mail.com",
  "createdAt": "10/6/2020, 09:53:32",
  "updatedAt": "11/6/2020, 11:13:02"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "Title is required!, Category is required!"
}
```
_Response (401 - Not authorized!)_
```
{
  "errors": "Not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "errors": "task not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### PATCH /tasks/:id

> Update task's category

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
{
  "category": "Backlog"
}
```

_Response (200 - OK)_
```
{
  "id": 9,
  "title": "Mengupdate OAuth google",
  "category": "Backlog",
  "userId": 1,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "Category is required!"
}
```
_Response (401 - Not authorized!)_
```
{
  "errors": "Not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "errors": "task not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### DELETE /tasks/:id

> Delete task by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```
_Request Params_
```
{
  "id": <number>
}
```
_Request Body_
```
{
  "category": "backlog"
}
```

_Response (201 - Created)_
```
{
  "msg" : "deleted successfully"
}
```
_Response (400 - Bad request)_
```
{
  "errors": "task ID is not valid!"
}
```
_Response (401 - Not authorized!)_
```
{
  "errors": "Not authorized!"
}
```
_Response (404 - Not Found!)_
```
{
  "errors": "task not found!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---