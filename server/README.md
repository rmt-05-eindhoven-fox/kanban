### API ###

List of available endpoints:
* POST   /register
* POST   /login
* GET    /tasks
* GET    /taks/:id
* POST   /tasks/
* PUT    /tasks/:id
* PATCH  /tasks/:id
* DELETE /tasks/:id

----
**REGISTER**
----
  Register into the web app

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        email: "string",
        password: "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {     
    "id": 11,
    "email": "adlyms@gmail.com",
    "msg": "register success"
    }
    ```

  * **Error Response:** 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
  { 
      "error": "Email is required, Should be in email format, Password is required, Password minimum length is 6 characters"

  }
    ```
  OR
    ```javascript
  {
      "error": "User.email cannot be null, User.password cannot be null"
  }
    ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----

**TASKS**
----
 Get all TASKS

* **URL**

  /tasks

* **Method:**

  `GET`

* **Data Headers**
    ```javascript
    {
        access_token: "string",
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJmYXV6YW5AZ21haWwuY29tIiwiaWF0IjoxNjA0MjE0MDkxfQ.n8P4_eh95A3a-BZ_lFXcMUetTIyCQWrqmVeYgIy8NGU"
    }
    ```

    * **Code:**  400 Bad Request <br />
    **Content:** 
    ```javascript
  { 
         "error": "Authentication failed"

  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----


**GET TASK BY ID**
----
  Get Task By Id

* **URL**

  /task/id

* **Method:**

  `GET`

* **Data Headers**
    ```javascript
    {
        access_token: "string"
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
     "id": 1,
    "title": "menambahkan fitur di halaman utama",
    "UserId": 1,
    "CategoryId": 1,
    "description": "deadline nya besok",
    "createdAt": "2020-11-05T20:18:07.825Z",
    "updatedAt": "2020-11-05T20:18:07.825Z"
    }
    ```

    * **Code:**  400 BadRequest <br />
    **Content:** 
    ```javascript
  { 
        "error": "Authentication failed"
  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----
  


**POST TASKS BY ID**
----
  Post Tasks By Id

* **URL**

  /tasks/id

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        access_token: "string"
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **HEADERS:** 
    ```javascript
    {
     "id": 2,
    "title": "menambahkan fitur di halaman utama",
    "UserId": 1,
    "CategoryId": 1,
    "description": "deadline nya besok",
    "createdAt": "2020-11-05T20:18:07.825Z",
    "updatedAt": "2020-11-05T20:18:07.825Z"
    }
    ```



    * **Code:**  400 BadRequest <br />
    **Content:** 
    ```javascript
  { 
    "error": "title is required"
  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----

### URL ###


**PUT TASKS BY ID**
----
  Put Tasks By Id

* **URL**

  /tasks/id

* **Method:**

  `PUT`

* **Data Params**
    ```javascript
    {
        access_token: "string"
    }
    ```
* **DATA BODY**
    **BODY:** 
    ```javascript
    {
    "title": "menambahkan fitur di halaman utama",
    "description" : "deadline nya besok"
    "CategoryId": 1,
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
  [
    1
  ]

    * **Code:**  400 BadRequest <br />
    **Content:** 
    ```javascript
  { 
    "error": "title is required"
  }
    ```
    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----




* **Method:**

  `DELETE`

* **Data HEADERS**
    ```javascript
    {
        access_token: "string"
    }
   
* **Data PARAMS**
  2
   
* **Success Response:**

  * **Code:** 200 <br />
  {
    "msg": "task success to delete"
  }

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----



* **Method:**

  `PATCH`

* **Data HEADERS**
    ```javascript
    {
        access_token: "string"
    }
   
* **Data PARAMS**
  3
   
* **Data BODY**
  
* **Success Response:**
    "CategoryId" : 3
  * **Code:** 200 <br />
  {
    "msg": "task success to delete"
  }

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
     ```
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        msg : "internal server error"
    }
    ```
----