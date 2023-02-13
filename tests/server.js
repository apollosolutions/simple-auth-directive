import { parse } from "graphql";
import { resolvers } from "./resolvers.js";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authDirectiveTransformer } from "../index.js"
import {buildSubgraphSchema} from "@apollo/subgraph";

const __dirname = dirname(fileURLToPath(import.meta.url));
const typeDefs = parse(
    readFileSync(resolve(__dirname, "schema.graphql"), "utf8")
);

const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({
    schema: authDirectiveTransformer(schema),

});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({ headers: req.headers })
});
console.log(`🚀  Server ready at: ${url}`);
