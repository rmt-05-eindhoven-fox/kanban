**REGISTER USER**
----

* **URL**

  `/register`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email=[string]`,
  `password=[string]`
  
* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `{ "data": "Your e-mail 'adi@mail.com' successfully created" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "email must be unique" }, { "msg": "Please use email format!, Password is required!" }`
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`   


**LOGIN USER**
----

* **URL**

  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `email=[string]`,
  `password=[string]`
  
* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQwODA3NX0.bhstOGROEKfXBAGBD0Wsq_S_grR2BsnbEy-qJ7tnOdQ" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Invalid email/password" }`
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`


**LOGIN GOOGLE USER**
----

* **URL**

  `/googleLogin`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `id_token=[string]`
  
* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQwODA3NX0.bhstOGROEKfXBAGBD0Wsq_S_grR2BsnbEy-qJ7tnOdQ" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "Invalid email/password" }`
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`


**CREATE NEW TASK**
----

* **URL**

  `/tasks`

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `title=[string]`,
  `category=[string]`,
  `UserId=[integer]`

* **Headers Params**

  **Required:**

  `token=[string]` 

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `{ "data": "You have successfully added a task with title : Menulis" }`
    
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "You must login first!" }, { "msg": "Title is required, Please choose category!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`

**GET ALL TASKS**
----

* **URL**

  `/tasks`

* **Method:**

  `GET`

* **Headers Params**

  **Required:**

  `token=[string]` 
  
* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{"data":[{"id":4,"title":"teslagi","category":"going","createdAt":"2020-11-03T16:47:54.203Z","updatedAt":"2020-11-03T16:47:54.203Z","UserId":2,"User":{"id":2,"email":"agung@mail.com","createdAt":"2020-11-03T16:22:17.065Z","updatedAt":"2020-11-03T16:22:17.065Z"}},{"id":2,"title":"tes","category":"going","createdAt":"2020-11-03T16:22:53.424Z","updatedAt":"2020-11-03T16:22:53.424Z","UserId":1,"User":{"id":1,"email":"adi@mail.com","createdAt":"2020-11-03T15:53:55.500Z","updatedAt":"2020-11-03T15:53:55.500Z"}},{"id":1,"title":"tes","category":"going","createdAt":"2020-11-03T16:01:17.145Z","updatedAt":"2020-11-03T16:01:17.145Z","UserId":1,"User":{"id":1,"email":"adi@mail.com","createdAt":"2020-11-03T15:53:55.500Z","updatedAt":"2020-11-03T15:53:55.500Z"}}]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "You must login first!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`


**EDIT TASK**
----

* **URL**

  `/tasks/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  **Required:**

  `title=[string]`,
  `category=[string]`,
  `UserId=[integer]`

* **Headers Params**

  **Required:**

  `token=[string]` 

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{ "data": "Your task successfully updated" }`
    
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "msg": "You must login first!" }, { "msg": "Title is required, Please choose category!" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "msg": "You not allowed to modify/delete this task" }`

  OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "msg": "Task not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`

  
**DELETE TASK**
----

* **URL**

  `/tasks/:id`

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers Params**

  **Required:**

  `token=[string]` 

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{ "data":"Your task successfully deleted" }`
    
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "msg": "You not allowed to modify/delete this task" }`

  OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "msg": "Task not found"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`