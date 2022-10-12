# devPHAse sandbox

### Steps
1. Pull this repository with submodules
```shell
git clone --recursive git@github.com:l00k/devphase-sandbox.git
```
2. Follow steps from [devPHAse doc](https://github.com/l00k/devphase) to build local stack
3. Set a proper path to Phala blockchain directory in `/dev-node/.env`
4. Start the local stack.
```shell
cd dev-phase
./run.sh
```
5. Install dependencies
```shell
yarn install
```
6. Build devPHAse (it is not released yet)
```shell
cd devphase
yarn compile
```
7. Build Flipper contract
```shell
cd sandbox/contract
cargo +nightly contract build
```
8. Try testing with mocha
```shell
cd sandbox
yarn test
```
