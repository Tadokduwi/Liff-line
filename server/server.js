const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const LINE_BOT_API = "https://api.line.me/v2/bot"

const PORT ='3030'

require('dotenv').config()

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
}

app.post('/send-message' , async (req, res) => {
    try {
        const { userId , message } = req.body
        const body = {
            to: userId,
            messages:[
                {
                    type:'text',
                    text: message 
                }
            ]
        }

        const response = await axios.post(`${process.env.LINE_BOT_API}/message/push`,
            body,
            { headers }
        )

        console.log('response', response.data);
        
        res.json({
            message: "Send message success",
            responseData: response.data
        })

    } catch(error){
        console.log('error', error.response);
    }
})

app.listen(PORT, (req, res) => {
    console.log(`run at http://localhost:${PORT}`);
})