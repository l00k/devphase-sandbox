# devPHAse sandbox

### Steps
1. Pull this repository with submodules
```shell
git clone --recursive git@github.com:l00k/devphase-sandbox.git
```
2. Install dependencies
```shell
yarn install
```
3. Build devPHAse  
npm package is already released but here you get recent updates

```shell
cd devphase
yarn compile
```
4. Start the local stack
```shell
yarn devphase stack
```
5. Build Flipper contract
```shell
cd sandbox/contract
cargo +nightly contract build
```
6. Try testing with mocha
```shell
cd sandbox
yarn test
```
