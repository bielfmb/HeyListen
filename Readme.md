# Hey, Listen! - Reminders List

A *The Legend of Zelda*-styled reminder application inspired by *Breath of the Wild*'s Adventure Log

![System Interface](https://github.com/user-attachments/assets/3a0d62ba-e6a2-42c9-870b-ac528aba63b9)

*This is a fan-made project, not affiliated with Nintendo.*

## About the project

This project was developed as part of a technical test and consists of an *ASP.NET API* and a *React UI* for creating, listing and removing reminders sorted by date.

The theme of the whole system (like its name and interface elements) is a tribute to *The Legend of Zelda* series.

## Tech Stack

**Backend**: C#, ASP.NET, Rest API.

**Frontend**: React, Vite, JavaScript, CSS, Axios.

## Features

- Create, list and remove reminders
- Reminders automatically sorted by date
- Prevents reminders  with empty descriptions or set to the current or a past date to be created
- Responsive interface

## Architecture

The Backend follows an architecture based on **Controllers**, responsible for API Routes; **Services**, with business logic; and **DTOs**, used for data transmission between client and server.

In the Frontend, the application is organized inside the source folder, with **Components**, reusable elements from the interface; **Services**, used for API communication; and **Styles**, for global styles. 

## Possible improvements

- Database persistence
- Update Reminders
- Automated tests

## How to run

### Backend

```
cd link-api
dotnet run
```

### Frontend
```
cd navi-ui
npm install
npm run dev
```

> [!NOTE]  
> You must have [.NET](https://dotnet.microsoft.com/pt-br/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed to run the project correctly.