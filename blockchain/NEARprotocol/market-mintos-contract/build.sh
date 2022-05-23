#!/bin/bash
echo 'building contract...'
cargo build --target wasm32-unknown-unknown --release && mkdir -p ./out && cp target/wasm32-unknown-unknown/release/*.wasm ./out/market.wasm
echo
echo 'deploying contract...'
near dev-deploy ./out/market.wasm