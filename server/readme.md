# Kanban API Documentation

```
Kanban Application uses Client-server model with specifications as follow:
- API Documentation that includes : URLs, HTTP method, request, response (success dan error case)
- RESTful endpoints for CRUD operations
- JSON formatted response
Deploy Server : https://kanban-dewi.herokuapp.com
Deploy Client : https://kanban-dewi-92e8a.web.app
Postman Documentation: https://documenter.getpostman.com/view/5729395/TVYQ3uk4
```

## Users Endpoints

### POST /users/login
> User login
---

> #### Request Header :

```
no need
```

> #### Request Body :

```
{
    "email": "<inserted email>",
    "password": "<inserted password>"
}
```

> #### Response

```
200 : {
    "access_token" : "<your jwt token>"
}
```

### POST /users/register
> Create a new user
---

Register a new account

> #### Request Header :

```
no need
```

> #### Request Body :

```
{
    "name": "<inserted password>",
    "email": "<inserted email>",
    "password": "<inserted password>"
}
```

> #### Response

```
200 : {
    "access_token" : "<your jwt token>"
}
```
## Projects Endpoints

### POST /projects
> Create a new project
---


> #### Request Header :

```
{
    "access_token": "<access token>"
}
```

> #### Request Body :

```
{
    "name": "<project name>"
}
```

> #### Response

```
200 : {
  "result": {
    "id": 1,
    "name": "Research Paper",
    "owner": 1,
    "updatedAt": "2020-11-03T08:23:59.950Z",
    "createdAt": "2020-11-03T08:23:59.950Z"
  },
  "msg": "New Project Created"
}
```

### GET /projects

---

> Get all projects

> #### Request Header :

```
{
  "access_token": "<access token>"
}
```

> #### Request Body :

```
no need
```

> #### Response

```
200 : {
    "personal": [
        {
            "UserId": 1,
            "ProjectId": 1,
            "status": "join",
            "updatedAt": "2020-11-03T08:23:59.950Z",
            "createdAt": "2020-11-03T08:23:59.950Z",
            "Project": {
                "name": "Research Paper",
                "owner": 1
            }
        }
    ],
    "other": []
}
```


### GET /projects/:projectId

---

> Get project by id

> #### Request Header :

```
{
   "access_token": "<access token>"
}
```

> #### Request Body :

```
no need
```

> #### Response

```
200 : {
  "data": {
    "id": 1,
    "name": "Research Paper",
    "owner": 1,
    "members": [
      {
        "name": "Hindragunawan",
        "email": "hindra@mail.com"
      }
    ]
  }
}
```



### DELETE /projects/:projectId

---

> Delete project by id

> #### Request Header :

```
{
    "access_token": "<access token>"
}
```

> #### Request Body :

```
no neeed
```

> #### Response

```
200 : {
    "msg": "Project Deleted"
}
```


## Tasks Endpoints

### POST /tasks/:projectId

---

> Create a new task

> #### Request Header :

```
{
    "access_token": "<access token>"
}
```

> #### Request Body :

```
{
    "title": "<insert title>",
    "description": "<insert description>",
    "assigned_to": "<insert assignee>",
    "status": "<insert status>"
}
```

> #### Response

```
200 : {
  "result": {
    "id": 1,
    "title": "Research",
    "description": "Go to Library",
    "assigned_to": null,
    "status": "backlog",
    "ProjectId": 3,
    "updatedAt": "2020-11-03T08:26:21.805Z",
    "createdAt": "2020-11-03T08:26:21.805Z"
  },
  "msg": "Task created"
}
```

### GET /tasks/:projectId

---

> Get task by id

> #### Request Header :

```
{
   "access_token": "<access token>"
}
```

> #### Request Body :

```
no need
```

> #### Response

```
200 : [
    {
    "id": 1,
    "title": "Research",
    "description": "Go to Library",
    "assigned_to": null,
    "status": "backlog",
    "ProjectId": 3,
    "createdAt": "2020-11-03T08:26:21.805Z",
    "updatedAt": "2020-11-03T08:26:21.805Z"
  }
]
```



### DELETE /tasks/:id/:projectId

---

Delete a task

> #### Headers :
>
> You must inside the project to delete a task

```
{
    token: <your jwt token>
}
```

> #### Request Body :

```
none
```

> #### Success Reponse

```
200 : {
    "result": 1,
    "msg": "Task deleted"
}
```

### PATCH /tasks/:id/:projectId

---

> Update task status by id

> #### Request Header


```
{
   "access_token": "<access token>"
}
```

> #### Request Body :

```
{
    "status": "<new status>"
}
```

> #### Response

```
200 : {
  "result": [
    1
  ],
  "msg": "Status updated"
}
```

### PUT /tasks/:id/:projectId

---

> Edit task by id

> #### Request Header


```
{
    "access_token": "<access token>"
}
```

> #### Request Body :

```
{
     "title": "<insert title>",
    "description": "<insert description>",
    "assigned_to": "<insert assignee>"
}
```

> #### Response

```
200 : {
  "result": [
    1
  ],
  "msg": "Task updated"
}
```



---

## Error Responses

```
> User errors
400: {
    code: 400,
    msg: <error msg>
}
401: {
    code: 401,
    msg: <error msg>
}
403: {
    code: 403,
    msg: <error msg>
}
404: {
    code: 404,
    msg: <error msg>
}
> Server error
500: {
    code: 500,
    msg: <error msg>
}
```


