const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 6969;
const userData = require("./userData.json");
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const { graphqlHTTP } = require('express-graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return userData;
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        userData.push({
          id: userData.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password
        })
        return args
      },
    }
  }
})


const schema = new GraphQLSchema({ query: RootQuery , mutation: RootMutation })

app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})