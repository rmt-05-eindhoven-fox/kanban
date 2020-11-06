# kanban-app

Kanbatte

kanban with ganbatte

&nbsp;

## Endpoints

```
- POST /register
- POST /login
- GET /tasks
- POST /tasks/:CategoryId
- GET /tasks/:id
- PUT /tasks/:id
- DELETE /tasks/:id
- POST /categories
```

### RESTful endpoints

### POST /register

> Create new user to database

_Request Header_

```
not needed
```

_Request Body_

```json
{
	"email": "<email to get insert into>",
	"password": "<password to get insert into>"
}
```

_Response (201 - Created)_

```json
{
	"email": "<posted email>"
}
```

_Response (400 - Bad Request)_

```json
{
	"message": "Please input email format!, password minimum 5 characters!"
}
```

_Response (500 - Internal Error Server)_

```json
{
	"message": "Internal Server Error"
}
```

### POST /login

> Login to kanbatte

_Request Header_

```
not needed
```

_Request Body_

```json
{
	"email": "<email to get insert into>",
	"password": "<password to get insert into>"
}
```

_Response (200)_

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpc3lhZDAxQGdtYWlsLmNvbSIsImlkIjoyLCJvcmdhbml6YXRpb24iOiJwdWJsaWMiLCJpYXQiOjE2MDQ2NzIxNjV9.l4CyxRUpwuuhJU77PPWqlXiqPjwJ894AmwVFDOZaSAc"
}
```

_Response (400 - Bad Request)_

```json
{
	"message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal Server Error"
}
```

### GET /tasks

> Show all the tasks lists
> _Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```json
[
	{
		"id": 1,
		"name": "<category_name>",
		"createdAt": "2020-11-05T17:32:40.861Z",
		"updatedAt": "2020-11-05T17:32:40.861Z",
		"<Tasks>": [
			{
				"id": 1,
				"title": "<title_name>",
				"UserId": 1,
				"CategoryId": 1,
				"createdAt": "2020-09-09T14:55:06.648Z",
				"updatedAt": "2020-09-09T15:30:58.690Z",
				"User": {
					"id": 1,
					"first_name": "<user_first_name>",
					"last_name": "<user_last_name>",
					"email": "<user_email>",
					"password": "<hash_password>",
					"organization": "public",
					"createdAt": "2020-11-05T16:36:31.074Z",
					"updatedAt": "2020-11-05T16:36:31.074Z"
				}
			}
		]
	}
]
```

_Response (401 - Not Authenticated)_

```json
{
	"message": "Doesnt recognize User!"
}
```

_Response (500 - Internal server error)_

```json
{
	"message": "Internal Server Error"
}
```

### POST /tasks/:CategoryId

> Create new tasks

_Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Request Body_

```json
{
	"title": "<title to get insert into>"
}
```

_Response (201 - Created)_

```json
{
	"id": 1,
	"title": "<title name>",
	"UserId": 1,
	"CategoryId": 1,
	"createdAt": "2020-09-09T14:55:06.648Z",
	"updatedAt": "2020-09-09T15:30:58.690Z"
}
```

_Response (400 - Bad Request)_

```json
{
	"message": "Please fill the title!"
}
```

### GET /tasks/:id

> Find detail tasks by ID

_Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```json
{
	"id": 1,
	"title": "<title_name>",
	"UserId": 1,
	"CategoryId": 1,
	"createdAt": "2020-09-09T14:55:06.648Z",
	"updatedAt": "2020-09-09T15:30:58.690Z"
}
```

_Response (401 - Not Authenticated)_

```json
{
	"message": "Doesnt recognize User!"
}
```

_Response (404 - Not Found)_

```json
{
	"message": "Not Found"
}
```

### PUT /tasks/:id

> Update tasks by ID

_Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Request Body_

```json
{
	"title": "<title to get insert into>"
}
```

_Response (200)_

```json
{
	"id": 1,
	"title": "<updated title>",
	"UserId": 1,
	"CategoryId": 1,
	"createdAt": "2020-09-09T14:55:06.648Z",
	"updatedAt": "2020-09-09T15:30:58.690Z"
}
```

> Error response:
> _Response (400 - Bad request)_

```json
{
	"message": "Please fill the title!"
}
```

_Response (404 - Not Found)_

```json
{
	"message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal Server Error"
}
```

### DELETE /tasks/:id

> Delete tasks data by ID

_Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Response(200)_

```json
[
	{
		"id": "<selected id>",
		"title": "<tasks title>",
		"UserId": "<tasks UserId>",
		"CategoryId": "<tasks CategoryId>",
		"createdAt": "2020-09-09T14:55:06.648Z",
		"updatedAt": "2020-09-09T15:30:58.690Z"
	}
]
```

> Error response:
> _Response (404 - Not Found)_

```json
{
	"message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal Server Error"
}
```

### POST /categories

> Add new category

_Request Header_

```json
{
	"access_token": "<your access token>"
}
```

_Request Body_

```json
{
	"name": "<category name>"
}
```

_Response (200)_

```json
{
	"id": 1,
	"name": "<category name insert into>",
	"createdAt": "2020-09-09T14:55:06.648Z",
	"updatedAt": "2020-09-09T15:30:58.690Z"
}
```

_Response (400 - Bad Request)_

```json
{
	"message": "Bad Request"
}
```
