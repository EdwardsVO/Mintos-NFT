#!/bin/bash
CONTRACT=dev-1651181521111-96301082013553
MARKETCONTRACT=dev-1651543245439-12134656918976
USERID=mzterdox.testnet

echo 'Putting nfts on sale...'

near call $CONTRACT nft_approve '{"token_id": "101", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"4\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "102", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"5\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "103", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"6\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "104", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"7\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "105", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"8\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "106", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"9\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "107", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"10\"}" }' --accountId $USERID --amount 1

near call $CONTRACT nft_approve '{"token_id": "108", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"11\"}" }' --accountId $USERID --amount 1


