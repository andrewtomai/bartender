# Bartender Web App

## Infrastructure
This is a "static web app".  It uses two pieces of infrastructure, defined as a [Cloudformation template](./infrastructure/main.yml):
- S3
- CloudFront

### Deploying
```bash
aws cloudformation update-stack --stack-name bartender-web-app --template-body file://infrastructure/main.yml
```

