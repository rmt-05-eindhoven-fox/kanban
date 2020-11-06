**Kanban**
----

* **URL**

  <`/users/register`>

* **Method:**
  
  `POST`

* **Data Params**

  `{
    "email": "agungs@mail.com",
    "password": "123456"
  }`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ 
        email: agung@gmail.com,
        id: 12
    }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{
      "msg": "Password must be more than 6 character"
    }`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{
    "msg": "Not valid email"
    }`

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/users/register",
  "method": "POST",
  "timeout": 0,
  "data": {
    "email": "agungs@mail.com",
    "password": "123456"
  }
};


* **URL**

  <`/users/login`>

* **Method:**
  
  `POST`

* **Data Params**

  `{
    "email": "agungs@mail.com",
    "password": "123456"
  }`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ2Nzk3OTJ9.0C52Me8A4b9j0ooLoGOckqtDB17XMQptPbktxUe5MU4"
  }`
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{
    "msg": "Username/Password error"
    }`

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/users/login",
  "method": "POST",
  "timeout": 0,
  "data": {
    "email": "agungs@mail.com",
    "password": "123456"
  }
};


* **URL**

  <`/users/googleLogin`>

* **Method:**
  
  `POST`

* **Data Params**

  `{
    "id_token": string
  }`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ2Nzk3OTJ9.0C52Me8A4b9j0ooLoGOckqtDB17XMQptPbktxUe5MU4"
  }`
 

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/users/googleLogin",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOTJiNjEyZTliNjQ0N2RlYjEwNjg1YmI4ZmZhOGFlNjJmNmFhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE1Mjk0MDUyNDgzODMzMzk0IiwiZW1haWwiOiJhZ3VuZ3dhc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZMZEZaSUZNVWIyS3p2WXJhUi1palEiLCJuYW1lIjoiQWd1bmcgU2V0eWEgUHJhdGFtYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam5od1JObkJ4blpiTW9NVy1rM2Z1RnV3WTRHb05ya3hYdHlXT2pRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJBZ3VuZyIsImZhbWlseV9uYW1lIjoiU2V0eWEgUHJhdGFtYSIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNjA0NDc0NDg5LCJleHAiOjE2MDQ0NzgwODksImp0aSI6ImZjNzAzZmQ2YjVhMTk3MTkzZTk5ZmYzZmZhNzQ0ZTM4NjQ5NmIxMTgifQ.wPL3JeMdm-iFplx8ogzaj0fQYMMuoNmzirn3TbmauN-nLalE7sfOYQSa0aF32-ieih8k-B1bC9oDYCoidCz6NNx6MIpFNAqHLcuK-nxSVfA4-Y19R9BDTppVcJ2uLgU-j59gxPZpOnwXxdW4wXsHmpWp0dH4c3fuIybUkyLvgTQUEecyjES5u1StGEiRY0aualPxo1RyycOfvOm3tHP3N-TIh18BvsUxg8pnhyEL7Koyesb69VA6CH4UgzaQvBdLWEAn_SDKg1r0fXbSumDgG8Ci2dMblFUt0PZafWeZFN8FFaGmBBmSNBXNUtvgVVOttBgEzwdHQEqlRjoa-LeuqQ"
  },
};


* **URL**

  <`/tasks`>

* **Method:**
  
  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 5,
        "title": "make apps",
        "category": "5",
        "UserId": 7,
        "createdAt": "2020-11-04T06:50:42.842Z",
        "updatedAt": "2020-11-04T06:50:42.842Z",
        "User": {
            "id": 7,
            "email": "agungwas@gmail.com",
            "password": "$2a$10$h8HL2vnIjUAJcuK48GbAYutqwq5VLCl2ZkqoYLTJ/v0aU6AdhSym.",
            "createdAt": "2020-11-04T07:30:13.110Z",
            "updatedAt": "2020-11-04T07:30:13.110Z"
        }
    },
    {
        "id": 2,
        "title": "make apps",
        "category": "6",
        "UserId": 7,
        "createdAt": "2020-11-04T06:50:42.842Z",
        "updatedAt": "2020-11-04T06:50:42.842Z",
        "User": {
            "id": 7,
            "email": "agungwas@gmail.com",
            "password": "$2a$10$h8HL2vnIjUAJcuK48GbAYutqwq5VLCl2ZkqoYLTJ/v0aU6AdhSym.",
            "createdAt": "2020-11-04T07:30:13.110Z",
            "updatedAt": "2020-11-04T07:30:13.110Z"
        }
    }
]`
 

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/tasks",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZ3VuZ3dhc0BnbWFpbC5jb20iLCJpYXQiOjE2MDQ0NzUxMTF9.ejvxZw7MH3T5stFP3Lyla17-NKoOlDFS3Na3SYxc-Ws"
  },
  "data": {
    "email": "agung@mail.com",
    "password": "123456"
  }
};


* **URL**

  <`/tasks/`>

* **Method:**
  
  <_The request type_>

  `POST`
  
* **Data Params**

  "data": {
    "email": "agung@mail.com",
    "password": "123456"
  }

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `{
    "msg": "Success add new kanban"
}`
 
* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/tasks",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY"
  },
  "data": {
    "title": "string",
    "category": "string"
  }
};

* **URL**

  `/tasks/:id`

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `{
    "msg": "success delete"
}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "msg": "User not authorized"
  }`

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/tasks/5",
  "method": "DELETE",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY"
  },
};

* **URL**

  `/tasks/:id`

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `"data": {
    "title": "string",
    "description": "string"
  }`

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `[ 1 ]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "msg": "User not authorized"
  }`

* **Sample Call:**

var settings = {
  "url": "http://localhost:3000/tasks",
  "method": "PATCH",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY"
  },
  "data": {
    "title": "string",
    "category": "string"
  }
};