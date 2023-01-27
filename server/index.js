const app = require("./app");
const PORT = require("./config/config").app.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
