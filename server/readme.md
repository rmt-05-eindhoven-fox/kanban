**Kanban API Documentation**

----
    Returns newly added task. 

* **URL**

    /task

* **Method:**

    `POST`

*  **URL Params**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```md 
    {
      "id": 10,
      "title": "Veemon is testing!",
      "category": "backlog",
      "UserId": 4
    }
    ```
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns array of objects contains all added task by all users. 

* **URL**

    /task

* **Method:**

    `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```md
    [
      {
          "id": 6,
          "title": "This is a test again!",
          "category": "backlog",
          "UserId": 2,
          "createdAt": "2020-11-05T19:15:00.454Z",
          "updatedAt": "2020-11-05T19:15:00.454Z"
      },
      {
          "id": 7,
          "title": "This is a test again from agumon!",
          "category": "backlog",
          "UserId": 1,
          "createdAt": "2020-11-05T19:15:22.668Z",
          "updatedAt": "2020-11-05T19:15:22.668Z"
      },
      {
          "id": 8,
          "title": "Agumon wants to test!",
          "category": "backlog",
          "UserId": 1,
          "createdAt": "2020-11-05T19:16:06.623Z",
          "updatedAt": "2020-11-05T19:16:06.623Z"
      }
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns object contains all its contents updated from request.body based on request.params.id. 

* **URL**

    /task/:id

* **Method:**

    `PUT`

*  **URL Headers**

   **Required:**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
   ```md
    title=[string]
    category=[string]
   ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```md
      {
        "id": 8,
        "title": "Agumon wants to evolve!",
        "category": "on-going",
        "UserId": 1,
        "createdAt": "2020-11-05T19:16:06.623Z",
        "updatedAt": "2020-11-05T19:16:06.623Z"
      }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ error : "Unauthorized Action!" }`

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns object contains newly updated data from request.body based on request.params.id. 

* **URL**

    /task/:id

* **Method:**

    `PATCH`

*  **URL Headers**

   **Required:**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Data Params**

   **Required:**
 
   `category=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ status : "done" }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

----
    Returns message deleted object based on request.params.id. 

* **URL**

    /todos/:id

* **Method:**

    `DELETE`

*  **URL Params**

   **Required:**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message : "Deleted successfully" }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`


***This documentation is written by***
*[RMT-05], Eindhoven-Fox - normnd.akbr*