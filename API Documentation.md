# KANBAN APP #

1. **USER REGISTER**

    * **URL**

      `/register`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `email = [string]`
      - `password = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "id": 5,
          "email": "rizky@hacktiv.vue"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Email Can't Be Empty!",
          "Only Allow Email!",
          "Password Can't Be Empty!",
          "Password Can't Be Less Than 7 Character!"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [ 
          "Internal Server Error" 
        ]
        ```



2. **LOGIN USER**

    * **URL**

      `/login`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `email = [string]`
      - `password = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJyaXpreUBoYWNrdGl2LnZ1ZSIsImlhdCI6MTYwNDY1Nzc0M30.K8yjX-gRAqsK-JLMm5WRhuWNiJO8C_SUMpA5qVFNEsg",
          "email": "rizky@hacktiv.vue"
        }
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "wrong email/password"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHOTIZED` <br />
        **Content:** 
        ```json
        [
          "wrong email/password"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
         "Internal Server Error"
        ]
        ```


3. **CREATE TASK**

    * **URL**

      `/kanban`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `title = [string]`
      - `description = [string]`
      - `category = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "id": 6,
          "title": "asd",
          "description": "dsa",
          "category": "Done",
          "UserEmail": "asd@asd.asd",
          "updatedAt": "2020-11-06T10:21:14.858Z",
          "createdAt": "2020-11-06T10:21:14.858Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Title Can't Be Empty!",
          "Description Can't Be Empty!",
          "Category Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

4. **LIST TASK**

    * **URL**

      `/kanban`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        [
          {
            "id": 1,
            "title": "dsa",
            "description": "nyoba edit",
            "category": "Done",
            "UserEmail": "asd@asd.asd",
            "createdAt": "2020-11-06T05:00:23.510Z",
            "updatedAt": "2020-11-06T05:04:28.276Z"
          },
          {
            "id": 3,
            "title": "asd",
            "description": "dsa",
            "category": "Backlog",
            "UserEmail": "rizkyodit@gmail.com",
            "createdAt": "2020-11-06T09:09:24.456Z",
            "updatedAt": "2020-11-06T09:09:24.456Z"
          }
        ]
        ```
    
    * **Error Response:**

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

5. **UPDATE TODOS**

    * **URL**

      `/kanban/:id`

    * **Method:**

      `PUT`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Data Params**

        **Required:**

        - `title = [string]`
        - `description = [string]`
        - `category = [string]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        {
          "id": 1,
          "title": "dsa",
          "description": "nyoba edit",
          "category": "Done",
          "UserEmail": "asd@asd.asd",
          "createdAt": "2020-11-06T05:00:23.510Z",
          "updatedAt": "2020-11-06T10:32:00.972Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Title Can't Be Empty!",
          "Description Can't Be Empty!",
          "Category Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Kanban Not Found"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error" 
        ]
        ```

6. **DELETE TASK**

    * **URL**

      `/kanban/:id`

    * **Method:**

      `DELETE`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        "Kanban Deleted Successfully"
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Not Authorized"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Kanban Not Found"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```
