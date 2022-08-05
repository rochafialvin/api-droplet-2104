require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const pool = require("./database");

app.use(cors()); // memperbolehkan untuk diakses dari origin yang berbeda
app.use(express.json()); // agar dapat mengakses data yg dikiirm di req.body

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/users", async (req, res, next) => {
  try {
    const connection = pool.promise();
    const sql = `SELECT user_id, username FROM user`;
    const [users] = await connection.query(sql);

    res.send({
      message: "List of users",
      data: {
        result: users,
      },
    });
  } catch (error) {
    next(error);
  }
});

// error handler
app.use((error, req, res, next) => {
  console.log({ error });

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({ err: error.message });
  console.log(`API is running at port ${port}`);
});
