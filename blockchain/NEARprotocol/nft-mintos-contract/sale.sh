#!/bin/bash
CONTRACT=dev-1651543210027-92386991020888
MARKETCONTRACT=dev-1651543245439-12134656918976
USERID=mzterdox.testnet

echo 'Putting nfts on sale...'

near call $CONTRACT nft_approve '{"token_id": "201", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"4000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "202", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"5000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "203", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"6000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "204", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"7000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "205", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"8000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "206", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"9000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "207", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"10000000000000000000000000\"}" }' --accountId $USERID --amount 3

near call $CONTRACT nft_approve '{"token_id": "208", "account_id":"'$MARKETCONTRACT'","msg":"{\"sale_conditions\": \"11000000000000000000000000\"}" }' --accountId $USERID --amount 3


