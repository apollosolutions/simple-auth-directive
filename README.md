# Simple GraphQL Auth Directive

A simple example of how you might use an authentication and authorization directive in GraphQL. This is NOT a production ready-library.

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Installation

This package is not published npm. It is only available as a direct installation from GitHub.

```bash
npm i github:apollosolutions/simple-auth-directive
```

## Usage

Define the following directives with these specific roles in your GraphQL typedefs.

```graphql
directive @authenticated repeatable on OBJECT | FIELD_DEFINITION
directive @hasRole(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

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
  getProducts: [Product] @hasRole(requires: PARTNER)
  getUser: User @authenticated
}

type User @hasRole(requires: USER) {
  name: String
  accounts: [Account] @hasRole(requires: PARTNER)
  ssn: String @hasRole(requires: ADMIN)
}
```

Import the function to get a schema transformer and modify your schema resolvers

```js
import { authDirectiveTransformer } from "@apollosolutions/simple-auth-directive";

const newSchema = authDirectiveTransformer(schema);
```

Make sure the headers are included in the [GraphQL context](https://www.apollographql.com/docs/apollo-server/data/context#the-contextvalue-object) so that the directive can parse them. They must be saved at `context.headers`.

```javascript
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({ headers: req.headers })
});
```

## Known Limitations

- No custom roles
- No custom authentication logic
- No custom directive name
