# Register New User
Create new user, returns json data containing new user's data.

### URL:
`/register`

### Method:
`POST`

### URL Params:
None

### Data Params: 
None

### Success Response: 
Status: 201 Created
```
json
{
	id: 1
	name: Amanda Jehan
	email: amandajehan@gmail.com
}
```

### Error Response:
Status: 400 Bad Request
```
json
{
	error: "Name is required, E-mail is required, E-mail needs to be in e-mail format, Password is required, Password's length is minimum 6"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error: "Internal Server Error"
}
```

### Sample Call:
```
axios({
	url: "/register",
  method: "POST",
  data: {
  name: payload.name,
  email: payload.email,
  password: payload.password,
	},
})
```


# Login User
Login for existing user, returns an access token

### URL:
`/login`

### Method:
`POST`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 200 OK
```
json
{
	name: Amanda Jehan
	email: amandajehan@gmail.com,
	access_token: eyeskjehslerawioderjlwa
}
```

### Error Response:
Status: 401 AuthenticationFailed
```
json
{
	error: "Authentication Failed"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error: "Internal Server Error"
}
```

### Request:
```
axios({
  url: "/login",
  method: "POST",
  data: {
    email: payload.email,
    password: payload.password,
  },
})
```


# Show All Tasks / Dashboard
Returns json data of all existing Tasks

### URL:
`/tasks`

### Method:
`GET`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 200 OK
```
json 
{
  "id": 1,
	"title": "Deploy Kanban App",
	"category": "Todo",
	"userId": 1,
  "createdAt": "2020-11-03T17:19:19.799Z",
  "updatedAt": "2020-11-03T17:25:00.578Z"
}
```

### Request:
```
axios({
  url: "/tasks",
  method: "GET",
  headers: {
  token,
	},
})
```

# Add New Task
To add a new task, returns json data about a new Task

### URL:
`/tasks`

### Method:
`POST`

### URL Params:
None

### Data Params:
`title = [string]`
`category = [string]`

### Success Response:
Status: 201 Created
```
json 
{
	id: 1,
	title: "Making Kanban App",
	category: "Todo"
}
```

### Error Response
Status: 400 Bad Request
```
json {
	error: "Title is required, Category is required"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request
```
axios({
  url: "/tasks",
  method: "POST",
  data: {
  	title: payload.title,
    tag: payload.tag,
    category: payload.category,
  },
  headers: {
  token,
  },
})
```


# Edit a Task
User can edit all fields of a Task, returns updated json data of a Task

### URL:
`/todos/:id`

### Method:
`PUT`

### URL Params:
Required: `id: [integer]`

### Data Params:
`title: [string]`
`category: [string]`

### Success Response:
Status: 200 OK
```
json
{
	id: 1,
	title: "Deploying Kanban App",
	category: "Doing"
}
```

### Error Response:
Status: 400 Bad Request
```
json {
	error: "Title is required, Category is required"
}
```

Or

Status: 404 NotFound
```
json 
{
	error: "Not Found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request:
```
axios({
  url: `/tasks/${payload.id}`,
  method: "PUT",
  data: {
    title: payload.title,
    tag: payload.tag,
  },
  headers: {
    token,
	},
})
```


# Update a Task
To Update category of a Task

### URL:
`/todos/:id`

### Method:
`PATCH`

### URL Params:
Required: `id = [integer]`

### Data Params:
`status = [string]`

### Sucess Response:
Status: 200 OK
```
json
{
	id: 1,
	title: "Deploying Kanban App",
	category: "Done"
}
```

### Error Response
Status: 400 Bad Request
```
json {
	error: "Category is required"
}
```

Or

Status: 404 NotFound
```
json 
{
	error: "Not Found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request:
```
axios({
  url: `/tasks/${payload.id}`,
  method: "PATCH",
	data: {
		category: payload.category
	}
  headers: {
    tokens
  },
})
```


# Delete a Task
Delete a json data of a Task

### URL:
`/todos/:id`

### Method:
`DELETE`

### URL Params:
Required: `id = [integer]`

### Data Params:
None

### Success Response:
Status: 200 OK
```
json
{
	message: "Task is deleted successfully."
}
```

### Error Response:
Status: 404 NotFound
```
json 
{
	error: "Not Found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request:
```
axios({
  url: `/tasks/${payload.id}`,
  method: "DELETE",
  headers: {
    token,
  },
})
```
