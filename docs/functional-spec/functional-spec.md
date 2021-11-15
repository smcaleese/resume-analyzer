# <center> 4th Year Project <br> Functional Specification </center>
# <center>Project Name: Job Posting and Resume Analyzer </center>

## <center> Authors: Darragh McGonigle, Stephen McAleese (18921756) </center>
## <center> Supervisor: Michael Scriney </center> 

\
\
<br>

# **0. Table Of Contents**

### [**1. Introduction**](#Appendices)
    1.1 Overview
    1.2 Business context
    1.3 Glossary

### [**2. General Description**](#2.1-product-description)
    2.1 Product Functions
    2.2 User Characteristics and Objectives
    2.3 Operational Scenarios
    2.4 Constraints

### [**3. Functional Requirements**](#3.1-user-login)

### [**4. System Architecture**](#4.1-overview)

### [**5. High-Level Design**](#5.1-user-interfaces)

### [**6. Preliminary Schedule**](#9.1-gantt-chart)

### [**7. Appendices**](#amazon-web-services)

\
\
<br>

# **1. Introduction**
## 1.1 Overview
The product we are developing is a web application which will allow a user to upload a CV/resume. The system will carry out a suite of natural language processing (NLP) and sentiment analysis analytics on the resume extracting key information such as skills, technologies, certifications and prior employment. This information will then be processed alongside aggregate job market data to produce helpful information such as recommended skills which will make the user more attractive to potential employers and also potential career paths. With this information we hope to help the user make informed choices when navigating their career decisions.
<br>

## 1.2 Glossary
The following table contains technical terms which will be used throughout the document. The definitions of these terms are in the context of this project.
| **Term**     | **Definition** |
|--------------|----------------|
| Test         |  Blank              |

\
\
<br>

# **2. General Description**
## 2.1 Product Functions
The product will be a web application which a user will be able to upload a CV to. This CV will be sent to the systems backend where first it will be processed using machine learning and NLP to extract key terms and information about the user, this information will include (but may not be limited to) certifications, skills, characteristics, technologies and employment history. This data will then be analysed by the system which will make use of its collection of aggregate job market data (job listings, linkedin profiles, etc.) to analyse the users provided information to evaluate how well their CV will fare in the current job market. It will then return helpful information to the user like what skills or certifications will be most beneficial in progressing their career, what are some potential career paths they can pursue (and what steps are needed) and other useful information to help the user improve their CV and progress their career. This information  will then be displayed to the user as well as allowing the user to see jobs that they are most suited for with their current skill set and apply to any which take their interest.
<br>

## 2.2 User Characteristics and Objectives
This product will be targeted towards people who are beginning their career path such as new graduates, young people aged 18 - 30 and people who are looking to make a career change. This user base will have a wide range of technical abilities and experience and as such the system will need to be accomodating to people of all levels of technical expertise. However we do expect our users to have a basic functional understanding of using and interacting with web applications. We will also be exclusively targeting English speakers as the product will only be able to handle English language CVs and thus we will only have the application available in English.

From a user's perspective, using the system should be as straightforward as navigating to the URL using a modern web browser of their choice. Uploading a CV through a clearly marked upload section and clicking a button to being the processing. There will be a short delay (No more than 30-40 seconds) as processing takes place and then the screen will change to display the output information to the user. From here the user is free to navigate and explore the displayed information and interact with any interactive information displayed like navigating to job listing of jobs that were deemed the most suitable for them.
<br>

## 2.3 Operational Scenarios
<br>

### **User Accesses the Site**

![Use Case Diagram Showing User Visiting Site](./res/UC-Diagram-User-Visits-Page.png)

**Description**

A user will open their web browser of choice. Then they will type in the URL of the web application. Once complete the web browser will send a request to the web server which will respond with the home page of the application 

**Goal**

A user can access the website homepage using a web browser and an internet connection

**Step-by-Step Interaction**

1. The user opens their web browser of choice
    *  This can be any modern web browser. Edge, Chrome, Firefox, Safari, etc.
