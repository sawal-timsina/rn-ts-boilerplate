#!/usr/bin/env bash
set -e # The script will exit if a part of it fails

RED='\033[1;31m'
LINK='\033[1;34m'
NC='\033[0m'

ERROR_TEXT="${RED}jq installation failed; jq required to manipulate json data; see more => ${LINK}https://stedolan.github.io/jq/download/${NC}"

echo "Enter project name : " && read PROJECT_NAME

npx react-native init "${PROJECT_NAME}" --template react-native-template-typescript --skip-install

function gen_package() {
  jq -s '.[0] * .[1]' "${PROJECT_NAME}"/package.json template/package.temp.json >> template/package.json
#  rm template/package.temp.json
  return 0
}

TEST_MSG='{"msg":"Generating package.json"}'

if [ "$(echo "${TEST_MSG}" | jq .msg)" ]; then
  gen_package
  else
      if [ "$(uname -s)" == 'Linux' ]; then
          if [ "$(sudo apt-get install jq)" ]; then
            gen_package
            else
              echo -e "${ERROR_TEXT}"
          fi
        elif [ "$(uname -s)" == 'Darwin' ]; then
          if [ "$(brew install jq)" ]; then
            gen_package
            else
              echo -e "${ERROR_TEXT}"
          fi
      fi
fi

mv ./"${PROJECT_NAME}"/* .
mv ./"${PROJECT_NAME}"/.[!.]* .

rm -r ./"${PROJECT_NAME}"/
rm ./App.tsx

cp -r ./template/* .
cp -r ./template/.[!.]* .

rm -r ./template

yarn install

# and finally, self destruct!!!
rm start.sh
