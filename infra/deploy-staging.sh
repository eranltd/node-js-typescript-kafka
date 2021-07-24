#!/bin/bash

PROJECT_ID=decoded-agency-207514
COMMIT_SHA=$(git rev-parse --verify HEAD)
ENV='staging'

#gcloud builds submit --tag gcr.io/$PROJECT_ID/automation-rules-engine:$COMMIT_SHA --project=$PROJECT_ID
#sed -ie "s/IMAGE_TAG/$COMMIT_SHA/g" infra/k8s/staging/deployment.yml

replaces="s/IMAGE_TAG/$COMMIT_SHA/;";

cat infra/k8s/$ENV/deployment.yaml | sed -e "$replaces" | kubectl apply --namespace=$ENV -f -