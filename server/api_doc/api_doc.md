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
    "id": 4,
    "title": "task 4",
    "description": "Add Register and Login",
    "status": "Undone",
    "due_date": "2020-11-10",
    "updatedAt": "2020-10-26T10:19:58.124Z",
    "createdAt": "2020-10-26T10:19:58.124Z"
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
        "id": 1,
        "title": "Rest API",
        "description": "Learn how to make API Documentaion and REST API",
        "status": "Done",
        "due_date": "2020-11-01",
        "createdAt": "2020-10-26T07:48:57.394Z",
        "updatedAt": "2020-10-26T07:48:57.394Z"
      },
      {
        "id": 2,
        "title": "Fancy task App",
        "description": "Protofolio project week 1",
        "status": "Undone",
        "due_date": "2020-11-01",
        "createdAt": "2020-10-26T07:48:57.394Z",
        "updatedAt": "2020-10-26T07:48:57.394Z"
      },
      {
        "id": 3,
        "title": "task 3",
        "description": "Kerjakan task Jangan Lupa",
        "status": "Undone",
        "due_date": "2020-11-05",
        "createdAt": "2020-10-26T07:49:32.777Z",
        "updatedAt": "2020-10-26T07:49:32.777Z"
      },
      {
        "id": 4,
        "title": "task 4",
        "description": "Add Register and Login",
        "status": "Undone",
        "due_date": "2020-11-10",
        "createdAt": "2020-10-26T10:19:58.124Z",
        "updatedAt": "2020-10-26T10:19:58.124Z"
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
      "id": 1,
      "title": "Rest API",
      "description": "Learn how to make API Documentaion and REST API",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T07:48:57.394Z"
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
  `description=[string]`,
  `category=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
      "id": 2,
      "title": "Fancy task App 2",
      "description": "Protofolio project week 1",
      "status": "Done",
      "due_date": "2020-11-01",
      "createdAt": "2020-10-26T07:48:57.394Z",
      "updatedAt": "2020-10-26T11:24:21.311Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title is required!, Description is required!, Category is required!" }`

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
      "id": 3,
      "title": "task 3",
      "description": "Kerjakan task Jangan Lupa",
      "status": "Done",
      "due_date": "2020-11-05",
      "createdAt": "2020-10-26T07:49:32.777Z",
      "updatedAt": "2020-10-26T11:27:31.187Z"
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

