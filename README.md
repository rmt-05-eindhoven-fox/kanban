



Kanban
Comments0
Add a description...
POST
Register
Comments0
http://localhost:3000/users/register
Add a description...
Bodyurlencoded
email	agungs@mail.com
password	123456
Example RequestRegister
var settings = {
  "url": "http://localhost:3000/users/register",
  "method": "POST",
  "timeout": 0,
  "data": {
    "email": "agungs@mail.com",
    "password": "123456"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
POST
Login
Comments0
http://localhost:3000/users/login
Add a description...
Bodyraw (text)
{
    "email": "aGungs@mail.com",
    "password": "123456"
}
Example RequestLogin
var settings = {
  "url": "http://localhost:3000/users/login",
  "method": "POST",
  "timeout": 0,
  "data": "{\r\n    \"email\": \"aGungs@mail.com\",\r\n    \"password\": \"123456\"\r\n}",
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
POST
Google login
Comments0
http://localhost:3000/users/googleLogin
Add a description...
Headers
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQyMzM5MX0.AJpzBug0aIZUsRyiYHC8wbYNb0ZhR3RmY8Q0DabUNi8
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY
agungs@mail.com

id_token	eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOTJiNjEyZTliNjQ0N2RlYjEwNjg1YmI4ZmZhOGFlNjJmNmFhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE1Mjk0MDUyNDgzODMzMzk0IiwiZW1haWwiOiJhZ3VuZ3dhc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZMZEZaSUZNVWIyS3p2WXJhUi1palEiLCJuYW1lIjoiQWd1bmcgU2V0eWEgUHJhdGFtYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam5od1JObkJ4blpiTW9NVy1rM2Z1RnV3WTRHb05ya3hYdHlXT2pRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJBZ3VuZyIsImZhbWlseV9uYW1lIjoiU2V0eWEgUHJhdGFtYSIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNjA0NDc0NDg5LCJleHAiOjE2MDQ0NzgwODksImp0aSI6ImZjNzAzZmQ2YjVhMTk3MTkzZTk5ZmYzZmZhNzQ0ZTM4NjQ5NmIxMTgifQ.wPL3JeMdm-iFplx8ogzaj0fQYMMuoNmzirn3TbmauN-nLalE7sfOYQSa0aF32-ieih8k-B1bC9oDYCoidCz6NNx6MIpFNAqHLcuK-nxSVfA4-Y19R9BDTppVcJ2uLgU-j59gxPZpOnwXxdW4wXsHmpWp0dH4c3fuIybUkyLvgTQUEecyjES5u1StGEiRY0aualPxo1RyycOfvOm3tHP3N-TIh18BvsUxg8pnhyEL7Koyesb69VA6CH4UgzaQvBdLWEAn_SDKg1r0fXbSumDgG8Ci2dMblFUt0PZafWeZFN8FFaGmBBmSNBXNUtvgVVOttBgEzwdHQEqlRjoa-LeuqQ
Bodyurlencoded
email	agung@mail.com
password	123456
category	doing
Example RequestGoogle login
var settings = {
  "url": "http://localhost:3000/users/googleLogin",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOTJiNjEyZTliNjQ0N2RlYjEwNjg1YmI4ZmZhOGFlNjJmNmFhOTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzkwMjA3MjQxMTgxLTQ4Yjk5amdiZGlzY3BxdGljYmRwb282aHZjZmtjdnZyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE1Mjk0MDUyNDgzODMzMzk0IiwiZW1haWwiOiJhZ3VuZ3dhc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZMZEZaSUZNVWIyS3p2WXJhUi1palEiLCJuYW1lIjoiQWd1bmcgU2V0eWEgUHJhdGFtYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam5od1JObkJ4blpiTW9NVy1rM2Z1RnV3WTRHb05ya3hYdHlXT2pRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJBZ3VuZyIsImZhbWlseV9uYW1lIjoiU2V0eWEgUHJhdGFtYSIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNjA0NDc0NDg5LCJleHAiOjE2MDQ0NzgwODksImp0aSI6ImZjNzAzZmQ2YjVhMTk3MTkzZTk5ZmYzZmZhNzQ0ZTM4NjQ5NmIxMTgifQ.wPL3JeMdm-iFplx8ogzaj0fQYMMuoNmzirn3TbmauN-nLalE7sfOYQSa0aF32-ieih8k-B1bC9oDYCoidCz6NNx6MIpFNAqHLcuK-nxSVfA4-Y19R9BDTppVcJ2uLgU-j59gxPZpOnwXxdW4wXsHmpWp0dH4c3fuIybUkyLvgTQUEecyjES5u1StGEiRY0aualPxo1RyycOfvOm3tHP3N-TIh18BvsUxg8pnhyEL7Koyesb69VA6CH4UgzaQvBdLWEAn_SDKg1r0fXbSumDgG8Ci2dMblFUt0PZafWeZFN8FFaGmBBmSNBXNUtvgVVOttBgEzwdHQEqlRjoa-LeuqQ"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
GET
Task
Comments0
http://localhost:3000/tasks
Add a description...
Headers
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQyMzM5MX0.AJpzBug0aIZUsRyiYHC8wbYNb0ZhR3RmY8Q0DabUNi8
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY
agungs@mail.com

access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZ3VuZ3dhc0BnbWFpbC5jb20iLCJpYXQiOjE2MDQ0NzUxMTF9.ejvxZw7MH3T5stFP3Lyla17-NKoOlDFS3Na3SYxc-Ws
agungwwas@gmail.com

Bodyurlencoded
email	agung@mail.com
password	123456
Example RequestTask
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

$.ajax(settings).done(function (response) {
  console.log(response);
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
POST
Task user create
Comments0
http://localhost:3000/tasks
Add a description...
Headers
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQyMzM5MX0.AJpzBug0aIZUsRyiYHC8wbYNb0ZhR3RmY8Q0DabUNi8
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY
agungs@mail.com

Bodyurlencoded
email	agung@mail.com
password	123456
Example RequestTask user create
var settings = {
  "url": "http://localhost:3000/tasks",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY"
  },
  "data": {
    "email": "agung@mail.com",
    "password": "123456"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
DELETE
Task user delete
Comments0
http://localhost:3000/tasks/5
Add a description...
Headers
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQyMzM5MX0.AJpzBug0aIZUsRyiYHC8wbYNb0ZhR3RmY8Q0DabUNi8
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY
agungs@mail.com

Bodyurlencoded
email	agung@mail.com
password	123456
Example RequestTask user delete
var settings = {
  "url": "http://localhost:3000/tasks/5",
  "method": "DELETE",
  "timeout": 0,
  "headers": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
Example Response
BodyHeaders (0)
No response body
This request doesn't return a response body.
PATCH
Task user delete Copy
Comments0
http://localhost:3000/tasks/1
Add a description...
Headers
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZ3VuZ0BtYWlsLmNvbSIsImlhdCI6MTYwNDQyMzM5MX0.AJpzBug0aIZUsRyiYHC8wbYNb0ZhR3RmY8Q0DabUNi8
access_token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ3NAbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjU0Njl9.qz2VGbmpHogVT5cbtkjoEmC0YLtgDSqzMCPVGEHu7uY
agungs@mail.com

Bodyurlencoded
email	agung@mail.com
password	123456
category	doing