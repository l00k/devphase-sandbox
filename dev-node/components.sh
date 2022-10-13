#!/bin/bash

source ./.env

case $1 in
    node)
        $PHALA_CHAIN_PATH/target/release/phala-node \
            --dev --rpc-methods=Unsafe \
            --block-millisecs=$BLOCK_TIME
    ;;
    pruntime)
        rm -r data
        mkdir -p data
        $PHALA_CHAIN_PATH/standalone/pruntime/bin/pruntime \
            --allow-cors \
            --cores=0 \
            --port 8000
    ;;
    pherry)
        while ! nc -z 127.0.0.1 9944; do
            echo -n "."
            sleep 1
        done

        while ! nc -z 127.0.0.1 8000; do
            echo -n "."
            sleep 1
        done

        sleep 1

        $PHALA_CHAIN_PATH/target/release/pherry \
            --no-wait \
            --mnemonic=//Alice \
            --inject-key=0000000000000000000000000000000000000000000000000000000000000001 \
            --substrate-ws-endpoint=ws://localhost:9944 \
            --pruntime-endpoint=http://localhost:8000 \
            --dev-wait-block-ms=$BLOCK_TIME
    ;;
esac

