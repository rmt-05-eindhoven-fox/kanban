
**CREATE TASKS**
----
    create new tasks

* **URL**

    /tasks

* **Method:**
  
    `POST`
    
*  **URL Params**

    not needed

* **Data Params**

    `title=[string]`,
    `description=[string]`,
    `category=[string]`,
    `UserId=[integer]`

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari pagi",
        "description" : "Di sabuga jam 9",
        "category" : "Done",
        "UserId": 1,
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z",
        
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Title is required",
        "Category is required"
        ] 
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET TASKS**
----
    Get all tasks

* **URL**

    /tasks

* **Method:**
  
    `GET`

*  **URL Params**

    not needed

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{
        "taskList": [
            {
                "id": 2,
                "title": "es2 22 2t",
                "description": "jadi",
                "category": "Backlog",
                "UserId": 2,
                "createdAt": "2020-11-03T12:33:22.543Z",
                "updatedAt": "2020-11-03T12:45:57.689Z",
                "User": {
                    "id": 2,
                    "email": "rafi@gmail.com",
                    "password": "$2a$10$HFJ3nKtBa2noAlxjQTCf3OwZT8F7PT4gr00Roh5Uue60Z1rM8neQq",
                    "createdAt": "2020-11-03T12:08:09.973Z",
                    "updatedAt": "2020-11-03T12:08:09.973Z"
                }
            },
            {
                "id": 3,
                "title": "dar",
                "description": "udinnnnnnnn",
                "category": "TDone",
                "UserId": 3,
                "createdAt": "2020-11-03T12:34:39.683Z",
                "updatedAt": "2020-11-03T12:34:39.683Z",
                "User": {
                    "id": 3,
                    "email": "udin@gmail.com",
                    "password": "$2a$10$Nv9pyOsMr90qtAbr.2/equy9kRAqusD3RFwhH0eUhOVx57Gkwddd6",
                    "createdAt": "2020-11-03T12:33:31.127Z",
                    "updatedAt": "2020-11-03T12:33:31.127Z"
                }
            }
        ],
        "loggedInUser": "rafi@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET TASK**
----
    Get one task

* **URL**

    /tasks/:id

* **Method:**
  
    `GET`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    { 
        "id" : 2,
        "title" : "Lari sore",
        "description" : "Di saparua jam 9",
        "category" : "Todo",
        "UserId": 2,
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`


**UPDATE task**
----
    Update specific task

* **URL**

    /tasks/:id

* **Method:**
  
    `PUT`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    `title=[string]`,
    `description=[string]`,
    `category=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    { 
        "id" : 1,
        "title" : "Lari sore",
        "category" : "Backlog",
        "UserId" : "1",
        "due_date" : "2020-10-28T03:26:43.971Z"
        "createdAt" : "2020-10-26T03:26:43.971Z"
        "updatedAt" : "2020-10-26T03:26:43.971Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Title is required",
        "Category is required"
        ] 
    }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`



**DELETE task**
----
    delete one task 

* **URL**

    /tasks/:id

* **Method:**
  
    `DELETE`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: 'task success to delete' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**REGISTER**
----
    register user

* **URL**

    /register

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    `{
    "id": 14,
    "email": "suma@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : ['Please use email format', 'Email is required', 'Password is required', 'Password minimal 5 characters'] }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**LOGIN**
----
    login user

* **URL**

    /login

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZWRlQGdtYWlsLmNvbSIsImlhdCI6MTYwMzgwOTA3MH0.ZOvOmP8v4sPgbE5sAxM2jeNPNPi9hr-UTllXyYaPw9A`
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ error : 'Wrong email/password' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**LOGIN GOOGLE**
----
    login user google

* **URL**

    /googleLogin

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZWRlQGdtYWlsLmNvbSIsImlhdCI6MTYwMzgwOTA3MH0.ZOvOmP8v4sPgbE5sAxM2jeNPNPi9hr-UTllXyYaPw9A`
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ error : 'Wrong email/password' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`