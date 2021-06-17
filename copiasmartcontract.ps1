rm -r ./frontend/src/build
cp  -r ./smartcontract/build/ ./frontend/src
rm -r ./deploy/nginx-config-cert/localfiles/frontend/src/build/