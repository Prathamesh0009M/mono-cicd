import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
const port = 3001;

// ✅ Add this line
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;  // destructuring

    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    });

    res.send(`User ${username} signed up successfully!`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
