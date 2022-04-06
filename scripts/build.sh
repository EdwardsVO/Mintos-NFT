#!/bin/bash
echo "Building contract..."
cd "../blockchain/rust-contract/contract"
cargo build --all --target wasm32-unknown-unknown --release
cp target/wasm32-unknown-unknown/release/*.wasm ./res/
echo "Deploying contract..."
near dev-deploy res/nft_marketplace.wasm
