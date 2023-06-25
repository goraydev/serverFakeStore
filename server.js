const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();

const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(cors());


app.use(express.static('public'));


app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.PUBLISHABLE_KEY,
    })
})
app.post('/create-intent', async (req, res) => {

    try {
        const intent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        res.send({ clientSecret: intent.client_secret });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            }
        })
    }

});

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});