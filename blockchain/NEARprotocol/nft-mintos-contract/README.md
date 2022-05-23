## TESTING CONTRACTS 

NFT Contract 
dev-1651181521111-96301082013553

Market Contract
dev-1651182694934-25274786980866


# Initialize Market contract

near call dev-1651182694934-25274786980866 new '{"owner_id":"lexdev.testnet", "treasury_id":"dev-1650675719272-23920946077227"}' --account-id lexdev.testnet

# Initialize NFT contract 

near call dev-1651181521111-96301082013553
 new_default_meta '{"owner_id":"lexdev.testnet"}' --account-id lexdev.testnet

# Mint NFT 0

near call dev-1651181521111-96301082013553 nft_mint '{"token_id":"0", "metadata":{"title": "NFT0 TEST", "description":"testing 0", "media":"https://estaticos-cdn.sport.es/clip/83ae4693-52a7-400a-abbf-7202b558f38b_alta-libre-aspect-ratio_default_0.jpg"},  "receiver_id":"nft1.lexdev.testnet"}' --account-id nft1.lexdev.testnet --amount 0.1

# Mint NFT 1

near call dev-1651181521111-96301082013553 nft_mint '{"token_id":"1", "metadata":{"title": "NFT1 TEST", "description":"testing 1", "media":"https://estaticos-cdn.sport.es/clip/83ae4693-52a7-400a-abbf-7202b558f38b_alta-libre-aspect-ratio_default_0.jpg"},  "receiver_id":"nft1.lexdev.testnet"}' --account-id nft1.lexdev.testnet --amount 0.1

# Mint NFT 2

near call dev-1651181521111-96301082013553 nft_mint '{"token_id":"2", "metadata":{"title": "NFT2 TEST", "description":"testing 2", "media":"https://estaticos-cdn.sport.es/clip/83ae4693-52a7-400a-abbf-7202b558f38b_alta-libre-aspect-ratio_default_0.jpg"},  "receiver_id":"nft1.lexdev.testnet"}' --account-id nft1.lexdev.testnet --amount 0.1


# Put On Sale NFT 1

near call dev-1651181521111-96301082013553 nft_approve '{"token_id": "0", "account_id":"dev-1651182694934-25274786980866", "saleArgs":"10000000000000000000000000"}' --account-id nft1.lexdev.testnet --amount 0.1

# Put on sale NFT 2

near call dev-1651181521111-96301082013553 nft_approve '{"token_id": "1", "account_id":"dev-1651182694934-25274786980866", "saleArgs":"3000000000000000000000000"}' --account-id nft1.lexdev.testnet --amount 0.1

# Buy NFT 1

near call dev-1651182694934-25274786980866 offer '{"nft_contract_id":"dev-1651181521111-96301082013553", "token_id":"0"}' --account-id lexdev.testnet --amount 10 --gas 3000000000000000