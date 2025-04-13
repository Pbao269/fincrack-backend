<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# FinCrackBackend

Backend for the FinCrack application built with NestJS, Prisma, and MongoDB.

## Project Setup

### Prerequisites
- Node.js (v18.x or later)
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Install dependencies
$ npm install
```

### Database Setup

1. Create a MongoDB database (locally or on MongoDB Atlas)
2. Set up your environment variables:
   - Create a `.env` file in the root directory (use `.env.example` as a template)
   - Add your MongoDB connection string:
   ```
   DATABASE_URL="mongodb://username:password@localhost:27017/fincrack?authSource=admin"
   ```
   - Add your JWT secret:
   ```
   JWT_SECRET="your-jwt-secret"
   ```

3. Generate Prisma client:
```bash
$ npx prisma generate
```

4. Push the schema to your database:
```bash
$ npx prisma db push
```

### Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

### API Endpoints

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login
- `GET /users/me` - Get current user info (Protected)
- `POST /banks/recommendation` - Get personalized bank recommendation (Protected)

### Bank Recommendation Endpoint

The `/banks/recommendation` endpoint accepts a POST request with the following parameters:

```json
{
  "Digital Interface Rank": 4,             // Integer 1-5
  "Number of Branches": 3,                 // Integer value
  "Green Initiatives Rank": 5,             // Integer 1-5
  "Fee Level Rank": 2,                     // Integer 1-5
  "International Support Rank": 4,         // Integer 1-5
  "Interest Rate Range Rank": 3,           // Integer 1-5
  "Customer Service Quality Rank": 5,      // Integer 1-5
  "Capital Adequacy Rank": 4,              // Integer 1-5
  "Auto Loans": true,                      // Boolean
  "Credit Cards": true,                    // Boolean
  "Global Banking": false,                 // Boolean
  "Investments": true,                     // Boolean
  "Loans": true,                           // Boolean
  "Mortgages": false,                      // Boolean
  "Savings Accounts": true,                // Boolean
  "Global Customers": false,               // Boolean
  "Professionals": true,                   // Boolean
  "SMEs": false,                           // Boolean
  "Seniors": false,                        // Boolean
  "Students": true,                        // Boolean
  "Tech-Savvy": true                       // Boolean
}
```

The endpoint returns:
```json
{
  "recommended_bank": "Bank Name",        // String
  "description": "Description of the bank...",  // String
  "website": "https://bank-website.com"   // String URL
}
```

## Project Structure

```
fincrackbackend/
├── src/                     # Source code
│   ├── auth/                # Authentication module
│   ├── prisma/              # Prisma service and module
│   ├── user/                # User module
│   ├── banks/               # Banks module with recommendation functionality
│   ├── common/              # Shared utilities, base classes, and interceptors
│   ├── app.module.ts        # Main application module
│   └── main.ts              # Application entry point
├── prisma/                  # Prisma schema
│   └── schema.prisma        # Database schema definition
├── .env                     # Environment variables (not in git)
└── package.json             # Project dependencies
```

## Common Issues

- If you encounter `Cannot find module './prisma/prisma.module'` error, it may be related to the build process. Try cleaning the dist directory with `rm -rf dist` and rebuilding.
- If `PrismaClient` is not found, make sure you've run `npx prisma generate` to create the generated client.
- Note the nested directory structure: there's a `fincrackbackend` directory inside the main `fincrackbackend` directory. When running commands, make sure you're in the correct directory.

## License

This project is licensed under the MIT License.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
