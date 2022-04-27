const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty+1).join('0')){   
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "26/04/2022", "Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    ischainValid(){
        for(let i =1; i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.prevHash != prevBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let mede = new BlockChain();

mede.addBlock(new Block(1, "26/04/2022", {amount: 4}));
mede.addBlock(new Block(2, "27/04/2022", { amount: 40}));
mede.addBlock(new Block(3, "28/04/2022", { amount: 40}));

console.log(JSON.stringify(mede, null , 4));


//console.log('Is BlockChain valid ? ' + mede.ischainValid());
// mede.chain[1].data = { amount : 100};  TEMPERING THE DATA
// mede.chain[1].hash = mede.chain[1].calculateHash();  TEMPERING WITH THE HASH


console.log('Is BlockChain valid ? ' + mede.ischainValid());
