# KhanBhanBoard Server

## RESTful endpoints
**Add New Task**
----
  Add new task data on server into a database.

* **URL**

  /tasks

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `title=[string]`,
  `description=[string]`,
  `category=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 45,
    "title": "Kerjakan Kanban Server",
    "description": "Membuat route server untuk kanban",
    "category": "Backlog",
    "UserId": 1,
    "updatedAt": "2020-11-06T07:07:43.123Z",
    "createdAt": "2020-11-06T07:07:43.123Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title is required!, Description is required!, Category is required!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read All Task**
----
  Returns all available json task data from all users.

* **URL**

  /tasks

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
        "id": 2,
        "title": "Kerjakan Kanban Server",
        "description": "Membuat route server untuk kanban",
        "category": "Backlog",
        "UserId": 2,
        "createdAt": "2020-11-04T11:57:23.674Z",
        "updatedAt": "2020-11-04T11:57:23.674Z",
        "User": {
            "id": 2,
            "email": "admin@gmail.com",
            "createdAt": "2020-11-04T11:56:08.915Z",
            "updatedAt": "2020-11-04T11:56:08.915Z"
        }
    },
    {
        "id": 23,
        "title": "Pergi ke Pasar",
        "description": "Ayo maju! Udh malem!",
        "category": "Doing",
        "UserId": 4,
        "createdAt": "2020-11-04T15:35:11.363Z",
        "updatedAt": "2020-11-04T15:35:11.363Z",
        "User": {
            "id": 4,
            "email": "people@gmail.com",
            "createdAt": "2020-11-04T15:34:43.738Z",
            "updatedAt": "2020-11-04T15:34:43.738Z"
        }
    },
    {
        "id": 27,
        "title": "Mancing Mania",
        "description": "Membuat client side dengan Vue.js dan axios",
        "category": "Done",
        "UserId": 3,
        "createdAt": "2020-11-04T17:24:47.039Z",
        "updatedAt": "2020-11-04T17:24:47.039Z",
        "User": {
            "id": 3,
            "email": "person@gmail.com",
            "createdAt": "2020-11-04T12:01:09.767Z",
            "updatedAt": "2020-11-04T12:01:09.767Z"
        }
    },
    {
        "id": 22,
        "title": "Belajar JQuery Semalaman",
        "description": "Membuat sebuah aplikasi web FancyTodo dengan HTML JQuery dan CSS",
        "category": "Done",
        "UserId": 1,
        "createdAt": "2020-11-04T15:18:43.142Z",
        "updatedAt": "2020-11-05T13:15:36.342Z",
        "User": {
            "id": 1,
            "email": "user@gmail.com",
            "createdAt": "2020-11-04T11:55:49.683Z",
            "updatedAt": "2020-11-04T11:55:49.683Z"
        }
    },
    {
        "id": 26,
        "title": "Client Vue.js xxx yyy",
        "description": "Membuat client side dengan Vue.js dan axios",
        "category": "Todo",
        "UserId": 3,
        "createdAt": "2020-11-04T17:24:28.273Z",
        "updatedAt": "2020-11-05T13:21:01.854Z",
        "User": {
            "id": 3,
            "email": "person@gmail.com",
            "createdAt": "2020-11-04T12:01:09.767Z",
            "updatedAt": "2020-11-04T12:01:09.767Z"
        }
    },
    {
        "id": 35,
        "title": "dansa yok dansa",
        "description": "Ayo maju! Udh malem!",
        "category": "Todo",
        "UserId": 1,
        "createdAt": "2020-11-05T15:26:06.240Z",
        "updatedAt": "2020-11-06T03:52:24.125Z",
        "User": {
            "id": 1,
            "email": "user@gmail.com",
            "createdAt": "2020-11-04T11:55:49.683Z",
            "updatedAt": "2020-11-04T11:55:49.683Z"
        }
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Get Task By Id**
----
  Returns a single task data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /tasks/:id

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 24,
    "title": "ABC LIMA DASAR",
    "description": "Membuat sebuah aplikasi web FancyTodo dengan HTML JQuery dan CSS",
    "category": "Backlog",
    "UserId": 1,
    "createdAt": "2020-11-04T15:57:47.321Z",
    "updatedAt": "2020-11-06T04:10:44.105Z",
      "User": {
          "id": 1,
          "email": "user@gmail.com",
          "createdAt": "2020-11-04T11:55:49.683Z",
          "updatedAt": "2020-11-04T11:55:49.683Z"
      }
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

&nbsp;

**Update Task By Id**
----
  Update a single task data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /tasks/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `title=[string]`,
  `description=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 24,
      "title": "Kerjakan Kanban Server & Error Handler",
      "description": "Menambahkan server rest API untuk kanban",
      "UserId": 1,
      "createdAt": "2020-11-04T15:57:47.321Z",
      "updatedAt": "2020-11-06T07:11:03.978Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title is required!, Description is required!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Update Category Task By Id**
----
  Update category field on a task data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /tasks/:id

* **Method:**
  
  `PATCH`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**

  **Required:**
   
  `category=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 24,
    "title": "Kerjakan Kanban Server & Error Handler",
    "description": "Menambahkan server rest API untuk kanban",
    "category": "Todo",
    "UserId": 1,
    "createdAt": "2020-11-04T15:57:47.321Z",
    "updatedAt": "2020-11-06T07:13:39.418Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category is required!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;
  
**Delete Task**
----
  Delete a task data based on its "Id" on server that belongs to User who logged in.

* **URL**

  /tasks/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete a task!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Register User**
----
  Register user on server.

* **URL**

  /register

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
      "id": 1,
      "email": "user@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email is required!, Wrong email format!, Password length minimum 6 characters!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Login User**
----
  Login user on server.

* **URL**

  /login

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "id": 1,
      "email": "user@gmail.com",
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Login User With Google => OAuth2**
----
  Login user with Google Account.

* **URL**

  /loginGoogle

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `google_access_token=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "id": 1,
      "email": "userxxxyyy@gmail.com",
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`