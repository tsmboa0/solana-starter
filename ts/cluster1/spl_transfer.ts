import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../turbine-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("H8wnTZp7EoFER3jYhVNLBHm99xwkAkF4TuSLnUPMeC8j");

// Recipient address
const to = new PublicKey("HgNrCxgsuNdepRRbDsqQEYvVAnKRQS9HW7bbBMHcce8G");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromATA= await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`From ATA: ${fromATA.address.toBase58()}`);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log(`To ATA: ${toATA.address.toBase58()}`);
        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, fromATA.address, toATA.address, keypair.publicKey, 1_00_000n);
        console.log(`Transfer success! Check out your TX here:\n\nhttps://explorer.solana.com/tx/${tx}?cluster=devnet`);

        // Result: https://explorer.solana.com/tx/2VLwRrrY6ZDo5nuiauaLrjaCaJNquQD4FqSoD5Rm2Vrk4h53DdVxNJ2uAC91YaPA2BwzE1T8eGnqf4GTffNvAZKa?cluster=devnet
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();