2. The user enters the web applications URL into the search/navigation bar.
3. The web applications home page will be displayed to the user in the browser.
    *   If the user is using a browser which does not support Javascript an error message will be displayed
    *   If the browser fails to access the web application then it will display the appropriate error message

<br>

### **User Uploads a CV**

![Use Case Diagram Showing User Uploading CV](./res/UC-Diagram-User-Uploads-CV.png)

**Description**

The user will be able to upload a CV in the form of a file on their computer. They will then press a  button to submit this file and it will be uploaded to the server. After a brief processing time the user will be presented with results from the processing. 

**Goal**

A user can upload a file, this file can be sent to the server and the user can view the results.

**Step-by-Step Interaction**

1. The user uploads the CV document file.
    *   This can either be done by dragging the file over the upload section on the website or by clicking a button which will open the users file explorer where they can then select the file for upload
2. User presses the "Submit" button.
3. The user waits as the page displays a loading icon while the document is processed.
4. The user is shown a screen with the results of the processing.

<br>


## 2.4 Constraints
Development of this system will have to abide by the following constraints.
* **Time constraints:** Development and deployment of the project must be complete before April 2022.
* **Financial constraints:** The project will have little to no budget and thus will not be able to make use of any expensive services such as hosting or paid for development tools/subscriptions.
* **Processing constraints:** Due to the aforementioned budget constraint the computing and storage capability of the host system will be severely limited and may lead to poor user experience.
* **Legal constraints:** THe product will be taking in user data and thus the product must be in accordance with European and International regulations for data management, data storage and data protections.
* **Platform constraints:** The product is a web application and as such must be developed with modern browser capabilities in mind. These browsers will have different features and capabilities which the product must be able to adapt to for a constant user experience. 
* **Traffic constraints:** Due to budget and processing limitations the system will not be able to handle large amounts of users accessing the product at once.
\
\
<br>

# **3. Functional Requirements**
## 3.1 User Upload of CV 
**Description**
* A user of the system must be able to upload a CV/Resume to the system and submit it for processing. The file must be encrypted during transport as it will contain user sensitive data and thus must be transmitted safely.

**Criticality**
* This feature is vital to the system as it is the main interaction and data source between the user and system. Without this feature we cannot get critical data needed for analysis such as skills, employment history and technical knowledge.

**Technical Issues**
* There are two main technical challenges for this feature, the first is decoding a users file from its respective file type into a standardised file type which can be sent to the server. The second challenge is security as the file will almost definitely contain sensitive information which must be kept secure during the upload process.

**Dependencies**
* This feature will have a dependency on the user being able to access and view the web application.

## 3.2 Parsing a User Submitted CV
**Description**
* The system must be able to parse a user submitted CV and identify and extract key data such as skills, technical knowledge, past employment, certifications, education and characteristics. This will be carried out using machine learning based natural language processing.

**Criticality**
* This feature is required as this will be the main way that the system is able to gather data about a user and this data will be vital as it is what will be used for the analysis and review process which is the main functionality of the product. 

**Technical Issues**
* The main technical issue faced with this feature will be the natural language processing as it is quite difficult for a machine to automatically to extract and categorise data from plain english into usable data is a fast an reliable manner.

**Dependencies**
* This feature is dependent on the CV upload feature as with out the user having the ability to upload and submit a CV to the system their would be no way for the system to get the CV to parse in the first place.

## 3.3 Gathering Job Market Data
**Description**
* The system needs to be able to automatically scrape and update its data in regards to the current job market so that the data it gives back to the user is up to date and relevant with the current state of the job market.

**Criticality**
* This feature is very important as it will be how the system gets information about the job market that it will use to make evaluations and predictions to give helpful and usable data back to the user. 

**Technical Issues**
* The main technical challenge is finding and working with multiple data sources especially those which do not have easily accessible APIs for our system to work with. On top of this, storing and managing this data in a reliable and consistent way will also be a crucial technical challenge for this feature.

**Dependencies**
* This feature does not have any dependencies on any other features within the system and will serve as a standalone piece which works in the background to gather and feed data into the system.

