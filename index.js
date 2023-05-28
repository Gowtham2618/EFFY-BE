require("dotenv").config();
const PORT = process.env.PORT;

require("./src/config/db");
const app = require('./app');

app.listen(PORT, () => {
    console.log("Server Starts at", PORT);
});