#!/bin/bash
CONTRACT=dev-1651543210027-92386991020888
USERID=mzterdox.testnet
echo 'Minting nfts...'

near call $CONTRACT nft_mint '{"token_id": "101", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/
QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "102", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "103", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "104", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "105", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "106", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "107", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

near call $CONTRACT nft_mint '{"token_id": "108", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 0.1

