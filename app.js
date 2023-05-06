// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app)

const capitalize = require("./utils/capitalize");
const projectName = "wine-vibes-main";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
//TODO merge dupliacte homepages
const indexRoutes = require("./routes/index.routes"); //Hompage
app.use("/", indexRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/cart", cartRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const homepageRoutes = require("./routes/homepage.routes"); //Homepage
app.use("/", homepageRoutes);


const checkoutRoutes = require("./routes/checkout.routes");
app.use("/", checkoutRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
