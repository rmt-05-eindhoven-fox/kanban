# KANBAN

***
## Register
***
register with new user info
1. URL  `localhost:3000/register`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "email",
	"password": "password",
}

```
5. Success Response
```javascript
CODE : 201 (created)

CONTENT :
{
  id,
  email
}
```
6. Error Response
```javascript
CODE: 400 (BAD REQUEST)
CONTENT: 
  "message": "Email has already registered"

OR:
CODE: 500 (INTERNAL SERVER ERROR)
CONTENT:
  "message": "Internal Server Error"

```
***
## Login
***
login while get an access token based on credentials
1. URL  `localhost:3000/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
( redirect next page )
```
6. Error Response
```javascript
CODE: 500
CONTENT:
{
  message: "internal server eror"
}

OR 

CODE: 400
CONTENT:
{
  message: "bad request"
}

```
***
## Sign In Using Google
***
sign in with google account
1. URL  `localhost:3000/googleLogin`
2. Method `POST`
3. URL Param `not required`
4. Data
```javascript
your google account
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 201

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 500 

CONTENT:
{
  error,
  message: 'Internal Server Error'
}
```
***
## logout
***
1. URL  ``
2. Method ``
3. URL Param `not required`
4. Data Param
```javascript
```
5. Success Response
```javascript
```
6. Error Response
```javascript
```
***
## Create Task
***
create new task ( authenticated only )

1. URL  `localhost:3000/tasks`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript

data: {
  title : 'STRING', 
  category: 'STRING', 
}

headers: {
      'access_token': `${token}`
    }

```
5. Success Response
```javascript
CODE : 200
show all task list
```
6. Error Response
```javascript
CODE: 400
CONTENT: {
  message: "bad request"
}
```
***
## Read task / Show all task on kanban board
***
show all todo list ( authenticated user only )

1. URL  `localhost:3000/tasks`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200
show all task on kanban
```
6. Error Response
```javascript
CODE: 500
CONTENT: {
  message: "internal server error"
}
```
***
## Edit Task
***
edit your task ( authenticated user only )
1. URL  `localhost:3000/tasks/:id`
2. Method `PUT`
3. URL Param `not required`
4. Data Param
```javascript
data: {
      id: 'number',
      title: 'string',
      category: 'string'
    },
    headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200(OK)
CONTENT: {
  title,
  category
}
```
6. Error Response
```javascript
CODE: 400
CONTENT: "json" {
  message: "Bad request"
}

OR 
CODE: 500('internal server error')

CONTENT:

```
***
## Delete Task
***
delete your task ( authenticated user only )

1. URL  `localhost:3000/tasks/:id`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
data: {
      id,
      token
    },
headers: {
      'access_token': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200

CONTENT : JSON {
  'Tasks success to delete'
}

```
6. Error Response
```javascript
CODE: 404 (NOT FOUND)

```