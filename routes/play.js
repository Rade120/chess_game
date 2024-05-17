var express = require('express');
var util = require('../config/util.js');
var router = express.Router();
const Web3 = require('web3');
const LLG_ABI = require('../config/LLGABI.js');

const BSC_RPC_ENDPOINT = process.env.BSC_RPC_ENDPOINT;
const LLG_CONTRACT_ADDRESS = process.env.LLG_CONTRACT_ADDRESS;

router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

router.get('/balance', async function (req, res) {
    try {
        const walletAddress = req.query.wallet;
        const web3 = new Web3(BSC_RPC_ENDPOINT);
        const LLGContract = new web3.eth.Contract(LLG_ABI, LLG_CONTRACT_ADDRESS);
        const balance = await LLGContract.methods.balanceOf(walletAddress).call();
        console.log("balance", balance);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;