import mongoose from "mongoose";

export const connectDatabase = async (url) => {
  let retryCount = 0;
  const maxRetry = 3;

  while (retryCount <= maxRetry) {
    try {
      console.log(`connecting to database...`);
      await mongoose.connect(url);
      console.log(`database connected.`);
      return;
    } catch (e) {
      if (retryCount < maxRetry) {
        retryCount++;
        console.log(`couldn't connect to the database!`);
        const delay = 2000;
        console.log(`retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(
          `max retry attempts reached. Unable to connect to the database.`
        );
        throw e;
      }
    }
  }
};