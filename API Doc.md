# KANBAN

## API DOCUMENTATION


** Register Method**

---
- `POST /register`

**Show Movie**
---
  Returns json data email, password.

* **URL**

  `/register`

* **Method:**

  `post`

* **Header:**

  None
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  name, email, password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "email": "farisarma@mail.com",
    "password": "$2a$10$b4qwgO7XWoHd7s.PjawUq.tBCozeMcG8jQC0RU2Ev5bFX4J0ZbfRq",
    "updatedAt": "2020-11-06T15:36:58.682Z",
    "createdAt": "2020-11-06T15:36:58.682Z"
}
    
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


** Login Method**

---
- `POST /login`

**Show Movie**
---
  Returns json data Token, id.

* **URL**

  `/login`

* **Method:**

  `post`

* **Header:**

  None
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  email, password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbmluZGl0YWluZGFoQHlhaG9vLmNvbSIsImlhdCI6MTYwNDY3NzEyNn0.eXjD-BsU8Zb4yozV31I076zdrY7xsQGRo4jN_Utes40",
    "id": 2
}
    
    ```
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

** Add Data Method**

---
- `POST /tasks`

**Show Movie**
---
  Returns json data about id, title, Category, UserId 

* **URL**

  `/tasks`

* **Method:**

  `post`

* **Header:**

 required
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  title, UserId, Category

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 16,
    "title": "Beli susu",
    "UserId": 2,
    "Category": "Done",
    "updatedAt": "2020-11-06T15:43:58.603Z",
    "createdAt": "2020-11-06T15:43:58.603Z"
}
    
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

** Show Data Method**

---
- `GET /tasks`

**Show Movie**
---
  Returns json data about all tasks 

* **URL**

  `/tasks`

* **Method:**

  `GET`
* **Header:**

 required
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "id": 5,
        "title": "Beli susu",
        "UserId": 3,
        "Category": "development",
        "createdAt": "2020-11-04T14:35:41.539Z",
        "updatedAt": "2020-11-04T14:35:41.539Z"
    },
    {
        "id": 4,
        "title": "Bergadang",
        "UserId": 2,
        "Category": "done",
        "createdAt": "2020-11-06T02:49:06.689Z",
        "updatedAt": "2020-11-06T02:49:06.689Z"
    },
    {
        "id": 3,
        "title": "Pusing Vue",
        "UserId": 4,
        "Category": "product",
        "createdAt": "2020-11-06T02:51:49.254Z",
        "updatedAt": "2020-11-06T02:51:49.254Z"
    },
    {
        "id": 2,
        "title": "tidur",
        "UserId": 1,
        "Category": "development",
        "createdAt": "2020-11-04T14:34:29.945Z",
        "updatedAt": "2020-11-06T06:40:30.997Z"
    }
]
    
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

** Edit Method**

---
- `PUT /tasks/:id`

**Show Movie**
---
  Returns json number 

* **URL**

  `/tasks/:id`

* **Method:**

  `PUT`

* **Header:**

 required
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  title, category

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      1
    ]
    
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```
** Delete Method**
---
- `delete /tasks/:id`

**Show Movie**
---
  Returns json number 

* **URL**

  `/tasks/:id`

* **Method:**

  `delete`

* **Header:**

 required
  
*  **URL Params**

   **Required:**
 
  none

* **Data Params**

  id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      1
    ]
    
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```