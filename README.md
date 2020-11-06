# kanban


### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
   {
        "id": 4,
        "title": "begadang trossssss",
        "category": "product",
        "tag": "coding",
        "UserId": 1,
        "createdAt": "2020-11-05T18:31:19.278Z",
        "updatedAt": "2020-11-05T18:31:19.278Z",
        "User": {
            "id": 1,
            "first_name": "rama",
            "last_name": "ardana",
            "email": "rama1@gmail.com",
            "password": "$2a$10$UZJrKL50uXQqoBUIIA2/4.iV9Q7Xp6Yj3RUQjhmHZ2wIH5PVnXrvu",
            "createdAt": "2020-11-05T17:30:45.163Z",
            "updatedAt": "2020-11-05T17:30:45.163Z"
        }
    },
    {
        "id": 5,
        "title": "begadang trossssss ya mau gmn lgi",
        "category": "development",
        "tag": "coding",
        "UserId": 1,
        "createdAt": "2020-11-05T18:31:35.551Z",
        "updatedAt": "2020-11-05T18:31:35.551Z",
        "User": {
            "id": 1,
            "first_name": "rama",
            "last_name": "ardana",
            "email": "rama1@gmail.com",
            "password": "$2a$10$UZJrKL50uXQqoBUIIA2/4.iV9Q7Xp6Yj3RUQjhmHZ2wIH5PVnXrvu",
            "createdAt": "2020-11-05T17:30:45.163Z",
            "updatedAt": "2020-11-05T17:30:45.163Z"
        }
    }
]
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid request"
}
```
---

### POST /tasks

> Create new tasks

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
  "tag": "<tag to get insert into>"
  "category": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": 6,
    "title": "begadang trossssss ya mau gmn lgi",
    "category": "development",
    "tag": "coding",
    "UserId": 1,
    "updatedAt": "2020-11-06T12:22:24.449Z",
    "createdAt": "2020-11-06T12:22:24.449Z"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### PUT /tasks/:id

> Update existing tasks

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
  "tag": "<tag to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "id": 4,
    "title": "begadang",
    "category": "done",
    "tag": "design",
    "UserId": 1,
    "createdAt": "2020-11-05T18:31:19.278Z",
    "updatedAt": "2020-11-06T12:29:31.964Z"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### PATCH /tasks/:id

> Update category existing tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "category":"<category to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "id": 4,
    "title": "begadang",
    "category": "done",
    "tag": "design",
    "UserId": 1,
    "createdAt": "2020-11-05T18:31:19.278Z",
    "updatedAt": "2020-11-06T12:27:58.196Z"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
---
### DELETE /tasks/:id

> delete existing tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Success)_
```
{
    "msg": "success delete task with id 4"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid requests"
}
```
----

# USER

### POST Register
----
  Create a new user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
      "first_name": "user",
      "last_name" : "name"
}

```

_Response (201)_

  ```json    
    {
      "msg":"Register Success"
    }
  ```
 
_Response (500 - Internal Server error)_
```json
{
  "error": "Internal Server error"
}
``` 
----

### POST login
----
  Login into user in the database

 _Request Body_
```json
{
      "email" : "user@mail.com",
      "password" : "userPassword",
}

```

_Response (200)_

  ```json    
    {
      "access_token":"9aqwe39e39e33r390jw9hdin389hdid89whdionahhOIINhjsi9IJn2jwj934e3n",
      "first_name": "user"
    }
  ```
 
_Response (500 - Internal Server error)_
```
{
  "error": "Internal Server error"
}
```
----


### POST login with Google
----
  Login into user in the database with google account

 _Request Header_
```json
{
    google_access_token
}

```

_Response (200)_

  ```json    
    {
      "access_token":"9aqwe39e39e33r390jw9hdin389hdid89whdionahhOIINhjsi9IJn2jwj934e3n",
      "first_title": "user"
    }
  ```
 
_Response (500 - Internal Server error)_
```
{
  "error": "Internal Server error"
}
----