import express from "express";
const app = express();
const port=5500;

app.get("/", (res,rep)=>{
    return rep.send("hi");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
