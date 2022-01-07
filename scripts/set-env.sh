#!/usr/bin/env bash
set -e # The script will exit if a part of it fails

GREEN='\033[1;32m'
NC='\033[0m' # No Color

PROJECT_ROOT=$(pwd)
ANDROID_DIR="${PROJECT_ROOT}/android"
GOOGLE_SERVICE_JSON="google-services.json"
GOOGLE_SERVICE_ANDROID="${ANDROID_DIR}/app/"

IOS_DIR="${PROJECT_ROOT}/ios"
GOOGLE_SERVICE_INFO="GoogleService-info.plist"
GOOGLE_SERVICE_IOS="${IOS_DIR}/"

# Keeping this for updates
#GOOGLE_SERVICE_JSON=https://readytowork.atlassian.net/wiki/spaces/WAT/pages/1747746819/System+overview#Google-service
#JS=`
#const parent = document.querySelector(".ak-renderer-document");
#parent.childNodes.forEach((c, i) =>  {
#    if (c.id === "Google-service") {
#        let cb = parent.childNodes[i+2];
#        cb.querySelector("button").click();
#    }
#})
#`

environment=$1

# Set the env config
cp -r environments/"${environment}"/config.ts ./

# Keeping this for updates
#if [ "$(uname -s)" == 'Linux' ]; then
#  google-chrome ${GOOGLE_SERVICE_JSON}
#
#elif [ "$(uname -s)" == 'Darwin' ]; then
#  open -a "Google Chrome" ${GOOGLE_SERVICE_JSON}
#
#fi

cp -r environments/"${environment}/${GOOGLE_SERVICE_JSON}" "${GOOGLE_SERVICE_ANDROID}"
cp -r environments/"${environment}/${GOOGLE_SERVICE_INFO}" "${GOOGLE_SERVICE_IOS}"

cd "${PROJECT_ROOT}/android" && ./gradlew clean && cd .. && yarn cache clean

echo -e "${GREEN}Successfully copied project ${environment} environment config${NC}"
