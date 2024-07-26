const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//REST API points

//Routes
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    console.log("id = ", id);
    const user = users.find((user) => user.id === id);

    return res.json(user);
  })
  .patch((req, res) => {
    //Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //Delete user with id
    return res.json({ status: "Pending" });
  });

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log("Server Started at Port 8000"));
