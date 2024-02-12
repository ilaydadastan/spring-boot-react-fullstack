# Student Management Full Stack Web Application

This application is a simple student management web application developed using Java Spring Boot and React. The application is hosted on Amazon Elastic Beanstalk.

## Access to Application

You can access the demo version of the application (https://demo.ilaydadastan.com/).

## Technologies Used
- Java Spring Boot
- React
- Amazon Elastic Beanstalk
- Amazon Relational Database Service (RDS)
- PostgreSQL
- Docker


## Running

1. Navigate to the `backend` directory and start the Spring Boot application:

2. Navigate to the `frontend` directory and start the React application:
    ```bash
    cd frontend
    npm start
    ```
3. Open your browser and go to `http://localhost:3000` to view the application.


## Deploying a New Version of Application

To deploy the new version of the application to Amazon Elastic Beanstalk, follow these steps:

1. Make sure you have the latest changes committed to your repository.
2. Build your Spring Boot application and React frontend.
    ```bash
    cd backend
    mvn clean install
    cd ../frontend
    npm run build
    ```
3. Once the build process is complete, navigate to the `backend/target` directory.
4. Locate the JAR file generated for your Spring Boot application (e.g., `your-application-name.jar`).
5. Go to the AWS Management Console and select the Elastic Beanstalk service.
6. Select your application and then select the environment to which you want to deploy the new version.
7. Click on the "Upload and Deploy" button.
8. Choose the JAR file you built in step 4 and upload it.
9. Review the deployment settings and click on "Deploy" to deploy the new version.
10. Wait for the deployment process to complete. Once finished, your application will be updated with the new version.
