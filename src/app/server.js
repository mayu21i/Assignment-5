const express = require("express");
const sequelize = require("./common/db/connections");
require("./common/db/associations");

const app = express();
const PORT = 3000;

app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync();
    console.log("Users, Posts, and Comments tables are ready");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database setup failed:", error.message);
  }
}

startServer();