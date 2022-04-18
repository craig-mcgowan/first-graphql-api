const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 6969;
const userData = require("./userData.json");
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const { graphqlHTTP } = require('express-graphql')

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})