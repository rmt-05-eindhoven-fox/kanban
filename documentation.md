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

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

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

## Find all Organizations

* ### URL

```
http://localhost:3000/organizations
```

* ### Method:

  `GET`

* ### URL Params

  `None`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 2,
        "name": "Hacktiv8",
        "description": "Hacktiv8 Organization",
        "UserId": 1,
        "createdAt": "2020-11-04T16:48:39.650Z",
        "updatedAt": "2020-11-05T14:18:11.018Z",
        "Categories": [
            {
                "id": 5,
                "name": "Backlog",
                "type": "Default",
                "OrganizationId": 2,
                "position": 1,
                "createdAt": "2020-11-04T16:48:39.661Z",
                "updatedAt": "2020-11-04T16:48:39.661Z"
            },
            {
                "id": 6,
                "name": "Todo",
                "type": "Default",
                "OrganizationId": 2,
                "position": 2,
                "createdAt": "2020-11-04T16:48:39.661Z",
                "updatedAt": "2020-11-04T16:48:39.661Z"
            },
            {
                "id": 7,
                "name": "Doing",
                "type": "Default",
                "OrganizationId": 2,
                "position": 3,
                "createdAt": "2020-11-04T16:48:39.661Z",
                "updatedAt": "2020-11-04T16:48:39.661Z"
            },
            {
                "id": 8,
                "name": "Done",
                "type": "Default",
                "OrganizationId": 2,
                "position": 4,
                "createdAt": "2020-11-04T16:48:39.661Z",
                "updatedAt": "2020-11-04T16:48:39.661Z"
            },
            {
                "id": 15,
                "name": "Deploy",
                "type": "Custom",
                "OrganizationId": 2,
                "position": 5,
                "createdAt": "2020-11-05T05:23:13.842Z",
                "updatedAt": "2020-11-05T05:23:13.842Z"
            },
            {
                "id": 17,
                "name": "Deployment",
                "type": "Custom",
                "OrganizationId": 2,
                "position": 6,
                "createdAt": "2020-11-05T18:25:48.126Z",
                "updatedAt": "2020-11-05T18:41:19.114Z"
            }
        ],
        "Tags": [
            {
                "id": 1,
                "name": "Important",
                "color": "#FF0000",
                "OrganizationId": 2,
                "createdAt": "2020-11-05T05:29:29.228Z",
                "updatedAt": "2020-11-05T05:29:29.228Z"
            },
            {
                "id": 5,
                "name": "Important",
                "color": "#FF0000",
                "OrganizationId": 2,
                "createdAt": "2020-11-05T17:51:51.495Z",
                "updatedAt": "2020-11-05T17:51:51.495Z"
            }
        ]
    },
    {
        "id": 1,
        "name": "Demo",
        "description": "Demo ",
        "UserId": 1,
        "createdAt": "2020-11-04T16:11:23.750Z",
        "updatedAt": "2020-11-04T16:11:23.750Z",
        "Categories": [
            {
                "id": 1,
                "name": "Backlog",
                "type": "Default",
                "OrganizationId": 1,
                "position": 1,
                "createdAt": "2020-11-04T16:21:53.973Z",
                "updatedAt": "2020-11-04T16:21:53.973Z"
            },
            {
                "id": 2,
                "name": "Todo",
                "type": "Default",
                "OrganizationId": 1,
                "position": 2,
                "createdAt": "2020-11-04T16:21:53.973Z",
                "updatedAt": "2020-11-04T16:21:53.973Z"
            },
            {
                "id": 3,
                "name": "Doing",
                "type": "Default",
                "OrganizationId": 1,
                "position": 3,
                "createdAt": "2020-11-04T16:21:53.973Z",
                "updatedAt": "2020-11-04T16:21:53.973Z"
            },
            {
                "id": 4,
                "name": "Done",
                "type": "Default",
                "OrganizationId": 1,
                "position": 4,
                "createdAt": "2020-11-04T16:21:53.973Z",
                "updatedAt": "2020-11-04T16:21:53.973Z"
            }
        ],
        "Tags": [
            {
                "id": 4,
                "name": "Important",
                "color": "#FF0000",
                "OrganizationId": 1,
                "createdAt": "2020-11-05T07:41:45.605Z",
                "updatedAt": "2020-11-05T07:41:45.605Z"
            }
        ]
    }
]
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Organization not found or you are not authorized to see this organization"
}

