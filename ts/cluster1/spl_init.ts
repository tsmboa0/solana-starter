import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../../turbine-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const mintAuthority = keypair.publicKey;
const decimals = 6;

(async () => {
    try {
        // Start here
        console.log(`Initializing mint with ${decimals} decimals`);
        const mint = await createMint(connection, keypair, mintAuthority, null, decimals);

        console.log(`Mint ${mint.toBase58()} initialized with ${decimals} decimals`);

        // Result: Mint H8wnTZp7EoFER3jYhVNLBHm99xwkAkF4TuSLnUPMeC8j initialized with 6 decimals

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
