const http = require("http");
const app = require("./app");
require("dotenv").config();
const {connectDB} = require('./db');


const server = http.createServer(app);

const main = async() => {
  const port = process.env.PORT || 8000;
  try {
    await connectDB().then(()=>{
      server.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
      })
    })
  } catch (e) {
    console.log('DB Error');
    console.log(e);
  }
};

main();
