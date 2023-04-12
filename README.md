# GymPass API 🏋️‍♀️

This project is a **Node.js REST API for gym check-ins**, using authentication, calculating the user's distance to the gym using latitude and longitude values, and using **SOLID** principles and some **Design Patterns**. The project was developed on the Ignite Node.js trail - [**Rocketseat**](https://github.com/rocketseat-education) programming specialization bootcamp. The entire application was developed based on the **functional requirements**, **business rules** and **non-functional requirements** listed below.

## Functional requirements

- It should be able to user register
- It should be able to user authenticate
- It should be able to get a user profile
- It should be able to get a total count of check-ins of user
- It should be able to get a history check-ins of user
- It should be able to list nearby gyms of user (10Km)
- It should be able to search gyms by name
- It should be able to check in at a gym
- It should be able to validate check-in of user
- It should be able to create a gym

## Business rules

- The user will not be able to register with duplicate e-mail
- The user not be able to check in twice in the same day
- The user not be able to check in if is not close of gym (100m)
- The check-in can only be validate until 20 minutes after created
- The check-in can only be validate by the administrators
- The gym can only be created by the administrators

## Non-functional requirements

- User password needs to be encrypted
- Application data needs to be persisted to a PostgreSQL database
- All data lists need to be paginated with 20 items per page
- The user should be indentified by a JWT (JSON Web Token)

## More about the project 👀

### Description

This project is based on subscription apps, where the user can attend gyms that participate in the app. Therefore, the user can choose the gym he wants to attend and check in there, so, when arriving at the gym, the check-in can be validated by the gym itself.

### The basis of the project

This project was organized in a layered structure, starting with the HTTP layer (routes and controllers), then the use cases layer (features) and later the data persistence layer. In addition, the **SOLID Dependency Inversion principle** was used in conjunction with the **Repository Pattern**, to reduce coupling and gain flexibility, in addition to the **Factory Pattern**, which also helped in the abstraction of objects.

### HTTP layer

For the HTTP layer, **Fastify** was used, creating all the application routes, also using the plugins feature that Fastify offers. In addition, the **Zod** library was used to validate and transform the input data for each route. It was also possible to create a global error handling, provided by Fastify itself.

### Database

The database used was **PostgreSQL** together with **Prisma ORM**, which facilitated integration with the database and migration management, in addition to integrating perfectly with **TypeScript**. In addition, **Docker** was used to manage a PostgreSQL container with the **Docker Compose** tool.

### Tests

In this application, **unit tests** and **end-to-end** tests were implemented using the **Vitest** library. For the unit tests, the **InMemoryTestDatabase Pattern** was used, which simulates a database, but only in memory, thus making it possible to focus only on testing the functionality itself, and also the mock functionality of Vitest was used to manipulate the values ​​of test dates. In the end-to-end tests, a **Test Environment** was created through Vitest, to create a database for each group of tests, allowing to have a clean context to execute the tests. In addition, for the end-to-end tests, **SuperTest** was used, which made it possible to make requests for each route of the application.

Finally, the **TDD (Test Driven Development)** methodology was used in some use cases, mainly for those with more complex business rules.

### Refresh Token & RBAC

The authentication technique used was **JWT (JSON Web Token)**. To keep the user logged in for a longer time in the application, but still be safe. The refresh token technique is also used, that is, a second token is generated at the time of authentication, precisely to allow the request of a new token for a specific route, so that when the access token expires it can be regenerated, without the need for the user to authenticate again.

In addition, the **RBAC (Role Based Access Control)** concept allowed the creation of restrictions in some application routes in a more simplified way, making only administrator users able to access certain resources.

### CI (Continuous Integration)

Finally, a **CI workflow** was implemented using **GitHub Actions**, to run unit tests every time a push occurs on the main branch, and also to run end-to-end tests every time a pull request occurs in the repository.

## Tools and technologies 🧰

- Node.js
- TypeScript
- Fastify
- Zod
- Prisma ORM
- PostgreSQL
- Docker
- Vitest
- SuperTest
- TSUP
- TSX
- ESLint

## Concepts, Methodologies and Design Patterns 🗃

- SOLID (Dependency Inversion Principle)
- Repository Pattern
- Factory Pattern
- TDD
- InMemoryTestDatabase

##

**#NeverStopLearning 🚀**