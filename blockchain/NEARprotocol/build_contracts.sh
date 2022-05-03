clear
echo 
echo "building Market and NFT contracts 👾"
echo
echo "Building NFT Contract... 👽"
echo
cd nft-mintos-contract
sh build.sh
cd ..
cd market-mintos-contract
echo
echo "Building Market Contract...🎩"
echo 
sh build.sh
cd ..
clear
echo
echo "NFT CONTRACT HERE: " && cat nft-mintos-contract/neardev/dev-account
echo
echo "MARKET CONTRACT HERE: " && cat market-mintos-contract/neardev/dev-account