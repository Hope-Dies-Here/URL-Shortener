import express from 'express'
import { urlService } from '../service/UrlService.js'

const router = express.Router()

router.get('/favicon.ico', function(req, res) { 
    res.status(204);
    res.end();    
});

router.get('/', async (req, res) => {
  const urls = await urlService.getAllUrls() 
  res.render('index', { urls })
})
import { Url } from '../model/url.js'
router.get('/delete', async(req, res) => {
  await Url.deleteMany({__v: 0})
  res.send("deleted")
})
// 
router.get('/links', async (req, res) => {
  try {
    const urls = await urlService.getAllUrls() 
    console.log('sent', urls)
    res.status(200).json({ status: true, data: urls })
  } catch (e) {
    console.log(e)
    res.staus(500).json({status: false, data: null})
  }
})

router.get('*/:code', async (req, res) => {

  const code = req.params.code
  const urlData = await urlService.getUrl(req.params.code)
  if(urlData){
    res.redirect(urlData.long)
  } else {
    res.redirect('/')
  }
})

router.post('/short', async(req, res) => {
  // console.log(req.body)
  try {
    const insertion = await urlService.insertUrl(req.body)
    if(insertion) {
      res.status(200).json({ isComplete: true })
    } else {
      console.log('somthing')
      res.status(500).json({ isComplete: false })
    }
  } catch (e) {
    console.log(e)
      res.status(500).json({ isComplete: false })
  }
})

export default router