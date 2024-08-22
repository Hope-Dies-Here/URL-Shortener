import { Url } from "../model/url.js";

class UrlRepository {
  constructor(Url) {
    this.Url = Url;
  }

  async insertUrl(data) {
    try {
      const newUrl = new Url({
        long: data.long,
        short: data.short,
        code: data.code
      });

      newUrl.save();
      return true;
    } catch (error) {
      if (error.code === 11000) {
        // Mongoose's code for duplicate key error
        console.error("Duplicate link error:", error);
        throw new Error("A link with that URL already exists");
      } else {
        console.error("Error adding link:", error);
        throw error; // Re-throw the error to be handled by the controller
      }
    }
  }
  
  async getAllUrls() {
    try {
      const urls = await Url.find()
      return urls
    } catch (e) {
      console.log('error at get all urls: ', e)
      throw e
    }
  }

  async findUrlByCode(code) {
    try {
      const url = await Url.findOne({ code });
      if(!url) return null;
      return url;
    } catch (e) {
      console.log("Error at URL Repo findUrlByCode: ", e);
      throw e;
    }
  }
}

export const urlRepository = new UrlRepository(Url);
// export { urlRepository };
