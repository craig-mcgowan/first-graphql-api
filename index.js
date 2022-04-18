const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 6969;
const schema = require('./Schemas/index');
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