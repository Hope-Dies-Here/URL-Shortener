import { urlRepository } from '../repository/UrlRepository.js'

class UrlService {
  constructor(urlRepository){
    this.urlRepository = urlRepository;
  }
  
  async insertUrl(data) {
    try {
      const newUrl = await urlRepository.insertUrl(data)
      return true;
    } catch (e) {
      console.log('Error at services, insertUlr')
      throw e
    }
  }
  
  async getAllUrls() {
    try {
      const urls = await urlRepository.getAllUrls()
      return urls
    } catch (e) {
      console.log('error at services, get all urls: ', e)
      throw e
    }
  }
  
  async getUrl(code){
    try {
      const urlData = await urlRepository.findUrlByCode(code)
      if(!urlData) return null
      return urlData
    } catch (e) {
      throw e
    }
  }
}

export const urlService = new UrlService(urlRepository)
// export { urlService }