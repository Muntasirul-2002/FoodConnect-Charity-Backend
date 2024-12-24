import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const phoneNumber = process.env.PHONE_NUMBER 

const client = twilio(accountSid, authToken)

export const sendSms = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from : phoneNumber,
            to :to,
        })
        console.log("SMS send successfully", response.sid)
        return response;
    } catch (error) {
        console.error("Error sending sms", error)
        throw error;
    }
}
