const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3001;

//handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes middleware
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
