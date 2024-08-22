import express from 'express'
import { urlService } from '../service/UrlService.js'

const router = express.Router()

const db = [
    {
      long: 'https://google.com',
      short: 'http://localhost:5000/ggl'
    }
  ]

router.get('/favicon.ico', function(req, res) { 
    res.status(204);
    res.end();    
});

router.get('/', async (req, res) => {
  const urls = await urlService.getAllUrls() 
  res.render('index', { urls })
})
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
  // const urlData = db.find(url => url.code == code)
  const urlData = await urlService.getUrl(req.params.code)
  if(urlData){
    console.log(urlData.long)
    res.redirect(urlData.long)
  } else {
    res.send('<h1>404</h1>')
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