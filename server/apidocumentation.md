# Kanban
Kanban is an application to manage your assets. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register
>Register new user

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (201 - Created)_
```
{
    "id": 11,
    "email": <string>,
    "msg": "Register success"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Invalid email format",
        "Email is required",
        "Password is required"
    ]
}

```
---
### POST /login
>Login into registered account

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (200 - OK)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "Invalid email or password"
    ]
}

```
---

### POST /tasks
>Create task after login

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Request Body_
```
{
    "title": <string>,
    "description": <string>,
    "category": <string>
}
```
_Response (200 - OK)_
```
{
    "dataTask": {
        "id": <auto increment>,
        "title": <string>,
        "description": <string>,
        "category": <string>,
        "UserId": <by logged in UserId>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Title is required",
        "Description is required",
        "Category is required"
    ]
}
```
---
### GET /tasks
>Get all task that created by all user

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "dataTask": {
        "id": <auto increment>,
        "title": <string>,
        "description": <string>,
        "category": <string>,
        "UserId": <by logged in UserId>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z"
    }
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
---
### GET /tasks/:id
>Get task by id that created by all user

_Request Params_
```
req.params.id 
```

_Request Headers_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "title": <string>,
    "description": <string>,
    "category": <string>
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
---
### PUT /tasks
>Update task only by user with the same UserId

_Request Params_
```
req.params.id || http://localhost:3000/tasks/:id
```

_Request Headers_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Request Body_
```
{
    "title": <string>,
    "description": <string>,
    "category": <string>
}
```
_Response (201 - Created)_
```
{
    "dataTask": [
        1
    ],
    "msg": "Success update task"
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - Internal server error)_
```
{
    "errors": [
        "Task not found"
    ]
}
```
---

### DELETE /tasks
>Delete task only by user with the same UserId

_Request Params_
```
req.params.id || http://localhost:3000/tasks/:id
```

_Request Headers_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFuQGdtYWlsLmNvbSIsImlhdCI6MTYwNDQxMDc1MH0.VgDifLpE55AYZLb2tmLYeTwX34B0uLMz0wQEU91hfB8"
}
```

_Request Body_
```
Not needed
```
_Response (200 - Ok)_
```
{
    "msg": "Task deleted"
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - Internal server error)_
```
{
    "errors": [
        "Task not found"
    ]
}
```
---

