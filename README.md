# Simple GraphQL Auth Directive

A simple example of how you might use an authorization directive in GraphQL. This is NOT a production ready-library.

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Installation

This package is not published npm. It is only available as a direct install from GitHub.

```bash
npm i github:apollosolutions/simple-auth-directive
```

## Usage

Define the directive called `@auth` with the following roles in your GraphQL typedefs.

```graphql
directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

enum Role {
  ADMIN
  PARTNER
  USER
  UNKNOWN
}
```

Add the directive to types or fields that you want to restrict access to

```graphql
type Query {
  getProducts: [Product] @auth(requires: PARTNER)
  getUser: User
}

type User @auth(requires: USER) {
  name: String
  accounts: [Account] @auth(requires: PARTNER)
  ssn: String @auth(requires: ADMIN)
}
```

Import the function to get a schema transformer and modify your schema resolvers

```js
import { authDirectiveTransformer } from "@apollosolutions/financial-supergraph-common";

const newSchema = authDirectiveTransformer(schema);
```

## Known Limitations

- No custom roles
- No custom authentication logic
- No custom directive name
