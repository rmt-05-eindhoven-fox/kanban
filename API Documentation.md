**Title**
----
  Fancy TODO List

* **URL**

  /tasks

* **Method:**

  `POST`

* **Data Params**

        ```
        {
            "title" : "Learn REST API",
            "description" : "Learn how to create  RESTful API with Express and Sequelize",
            "category" : "backlog"
        }
        ```

* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
            "id" : "1",
            "title" : "Learn REST API",
            "description" : "Learn how to create  RESTful API with Express and Sequelize",
            "category" : "backlog"
        }
    ```
 
* **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />

    OR

   * **Code:** 400 BAD REQUEST <br />


<hr>


* **URL**

  /tasks

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
    {
        "id": 2,
        "title": "Add Validation",
        "category": "done",
        "description": "add password length validation",
        "UserId": 1,
        "createdAt": "2020-11-04T13:53:41.064Z",
        "updatedAt": "2020-11-04T13:53:41.064Z",
        "User": {
            "id": 1,
            "email": "mansur@yahoo.ac",
            "password": "$2a$10$qzMelEKt8iXodvkKcnUlG.1xYfq4Ugc/PRRPu8lzf6fRkdzgMOUMa",
            "createdAt": "2020-11-03T16:27:40.041Z",
            "updatedAt": "2020-11-03T16:27:40.041Z"
        }
    },
    {
        "id": 3,
        "title": "Add Authorization",
        "category": "done",
        "description": "add password length validation",
        "UserId": 1,
        "createdAt": "2020-11-04T13:53:41.064Z",
        "updatedAt": "2020-11-04T13:53:41.064Z",
        "User": {
            "id": 1,
            "email": "mansur@yahoo.ac",
            "password": "$2a$10$qzMelEKt8iXodvkKcnUlG.1xYfq4Ugc/PRRPu8lzf6fRkdzgMOUMa",
            "createdAt": "2020-11-03T16:27:40.041Z",
            "updatedAt": "2020-11-03T16:27:40.041Z"
        }
    }
    ```

* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`


<hr>


* **URL**

  /tasks/:id

* **Method:**

  `PUT`
  
* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Data Params**
    ```
    {
        "title" : "Learn Vue",
        "description" : "Learn how to create  RESTful API with Express and Sequelize",
        "category" : "done"
    }
    ```

* **Success Response:**
  
  * **Code:** 200 <br />
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`


<hr>


* **URL**

  /tasks/:id

* **Method:**
  

  `PATCH`
  
* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Data Params**

  `{ status : Done }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "category" : "backlog"
    }
    ```
 
* **Error Response:**

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Validation error" }`

    OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`
  
* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'task success to delete' }`
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

* **URL**

  /register

* **Method:**

  `POST`


* **Data Params**

  ```
    {
      "username": "mansur",
      "email": "mansur@yahoo.ac",
      "password": "alhamdulilah"
    }
  ```


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 10,
      "username": "mansur",
      "email": "mansur@yahoo.ac"
    }
    ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

<hr>

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  ```
    {
      "email": "mansur@yahoo.ac",
      "password": "alhamdulilah"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJyYW1hQHlhaG9vLmNvbSIsImlhdCI6MTYwNDIxNDg5OX0.882lz20jN4ZZNydcgnsqLxglv1xB1yfEH0QW9h2L4aM"
    }
    ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

<hr>

* **URL**

  /googleLogin

* **Method:**

  `POST`

* **Data Params**

  ```
    {
      "google_access_token": <INPUT GOOGLE ID TOKEN>
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJyYW1hQHlhaG9vLmNvbSIsImlhdCI6MTYwNDIxNDg5OX0.882lz20jN4ZZNydcgnsqLxglv1xB1yfEH0QW9h2L4aM"
    }
    ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`



