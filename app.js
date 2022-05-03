const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const path = require("path");


const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  },
  partialsDir: [
    'views/posts/'
  ]
});

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));

app.engine('handlebars', handlebarsInstance.engine);

app.set('views', path.join(__dirname, '/views'));

app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});





