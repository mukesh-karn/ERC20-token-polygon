const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

console.log("process.env.API_URL:-", process.env.API_URL);

const provider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require('./artifacts/contracts/BoatToken.sol/BoatToken1.json');
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/total-supply', async (req, res) => {
    try {
        let totalSupply = await contractInstance.totalSupply();
        totalSupply = Number(totalSupply.toString()) * 1000;
        console.log("Total supply is: ", totalSupply.toFixed(0));
        return res.status(200).send({ "message": "success", "data": { "totalSupply": totalSupply } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post('/mint', async (req, res) => {
    try {
        let tx = await contractInstance.mint();
        await tx.wait();
        return res.status(200).send({ "message": "success", "data": { "transactionHash": tx.hash } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post('/sell-token', async (req, res) => {
    try {
        const { to, amount } = req.body;
        let tx = await contractInstance.sellToken(to, BigInt(amount));
        await tx.wait();
        return res.status(200).send({ "message": "success", "data": { "transactionHash": tx.hash } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post('/transfer', async (req, res) => {
    try {
        const { to, value } = req.body;
        let tx = await contractInstance.transfer(to, BigInt(value));
        await tx.wait();
        return res.status(200).send({ "message": "success", "data": { "transactionHash": tx.hash } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.post('/burn-after-45-days', async (req, res) => {
    try {
        const { from, amount } = req.body;
        let tx = await contractInstance.burnAfter45Days(from, BigInt(amount));
        await tx.wait();
        return res.status(200).send({ "message": "success", "data": { "transactionHash": tx.hash } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.get('/current-time', async (req, res) => {
    try {
        let currentTime = await contractInstance.getCurrentTime();
        console.log("currentTime:-", currentTime.toString());
        currentTime = currentTime.toString();
        // let date = new Date(currentTime.toNumber() * 1000); // Convert to milliseconds
        return res.status(200).send({ "message": "success", "data": { "currentTime": currentTime } });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});


app.listen(3000, () => {
    console.log(`Server started on port 3000`);
})