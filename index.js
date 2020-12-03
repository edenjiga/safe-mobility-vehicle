require("dotenv").config();
const app = require("./app");
const { writeFileSync } = require("fs");
const { join } = require("path");

const googleFile = Buffer.from(
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "e30=",
  "base64"
);
writeFileSync(join(process.cwd(), "google.json"), googleFile.toString());
process.env.GOOGLE_APPLICATION_CREDENTIALS = "google.json";

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Api listening at port ${port}`);
});
