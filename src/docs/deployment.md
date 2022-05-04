# Online Deployment Description
Committing to the repository causes GitHub actions to automatically run the test and deployment scripts.

The frontend React application is deployed on AWS Amplify and the backend FastAPI server is deployed on AWS Elastic Beanstalk.

The frontend app's domain is https://resumeanalyzer.xyz which is the domain which is accessed by the user. The frontend 
communicates with the backend which is at the domain https://resume-analyzer-api.com.

# Deployment Steps
1. Make changes locally and push them to the GitHub repo.
2. Commiting to master causes the test script to start. When it finishes, the deployment script runs which deploys the frontend 
and backend apps. Once the deployment script has finished running, the updated frontend and backend apps should be live within 5 
minutes.
3. Check the AWS Amplify or AWS Elastic Beanstalk dashboards to check that everything has been deployed successfully.