## 3.4 Performing Data Analysis
**Description**
* The system should use the data gathered from job market sources as well as the data extracted from the user's uploaded resume to perform meaningful and beneficial data analysis to provide helpful insights to the user.

**Criticality**
* This feature is vital to the functionality of the application as without this there would be no way for the user to get any functional purpose or use out of the system.

**Technical Issues**
* The main technical challenge is developing the various models and algorithms needed for combining and interpreting the data to make meaningful responses for the user.

**Dependencies**
* This feature is dependent on both the CV submission feature and the job market data gathering feature as these features will provide the necessary data for the analysis to take place.

\
\
<br>

# **4. System Architecture**

The system is composed of two primary high-level components: a user-facing front end web application that provides the UI of the application and a back end web server that will act as an API. User input supplied to the front end UI will be passed to the back end service via JSON. The backend service will then perform data analysis depending on the input to calculate a result that will be sent back to the UI as output.

![Architecture diagram](./res/system-architecture-diagram.png)

\
\
<br>

# **5. High-Level Design**

![Data Flow Diagram](./res/data-flow-diagram.png)

The data flow diagram above shows the major components of the system how they interact with each other and the kind of inputs and outputs each component receives or sends. The top of the diagram shows the user who interacts with the web application which is composed of two major features: the resume upload and insights page and the job postings insights page.

Users who choose to use the resume upload feature can upload their resumes for analysis. When a resume is uploaded, it is sent to the resume analyzer for processing. To analyze resumes, the resume analyzer will read job postings or precalculated insights from the database and use them to extract useful insights from resumes. These insights are then sent back to the user and displayed by the user interface in an intuitive and useful report that makes use of a combination of text and visualisations.

The job posting analysis service is the other major component of the system. Users can use this service by clicking buttons representing popular search queries or they may do their own searches. The resume analyzer is designed to process two types of queries: searches for information or searches for questions. In the former case, standard information retrieval techniques can be used to retrieve relevant documents. To answer questions, we plan on using AI to recognize the type of question asked. For example, "best rated companies" and "best paying companies" are similar in that they involve the evaluation of companies and may require the generation of a ranked list. Once the type of question has been identified, the contents of the search query can be used to infer the specific question that was asked. The AIs guess of the purpose of the question can be displayed to the user who can accept the question or try again.

\
\
<br>

# **6. Preliminary Schedule**
![Preliminary Gantt Chart](./res/Gantt.jpg)

The initial development plan for the project is as follows. We will begin by setting up the skeletons for the front and backend of the system. In this step we will generate any boiler plate code for technologies that we will be using such as React and Django. We are aiming to complete this first step by late November which will give us time to briefly start development before the DCU exam period. Starting in late November we will begin development by first building the various scrapers and API interfaces which will be used to gather and aggregate data about the job market from sources like Linkedin and Indeed. We will aim to get this data gathering step done before the exams but expect that there might be the risk of some overrun as exams draw near. Following the DCU exams in December we hope to get our database setup so that the data gathering system can store the data for use by later systems. Also starting in mid December will be the development and training work for the natural language processing engine which will be used to parse user's CVs, development on this feature is expected to run though to the start of January. With the completion of the NLP parser and the data gathering feature we should have all the data  we need to begin work on the analysis engine which would take us up until mid January. With this complete all that is left for the backend of the system will be the setting up the API endpoints so these features can be accessed from our frontend web app. Then  up until early February we plan to develop the frontend of the application focusing more on functionality and design rather than aesthetics. With both a preliminary front and backend complete we will spend the beginning to february carrying out end to end testing on the system to identify any bugs. Once the first round of testing is complete we will spend 2 weeks finalising and cleaning up the product. This will be followed by a final round of testing and debugging which will conclude in late February. With development wrapped up we will carry out the necessary automated and user testing to ensure the system is sound. And then we will spend the last 2 weeks focusing on the documentation for the system. This plan should have us finished a few days before the deadline on April 15th.

\
\
<br>

# **7. Appendices**

