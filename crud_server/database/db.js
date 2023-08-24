import mongoose from "mongoose";

const Connections = async () => {
  const USER = process.env.DB_USERNAME;
  const PASSWORD = process.env.DB_PASSWORD;
  const MONGO_PORT = process.env.MONGO_PORT;
  const SRVVAL = process.env.SRVVAL;
  const MONGOCONT_NAME = process.env.MONGOCONT_NAME;
/*
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

*/

  // const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.djmj1ek.mongodb.net/Hld-web-app`;
  if (MONGO_PORT) {
    URL = `mongodb://${USER}:${PASSWORD}@${MONGOCONT_NAME}:${MONGO_PORT}/admin`;

  } else {
    URL = `mongodb+${SRVVAL}://${USER}:${PASSWORD}@${MONGOCONT_NAME}/Hld-web-app`;
  }
  
  
  try { 
    console.log(`Db URL!`, URL);	  
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Db is connected successfully`);
  } catch (error) {
    console.log(`Db could not be connected!`, error.message);
  }
};
/*
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
	   mongoose.connect(URL, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err.message)
    setTimeout(connectWithRetry, 5000)
  })
}
connectWithRetry(URL)
*/
export default Connections;

