# kanban

## Register

`save user information to database`

**URL**

`/user/register`

**Method**

`POST`

**Success Response:**

  Code: 201
  Content:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**Error Response**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { message : "Internal Server Error" }
  ```

## Login

`authenticate user from database`

**URL**

`/user/login`

**Method**

`POST`

**Success Response**

  Code: 200
  Content:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**Error response**

  Code: 401 
  Content: 
  ```json
  { message: "wrong email or password" }
  ```

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { message : "Internal Server Error" }
  ```

## Show Task

`show all task data from database`

**URL**

`/task`

**Method:**

`GET`

**Headers:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**Success Response:**

  Code: 200
  Content:
```json
{
  id: 1,
  title: 'tes',
  description: 'testing',
  status: 'backlog',
  UserId: 1
}
```

## Add Task

`add task data to database`

**URL**

`/task/`

**Method**

`POST`

**Headers:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**Data Params**

`title = [string]`
`description = [string]`
`status = [string]`

**Success Response:**

  Code: 201
  Content:
```json
{
  id: 1,
  title: 'tes',
  description: 'testing',
  status: 'backlog',
  UserId: 1
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```

## Edit Task

`edit tasks data and save it on database`

**URL**

`/task/`

**Method:**

`PUT`

**Headers:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**URL Params**

Required:

`id=[integer]`

**Data Params**

`title = [string]`
`description = [string]`
`status = [string]`

**Success Response:**

  Code: 200
  Content:
```json
{
  id: 1,
  title: 'coba',
  description: 'cobain',
  status: 'todo',
  UserId: 1
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```

## Update Task Status

`update task's status data and save it to database`

**URL**

`/task/`

**Method:**

`PATCH`

**Headers:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**URL Params**

Required:

`id=[integer]`

**Data Params**

`status = [string]`

**Success Response:**

  Code: 200
  Content:
```json
{
  id: 1,
  title: 'coba',
  description: 'cobain',
  status: 'review',
  UserId: 1
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```

## Delete Task

`delete a task from database`

**URL**

`/task/`

**Method:**

`DELETE`

**Headers:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MDE1NTd9.fKJJbNlJAGfhA4wwnXSulbrx71lpcoxJt8rjh3de4fg"
}
```

**URL Params**

Required:

`id=[integer]`

**Success Response:**

  Code: 200
  Content:
```json
{
  id: 1,
  title: 'coba',
  description: 'cobain',
  status: 'review',
  UserId: 1
}
```

**Error Response:**

  Code: 500 INTERNAL SERVER ERROR
  Content: 
  ```json
  { error : "Internal Server Error" }
  ```