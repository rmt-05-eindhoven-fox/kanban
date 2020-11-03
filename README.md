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
  "email": "aher@mail.com",
  "password": "asdasd"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "aher@mail.com"
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
  "email": "aher@mail.com",
  "password": "asdasd"
}
```

_Response (200 - OK)_
```
{
  "accesstoken": "<your access token>"
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
  "category": "backlog"
}
```

_Response (201 - Created)_
```
{
  "title": "Membuat server Kanban",
  "category": "backlog",
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
    "id": 1,
    "title": "Membuat server Kanban",
    "category": "backlog"
    "email": "aher@mail.com",
    "createdAt": "2020-03-20",
    "updatedAt": "2020-03-20T0",
  },
  {
    "id": 2,
    "title": "Membuat client Kanban",
    "category": "backlog"
    "email": "zaza@mail.com",
    "createdAt": "2020-03-20",
    "updatedAt": "2020-03-20",
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
  "category": "backlog"
  "email": "aher@mail.com",
  "createdAt": "2020-03-20",
  "updatedAt": "2020-03-20"
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
  "title": "Update login OAuth google",
  "category": "backlog"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Update login OAuth google",
  "category": "backlog",
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
_Response (401 - Not authorized!)_
```
{
  "errors": "Category is required!"
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
  "category": "backlog"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Mengupdate OAuth google",
  "category": "done",
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
  "errors": "Category is required!"
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
  "errors": "Category is required!"
}
```
_Response (401 - Not authorized!)_
```
{
  "errors": "Category is required!"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---