# Kanban Server
Kanban App is an application for an organization or community to create Projects and manage tasks in your project. This app has : 
* Error case response
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Errors

| Code  | Name                  | Message                                            |
| ----- | --------------------- | -------------------------------------------------- |
| 400   | Bad Request           | < Validation error > or Invalid Email or Password  |
| 401   | Unauthorized          | Authentication Failed                              |
| 403   | Forbidden             | Not Authorized                                     |
| 404   | Not Found             | Error not found                                    |
| 500   | Internal Server Error | Internal server error                              |

_Response_
```
{
  "error": "error message here"
}
```

## RESTful endpoints
### POST /register

> Create new user

_Request Headers_
```
not needed
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  "name": "John Doe"
  "email": "sample@mail.com",
  "password": "asdfgh"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "sample@mail.com"
}
```
### POST /login

> Create access token based on user login data

_Request Headers_
```
not needed
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  "email": "sample@mail.com",
  "password": "asdfgh"
}
```

_Response (200 - OK)_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU",
  "name": "John Doe"
}
```
### GET /users

> Get all users except logged user

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 2,
    "name": "Jane Doe"
    "email": "a@mail.com",
  },
  {
    "id": 3,
    "name": "Jontor Doe"
    "email": "b@mail.com",
  },
  { ... },
  { ... }
]
```
---
### GET /projects

> Get all user specified projects

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 -OK)_
```
[
  {
    "id": 1,
    "name": "Bikin Kanban",
    "createdAt": "2020-11-03T11:13:48.975Z",
    "updatedAt": "2020-11-03T11:13:48.975Z",
    "UserProject": {
        "UserId": 3,
        "ProjectId": 1,
        "createdAt": "2020-11-03T11:21:10.007Z",
        "updatedAt": "2020-11-03T11:21:10.007Z"
    }
  },
  {
    "id": 2,
    "name": "Bikin Fancy Todo",
    "createdAt": "2020-11-04T11:13:48.975Z",
    "updatedAt": "2020-11-04T11:13:48.975Z",
    "UserProject": {
        "UserId": 3,
        "ProjectId": 2,
        "createdAt": "2020-11-04T11:21:10.007Z",
        "updatedAt": "2020-11-04T11:21:10.007Z"
    }
  },
  { ... },
  { ... }
]
```

### POST /projects

> Create new project

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  projectName: "Bikin Kanban"
}
```

_Response (200)_
```
{
  "id": 1,
  "name": "Bikin Kanban"
}
```
### POST /projects/:projectId

> Add other user to logged user's project

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  userId: 2
}
```

_Response (201 - Created)_
```
{
  "id": 2,
  "name": "Jane Doe"
  "email": "a@mail.com",
}
```

### GET /tasks/:projectId

> Get all tasks and task owner in specified project

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "Create client",
    "category": "coding",
    "description": "using jquery",
    "ProjectId": 1,
    "UserId": 1,
    "createdAt": "2020-11-03T11:30:58.589Z",
    "updatedAt": "2020-11-03T11:30:58.589Z",
    "User": {
        "id": 1,
        "name": "John Doe",
        "email": "a@mail.com",
    }
  },
  {
    "id": 2,
    "title": "Create server",
    "category": "coding",
    "description": "using sequelize, pg and express",
    "ProjectId": 1,
    "UserId": 1,
    "createdAt": "2020-11-04T11:30:58.589Z",
    "updatedAt": "2020-11-04T11:30:58.589Z",
    "User": {
        "id": 1,
        "name": "John Doe",
        "email": "a@mail.com",
    }
  },
  {
    "id": 3,
    "title": "Deploy server",
    "category": "coding",
    "description": "using heroku",
    "ProjectId": 1,
    "UserId": 2,
    "createdAt": "2020-11-05T11:30:58.589Z",
    "updatedAt": "2020-11-05T11:30:58.589Z",
    "User": {
        "id": 2,
        "name": "Jane Doe",
        "email": "b@mail.com",
    }
  },
  { ... },  
  { ... }
]
```

### POST /tasks/:projectId

> Create new task based on unique project id

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  "title": "Create client",
  "category": "coding",
  "description": "using jquery",
}
```

_Response (200 - OK)_
```
{
  "title": "Create client",
  "category": "coding",
  "description": "using jquery",
  "ProjectId": 1,
  "UserId": 1
}
```



### PUT /tasks/:projectId/:taskId

> Update title, category, description based on unique task id which is included in unique project id. Authorized only for user who created it. 

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  "title": "Bikin Server",
  "category": "coding",
  "description": "using sequelize, express"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Bikin Server",
  "category": "coding",
  "description": "using sequelize, express"
}
```

### PATCH /tasks/:projectId/:taskId

> Update category based on unique task id which is included in unique project id. Authorized only for user who created it. 

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
{
  "category": "hehehe",
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Bikin Server",
  "category": "hehehe",
  "description": "using sequelize, express"
}
```

### DELETE /tasks/:projectId/:taskId

> Delete task based on unique task id which is included in unique project id. Authorized only for user who created it. 

_Request Headers_
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Task success to delete"
}
```

### POST /login/google

_Request Headers_
```
{
  "google_access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlCEW22FTU"
}
```

_Parameters_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "accessToken": "eyajsdiwjUHdiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYW1wbGVAbWFpbC5jb20iLCJpYXQiOjE2MDM3NzMyNjR9.Gfzf2lF0FRKHaEc9DrE4CrwJp_avuWbdrnlqwdiuqhw",
  "name": "John Doe"
}
```
OR

```
{
  "message": "createPassword",
  "email": "sample@mail.com",
  "name": "John Doe",  
}
```