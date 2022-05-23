#!/bin/bash
CONTRACT=dev-1651543210027-92386991020888
USERID=mzterdox.testnet
echo 'Minting nfts...'

near call $CONTRACT nft_mint '{"token_id": "201", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "202", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "203", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "204", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "205", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "206", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "207", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

near call $CONTRACT nft_mint '{"token_id": "208", "receiver_id": "'$USERID'","metadata": {"title": "NFT Title", "description":"NFT Description", "media": "https://ipfs.infura.io/ipfs/QmcHkMAknB68W2iqhuGXwJifaf7eQEP92SdNt97ieJGNHY"}}' --accountId $USERID  --amount 3

