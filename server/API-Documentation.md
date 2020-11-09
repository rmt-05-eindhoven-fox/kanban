# Kanban
------------------
**Add task**

  `Create a new task`

* **URL**

  `/tasks`

* **Method:**

  `POST`

* **URL Params**

	none

* **Data Headers**

	access_token

* **Data Params**

  `
		{
			"title": "new task",
			"description": "task description",
		}
	`

* **Success Response:**

  * **Code:** 201 CREATED
    **Content:**
		```json
		[
	  	{
				"title": "new task",
				"description": "task description",
	 		}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


------------------
**Show All tasks**

  `Return json data about all task list`

* **URL**

  `/tasks`

* **Method:**

  `GET`   

* **URL Params**
	
	none

* **Data Headers**

	access_token

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	  ```json
	  [
			{
				"id": 1,
				"title": "task1",
				"description": "task1 description"
			},
			{
				"id": 2,
				"title": "task2",
				"description": "task2 description",
			}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


------------------
**Assign Task**

  `assign task to user`

* **URL**

  `/tasks/:id`

* **Method:**

  `PUT`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Params**

  `
		{
			"UserId": 1
	 	}
	`

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	```json
	 	[
			{
				"id": 1,
				"title": "task task urgent",
				"description": "task description",
				"UserId": 1
			}
		]
		```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


------------------
**Delete One task**

  `Delete specific task based on id`

* **URL**

  `/tasks/:id`

* **Method:**

  `DELETE`   

* **URL Params**
	
	**Required:**

	`id=[integer]`

* **Data Headers**

	access_token

* **Data Params**

  none

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
	 	
		 Delete Success
 
* **Error Response:**
  * **Code:** 404 NOT FOUND
    **Content:** `{ error : "Data not found" }`

	OR

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


------------------
**Add User**

  `Create a new user`

* **URL**

  `/users/register`

* **Method:**

  `POST`

* **URL Params**

	none

* **Data Params**

  `
		{
			"username": "daus",
			"email": "daus@mail.com,
			"password": "12345"
		}
	`

* **Success Response:**

  * **Code:** 201 CREATED
    **Content:**
		```json
		[
	  	{
				"username": "daus",
				"email": "daus@mail.com",
				"password": "12345"
			}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


------------------
**Login User**

  `Login User`

* **URL**

  `/users/login`

* **Method:**

  `POST`

* **URL Params**

	none

* **Data Params**

  `
		{
			"email": "daus@mail.com,
			"password": "12345"
		}
	`

* **Success Response:**

  * **Code:** 200 OK
    **Content:**
		```json
		[
	  	{
				"access_token": "h9f0adc98wv.wjme897vvhq7v23b782qb3"
			}
		]
		```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `{ error : "Internal Server Error." }`