{
    "msg": "Authentication failed"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Edit Organizations

* ### URL

```
http://localhost:3000/organizations/:id
```

* ### Method:

  `PUT`

* ### URL Params

  `OrganizationId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json
  {
    "name": "Hacktiv8",
    "description": "Hacktiv8 Organization"
}
  ```

* ### Success Response:

`Status: 200`
```json
{
    "id": 4,
    "name": "Hacktiv8",
    "description": "Hacktiv8 Kanban",
    "UserId": 1,
    "updatedAt": "2020-11-06T16:33:51.298Z",
    "createdAt": "2020-11-06T16:33:51.298Z"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Organization not found or you are not authorized to see this organization"
}

{
    "msg": "Authentication failed"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Create Organizations

* ### URL

```
http://localhost:3000/organizations
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json
  {
    "name": "Hacktiv8",
    "description": "Hacktiv8 Kanban"
}
  ```

* ### Success Response:

`Status: 201`
```json
{
    "id": 4,
    "name": "Hacktiv8",
    "description": "Hacktiv8 Kanban",
    "UserId": 1,
    "updatedAt": "2020-11-06T16:33:51.298Z",
    "createdAt": "2020-11-06T16:33:51.298Z"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Organization not found or you are not authorized to see this organization"
}

{
    "msg": "Authentication failed"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Organizations

* ### URL

```
http://localhost:3000/organizations/:id
```

* ### Method:

  `DELETE`

* ### URL Params

  `OrganizationId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
{
    "msg" : "Organization has been deleted"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Organization not found or you are not authorized to see this organization"
}

{
    "msg": "Authentication failed"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

--
<br>
<br>

## Find all Categories

* ### URL

```
http://localhost:3000/categories
```

* ### Method:

  `GET`

* ### URL Params

  `OrganizationId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 5,
        "name": "Backlog",
        "type": "Default",
        "OrganizationId": 2,
        "position": 1,
        "createdAt": "2020-11-04T16:48:39.661Z",
        "updatedAt": "2020-11-04T16:48:39.661Z"
    },
    {
        "id": 15,
        "name": "Deploy",
        "type": "Custom",
        "OrganizationId": 2,
        "position": 5,
        "createdAt": "2020-11-05T05:23:13.842Z",
        "updatedAt": "2020-11-05T05:23:13.842Z"
    },
    {
        "id": 6,
        "name": "Todo",
        "type": "Default",
        "OrganizationId": 2,
        "position": 2,
        "createdAt": "2020-11-04T16:48:39.661Z",
        "updatedAt": "2020-11-04T16:48:39.661Z"
    },
    {
        "id": 7,
        "name": "Doing",
        "type": "Default",
        "OrganizationId": 2,
        "position": 3,
        "createdAt": "2020-11-04T16:48:39.661Z",
        "updatedAt": "2020-11-04T16:48:39.661Z"
    },
    {
        "id": 8,
        "name": "Done",
        "type": "Default",
        "OrganizationId": 2,
        "position": 4,
        "createdAt": "2020-11-04T16:48:39.661Z",
        "updatedAt": "2020-11-04T16:48:39.661Z"
    }
]
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg": "Authorization failed, you are not admin of this organization"
}

{
    "msg": "First name cannot contain space, Second name cannot contain space"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Category not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Change category name

* ### URL

```
http://localhost:3000/categories/:id

```

* ### Method:

  `PATCH`

* ### URL Params

  `CategoryId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json
  {
    "name": "Deployment"
}
  ```

* ### Success Response:

`Status: 200`
```json
{
    "id": 14,
    "name": "Deployment",
    "type": null,
    "OrganizationId": 2,
    "createdAt": "2020-11-05T05:22:56.039Z",
    "updatedAt": "2020-11-05T05:25:52.412Z"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg": "Authorization failed, you are not admin of this organization"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Category not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete category name

* ### URL

```
http://localhost:3000/categories/:id

```

* ### Method:

  `DELETE`

* ### URL Params

  `CategoryId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json
{
    "msg": "Category has been deleted"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg": "Authorization failed, you are not admin of this organization"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Category not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------
<br>
<br>

## Find All Tasks

* ### URL

```
http://localhost:3000/tasks

```

* ### Method:

  `GET`

* ### URL Params

  `CategoryId[integer]`
  `TagId[integer.`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 12,
        "title": "First Task",
        "description": "My first task",
        "due_date": "2020-10-10T00:00:00.000Z",
        "user": {
            "name": "Jane Doe",
            "email": "jane.doe@mail.com",
            "profile_picture": "https://ui-avatars.com/api/?name=Jane+Doe&background=random&rounded=true"
        },
        "category": "Todo",
        "tags": [],
        "updatedAt": "2020-11-05T17:45:16.303Z",
        "assignees": [
            {
                "id": 2,
                "name": "Jane Doe",
                "email": "jane.doe@mail.com",
                "profile_picture": "https://ui-avatars.com/api/?name=Jane+Doe&background=random&rounded=true"
            }
        ],
        "OwnerId": 1
    }
]
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Task not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Create Task

* ### URL

```
http://localhost:3000/tasks

```

* ### Method:

  `GEPOSTT`

* ### URL Params

  `None`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json

    `{
        "title": "Second task",
        "OrganizationId": 2,
        "CategoryId": 1
    }

  ```

* ### Success Response:

