import express from "express";

const app = express();

app.use(express.static(__dirname + "/dist/election-angular-app"));
app.listen(process.env.PORT || 8080);
