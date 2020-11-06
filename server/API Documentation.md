### 1. POST /create-card
Membuat data task baru

Request
- Header
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
   ```

- Body
    ```json
        {
            "title": "new task",
            "category": "Backlog",
        }
    ```
Response
- Success - 201
    ```json
        {
            "id": 1,
            "title": "new task",
            "category": "Backlog",
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 2. GET /show
Get semua data task

Request
- Header
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```

Response
- Success - 200
    ```json
    [
        {
            "id": 1,
            "title": "new task",
            "category": "Backlog",
        },
        {},
        {}
    ]
    ```
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 3. PUT /update/:id
Update data task berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Params
    ```json
        {
            "id": 1
        }
    ```
- Body
    ```json
        {
            "title": "update task",
            "category": "Doing",
        }
    ```
Response
- Success - 200
    ```json
        {
            "id": 1,
            "title": "update task",
            "category": "Doing",
        }
    ```
- Error - 400 : Bad Request
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 4. DELETE /task/:id
Delete data task berdasarkan id yang direquest 

Request
- Header
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Body:
    ```json
        {
            "id": 1
        }
    ```
Response
- Success - 200
    ```json
        {
            "message":"task success to delete"
        }
    ```
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 5. POST /register
User register

Request
- Body:
    ```json
        {
            "email": "doe@mail.com",
            "password": "123qwe"
        }
    ```
Response
- Success - 201 : Created
    ```json
        {
            "id": 1,
            "email": "doe@mail.com",
        }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 6. POST /login
User login

Request
- Body:
    ```json
        {
            "email": "doe@mail.com",
            "password": "123qwe"
        }
    ```
Response
- Success - 200
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 7. POST /googleLogin
User google login

Request
- Body:
    ```json
        {
            "id_token": "<google_token>"
        }
    ```
Response
- Success - 200
    ```json
    {
        "access_token":"eyJhbGccCI6IkpXVCJ9.eyJpZCI6gzNzA3MH0.zaBO7Rcdf3DBQ3MuBAH7I"
    }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error
