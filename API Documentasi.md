# KANBAN

## API DOCUMENTATION


**RESTful ENDPOINT**
---
- `POST /register`

**Show Movie**
---
  Returns json data about User name, email, password.

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
    "id": 9,
    "name": "Kurnia",
    "email": "kurnia@gmail.com",
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


**RESTful ENDPOINT**
---
- `POST /login`

**Show Movie**
---
  Returns json data about Token, name, id.

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
    "name": "Anindita Indah",
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

**RESTful ENDPOINT**
---
- `POST /tasks`

**Show Movie**
---
  Returns json data about id, title, CategoryId, UserId 

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

  title, UserId, CategoryId

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 16,
    "title": "Beli Mainan",
    "UserId": 2,
    "CategoryId": 4,
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

**RESTful ENDPOINT**
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
        "id": 6,
        "title": "Beli Mainan",
        "UserId": 3,
        "CategoryId": 4,
        "createdAt": "2020-11-04T14:35:41.539Z",
        "updatedAt": "2020-11-04T14:35:41.539Z"
    },
    {
        "id": 9,
        "title": "Bergadang ngerjain Porto",
        "UserId": 2,
        "CategoryId": 2,
        "createdAt": "2020-11-06T02:49:06.689Z",
        "updatedAt": "2020-11-06T02:49:06.689Z"
    },
    {
        "id": 10,
        "title": "Pusing Vue",
        "UserId": 4,
        "CategoryId": 1,
        "createdAt": "2020-11-06T02:51:49.254Z",
        "updatedAt": "2020-11-06T02:51:49.254Z"
    },
    {
        "id": 2,
        "title": "Olahraga",
        "UserId": 1,
        "CategoryId": 1,
        "createdAt": "2020-11-04T14:34:29.945Z",
        "updatedAt": "2020-11-06T06:40:30.997Z"
    },
    {
        "id": 3,
        "title": "Masak Ayam Goreng",
        "UserId": 2,
        "CategoryId": 2,
        "createdAt": "2020-11-04T14:34:46.338Z",
        "updatedAt": "2020-11-06T09:40:00.810Z"
    },
    {
        "id": 4,
        "title": "Beresin Rumah",
        "UserId": 2,
        "CategoryId": 4,
        "createdAt": "2020-11-04T14:35:06.164Z",
        "updatedAt": "2020-11-06T09:40:11.054Z"
    },
    {
        "id": 13,
        "title": "akhir nya berhasil",
        "UserId": null,
        "CategoryId": 4,
        "createdAt": "2020-11-06T11:12:03.987Z",
        "updatedAt": "2020-11-06T11:12:03.987Z"
    },
    {
        "id": 15,
        "title": "sign-google",
        "UserId": 8,
        "CategoryId": 2,
        "createdAt": "2020-11-06T15:32:03.099Z",
        "updatedAt": "2020-11-06T15:32:03.099Z"
    },
    {
        "id": 16,
        "title": "Beli Mainan",
        "UserId": 2,
        "CategoryId": 4,
        "createdAt": "2020-11-06T15:43:58.603Z",
        "updatedAt": "2020-11-06T15:43:58.603Z"
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

**RESTful ENDPOINT**
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

  title, CategoryId

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

    **RESTful ENDPOINT**
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