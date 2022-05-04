#!/bin/bash
CONTRACT=dev-1651543210027-92386991020888
MARKETCONTRACT=dev-1651543245439-12134656918976
USERID=mzterdox.testnet

echo 'Putting nfts on sale...'

near call $CONTRACT nft_approve '{"token_id": "101", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"4000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "102", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"5000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "103", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"6000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "104", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"7000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "105", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"8000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "106", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"9000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "107", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"10000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "108", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"11000000000000000000000000\"}" }' --accountId $USERID --amount 3


