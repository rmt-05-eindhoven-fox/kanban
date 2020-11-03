# Register New User
Create new user, returns json data containing new user's data.

### URL:
`register`

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
$.ajax({
	method: "POST",
	url: "http://localhost:3000/login",
	data: {
		name,
		email,
		password
	}
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

### Sample Call:
```
$.ajax({
	method: "POST",
	url: "http://localhost:3000/login",
	data: {
		email,
		password
	}
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

### Sample Call
```
$.ajax({
	method: "POST",
	url: "http://localhost:3000/tasks",
	headers: {
		access_token
	},
	data: {
		title,
		category,
		userId
	}
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

### Sample Call:
```
$.ajax({
	method: "PUT",
	url: "http://localhost:3000/${id}",
	headers: {
		access_token
	},
	data: {
		title,
		category
	}
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

### Sample Call:
```
$.ajax({
	method: "PATCH",
	url: "http://localhost:3000/${id}",
	headers: {
		access_token
	},
	data: {
		category
	}
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

### Sample Call:
```
$.ajax({
	method: "DELETE",
	url: "http://localhost:3000/${id}",
	headers: {
		access_token
	}
})
```
