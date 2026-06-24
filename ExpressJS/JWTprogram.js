const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        const token = jwt.sign(
            { username: username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.get("/profile", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token Required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        res.json({
            message: "Authentication Successful",
            user: decoded.username
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});