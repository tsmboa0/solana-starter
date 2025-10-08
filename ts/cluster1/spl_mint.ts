import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../../turbine-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const tokenAmount = 1_000_000n;
// Mint address
const mint = new PublicKey("H8wnTZp7EoFER3jYhVNLBHm99xwkAkF4TuSLnUPMeC8j");

(async () => {
    try {
        // Create an ATA
        console.log(`Creating ATA for ${keypair.publicKey.toBase58()}`);
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        // Result : Your ata is: 69icoHguopwhnwLBkTxKEUvP3mJuj7KgDXwGNirQcR1q

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, tokenAmount);
        console.log(`Minted ${tokenAmount} tokens to ${ata.address.toBase58()}`);
        // Minted 1000000 tokens to 69icoHguopwhnwLBkTxKEUvP3mJuj7KgDXwGNirQcR1q
        console.log(`Your mint txid: ${mintTx}`);
        // Your mint txid: 4b6Yro4VwSKqg6uayndidFGD4hKrSvUQaFkDRSz5D7xCLdJiULLhJWQU32MRzihgb2DqfsussCp5QCwJ9ZXFeZYL
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
