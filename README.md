# Workiz ACADEMY : MONGO DB Via Mongoose

## Getting Started 🚀

```bash
git clone <THIS_REPO>
npm install
```

## Development 🤓

```bash
npm run dev-server
```

```

### Build Artifacts 🛠

```bash
npm build
```

### Deploy to staging
```
npm run deploy-staging
``
It will perform a `npm run build-image` action , that takes COMMIT SHA and builds a new image with a tag of COMMIT SHA.
Later it will use `infra/deploy-staging.sh` to apply new `deployment.yaml` configuration with new COMMIT SHA.

Note: If you will update code without commiting it change, commit sha wont get changed , so it won't deploy the change.


