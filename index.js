const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const URL ="mongodb+srv://sa:Arnur2020!@cluster0.iuutn48.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority";

mongoose.connect(
  URL,{useUnifiedTopology: true,useNewUrlParser: true,},() => console.log("Database Connected")
  );

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({typeDefs,resolvers})
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(4001, () => console.log("Server is running on port 4001"));
};
startServer();