`Status: 201`
```json
{
    "id": 12,
    "title": "Second task",
    "OrganizationId": 2,
    "CategoryId": 1,
    "OwnerId": 1,
    "UserId": 1,
    "updatedAt": "2020-11-05T17:24:19.404Z",
    "createdAt": "2020-11-05T17:24:19.404Z",
    "description": null,
    "due_date": null
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Task not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Edit Task

* ### URL

```
http://localhost:3000/tasks/:id

```

* ### Method:

  `PUT`

* ### URL Params

  `TaskId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json

    {
    "title": "First Task",
    "description": "My first task",
    "due_date": "2020-10-10",
    "CategoryId": 2
    }

  ```

* ### Success Response:

`Status: 200`
```json
{
    "id": 12,
    "title": "Second task",
    "OrganizationId": 2,
    "CategoryId": 1,
    "OwnerId": 1,
    "UserId": 1,
    "updatedAt": "2020-11-05T17:24:19.404Z",
    "createdAt": "2020-11-05T17:24:19.404Z",
    "description": null,
    "due_date": null
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg" : "Authorization failed, only task owner and assignee can edit this task'"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Task not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Update Task Category

* ### URL

```
http://localhost:3000/tasks/:id

```

* ### Method:

  `PATCH`

* ### URL Params

  `TaskId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json

    {
    "CategoryId": 2
    }

  ```

* ### Success Response:

`Status: 200`
```json
{
    "id": 2,
    "title": "First Task",
    "description": "My first task",
    "due_date": "2020-10-10T00:00:00.000Z",
    "UserId": 1,
    "OrganizationId": 1,
    "CategoryId": 2,
    "createdAt": "2020-11-05T06:21:39.044Z",
    "updatedAt": "2020-11-05T14:49:00.502Z"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg" : "Authorization failed, only task owner and assignee can edit this task'"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Task not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Task Category

* ### URL

```
http://localhost:3000/tasks/:id

```

* ### Method:

  `DELETE`

* ### URL Params

  `TaskId[integer]`

* ### Headers

  ``` json
  {
      "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImlhdCI6MTYwNDUwNjMzOX0.OBNcIsyMzZ0L2LPnr05b2bLwgTYkJzPB9K5aOJl2r9k"
  }
  ```

* ### Data Params

  ```json

    {
    "CategoryId": 2
    }

  ```

* ### Success Response:

`Status: 200`
```json
{
    "msg": "Task has been deleted"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed, you are not a member of this organization"
}

{
    "msg" : "Authorization failed, only task owner and assignee can edit this task'"
}

{
    "msg": "Authentication failed"
}

```
`Status: 404`
```
{
    "msg": "Task not found"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------


## Google Login

* ### URL

```
http://localhost:3000/google-login

```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Headers

  ``` json
  {
    "google_access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOTJiNjEyZTliNjQ0N2RlYjEwNjg1YmI4ZmZhOGFlNjJmNmFhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODcxMDAwMDU0MDIxLTRwMmxtY2diY3I4YTlkajd0MXM4azQxM245M3BvN2RpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODcxMDAwMDU0MDIxLTRwMmxtY2diY3I4YTlkajd0MXM4azQxM245M3BvN2RpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NzkxNjc5MDE2MDY0NDcyMzA2IiwiZW1haWwiOiJ5b3NpYS5lbG5pbm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJEa0JhUlZJcUkyV2t0bzYxVGdkVXFRIiwibmFtZSI6Illvc2lhIEVsbmlubyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaHk4YVJyN2RuRS05dS1BcmRoMERDdE9ENHFWMWUtNlZVdXBmaFN5Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJZb3NpYSIsImZhbWlseV9uYW1lIjoiRWxuaW5vIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDQ2NzEzNTYsImV4cCI6MTYwNDY3NDk1NiwianRpIjoiOTk3ZDFiZDNhZDg0ODMyY2ZiYzI4ZGZmY2E3MjdjNDgyMzRhMGNiMiJ9.3t7bT1VmtrWVdTX9fEi9ngepZAbGm34koMotSyMm3p08ax9ubuCsnkAfVcaB42kiJVspyk5vLQjaUC-1VnwxjUyG7dkE4hKb8NFq1xp8hOQPqe-msAsNdCdEnTqdMJOajeuZ8V9UWTkfbkoT0Cufu36FeqWWgJSCNhzbE0E8AHaTsg921sSz8nUPRk0t92fECPpweKu54Psd8mWdnqXv8TGo2RsIuuiNgdPF2HEwGj-DjFuevHyG_TuX8y6JTgKGE2X5DQhTjry2Tgxu1omCJarkTVRZYmR9PBLhhlVjV540i4cIq05iCfJycF02pHNF1mu0LHzEAKfUsPQbI7Xqiw"
}
  ```

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json
{
    "access_token": "Tsdhasvhvaisnv;oiahb viofbhjm asdfibjaodf
}
```
* ### Error Response:

```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------