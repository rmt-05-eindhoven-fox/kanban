**Reigster**
----

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  `{
    email: test@mail,
    password: 12345
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      id : 1,
      email: test@mail.com
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**Login**
----

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  `{
    email: test@mail,
    password: 12345
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NjczODY4fQ.vN_T2bIqgZqlP6_Z2t_NRYzOfNHEUV0K4bAGdr2Cbzc"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**Add Task**
----

* **URL**

  /task

* **Method:**

  `POST`

* **Data Headers**

  `{
    access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NTk1MjM5fQ.5TNKOpmRpTb9XbIVbkCEo2ttbhpRQumvv9usLM5vF1I"
  }`

* **Data Params**

  `{
    tilte: masak,
    CategoryId: 1
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "id": 1,
    "title": "masak nasi",
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2020-11-06T14:49:01.376Z",
    "createdAt": "2020-11-06T14:49:01.376Z"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**FindALL Task**
----

* **URL**

  /task

* **Method:**

  `GET`

* **Data Headers**

  `{
    access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NTk1MjM5fQ.5TNKOpmRpTb9XbIVbkCEo2ttbhpRQumvv9usLM5vF1I"
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "id": 1,
    "title": "masak nasi",
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2020-11-06T14:49:01.376Z",
    "createdAt": "2020-11-06T14:49:01.376Z"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**FindId Task**
----

* **URL**

  /task/:id

* **Method:**

  `POST`

* **Data Headers**

  `{
    access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NTk1MjM5fQ.5TNKOpmRpTb9XbIVbkCEo2ttbhpRQumvv9usLM5vF1I"
  }`

* **Data Params**

  `{
    id : 1
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "id": 1,
    "title": "masak nasi",
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2020-11-06T14:49:01.376Z",
    "createdAt": "2020-11-06T14:49:01.376Z"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

  OR

  * **Code:** 404 Error not found <br />
    **Content:** 
    ```
    { error : "Error not found " }
    ```

==================================================

**Update Task**
----

* **URL**

  /task/:id

* **Method:**

  `POST`

* **Data Headers**

  `{
    access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NTk1MjM5fQ.5TNKOpmRpTb9XbIVbkCEo2ttbhpRQumvv9usLM5vF1I"
  }`

* **Data Params**

  `{
    tilte: masak aer,
    CategoryId: 1
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "id": 1,
    "title": "masak aer",
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2020-11-06T14:49:01.376Z",
    "createdAt": "2020-11-06T14:49:01.376Z"
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================

**Delete Task**
----

* **URL**

  /task/:id

* **Method:**

  `POST`

* **Data Headers**

  `{
    access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NTk1MjM5fQ.5TNKOpmRpTb9XbIVbkCEo2ttbhpRQumvv9usLM5vF1I"
  }`

* **Data Params**

  `{
    id : 1
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      msg : 'Deleted Success'
    }
    ```

* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

==================================================