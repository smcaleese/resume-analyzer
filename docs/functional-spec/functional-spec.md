# <center> 4th Year Project <br> Functional Specification </center>
# <center>Project Name: Job Posting and Resume Analyzer </center>

## <center> Authors: Darragh McGonigle (18316121), Stephen McAleese (18921756) </center>
## <center> Supervisor: Michael Scriney </center> 

\
\
<br>

# **0. Table Of Contents**

### **1. Introduction**
    1.1 Overview
    1.2 Glossary

### **2. General Description**
    2.1 Product Functions
    2.2 User Characteristics and Objectives
    2.3 Operational Scenarios
    2.4 Constraints

### **3. Functional Requirements**
    3.1 User Upload of CV
    3.2 Parsing a User Submitted CV
    3.3 Gathering Job Market Data
    3.4 Performing Data Analysis
### **4. System Architecture**

### **5. High-Level Design**

### **6. Preliminary Schedule**

### **7. Appendices**

\
\
<br>

# **1. Introduction**
## 1.1 Overview
Our 4th year project is a web application that will use natural language processing on CVs and job posts to provide useful services for job-seeking software engineers. The two primary services we intend to offer are the ability to analyze and evaluate CVs and suggest improvements to them and a tool for finding useful insights about the job market for software engineers. The system will use large numbers of job posts as input data for both services.

The resume analysis feature will allow users to upload their CVs to a resume analyzer which will evaluate the quality of the resume and suggest improvements based on trends in the current job market. The system will carry out a suite of natural language processing (NLP) on the resume extracting key information such as skills, technologies, certifications and prior employment. This information will then be processed and compared to data about job market trends to produce helpful information such as recommended skills that would make the user more attractive to potential employers. With this information we hope to help the user make informed choices when navigating their career decisions.

We also plan to offer users the ability to find and view job market trends directly. This feature would use user input along with large numbers of job posts to generate useful insights such as the skills that are most in demand, the highest-rated companies or the number of job postings for certain subskills or job categories.

<br>

## 1.2 Glossary
The following table contains technical terms which will be used throughout the document. The definitions of these terms are in the context of this project.
| **Term**     | **Definition** |
|--------------|----------------|
| NLP          |  Natural Language Processing is a the process for applying various computing techniques in order to work with and process data which is written in plain language.         |
|API           |  Application Programming Interface is allows for communication between a system and another external system.             |
| React        | React is a modern Javascript library developed by Facebook |
| Django       | Django is a Python library designed for developing APIs|

\
\
<br>

# **2. General Description**
## 2.1 Product Functions
The product will be a web application which a user will offer a resume upload page for resume analysis and a data analytics tool for viewing job market trends.

The CV upload tool will consist of a page where user can upload their CVs. CVs will be sent to the systems backend where first it will be processed using machine learning and NLP to extract key terms and information about the user, this information will include (but may not be limited to) certifications, skills, characteristics, technologies and employment history. This data will then be analysed by the system which will make use of its collection of aggregate job market data (job listings, linkedin profiles, etc.) to analyse the users provided information to evaluate how well their CV will fare in the current job market. It will then return helpful information to the user like what skills or certifications will be most beneficial in progressing their career, what are some potential career paths they can pursue (and what steps are needed) and other useful information to help the user improve their CV and progress their career. This information  will then be displayed to the user as well as allowing the user to see jobs that they are most suited for with their current skill set and apply to any which take their interest.

The job market insights tool will have buttons that allow users to select common queries about the job market such as "most popular skills". These buttons would take the user to a report with information relevant to the question such as descriptions or visualuations. These reports could be partially or completely precomputed for performance reasons. Novel queries which could be entered into a search bar would invoke data analysis to acquire the information desired and generate a report. As there is a trade off between depth of analysis and detail, we plan on finding a good balance between these two goals.

<br>

## 2.2 User Characteristics and Objectives
This product is mainly intended for software engineers who are beginning their career path such as new graduates, young people aged 18 - 30 and engineers who are looking to make a career change. This user base will have a wide range of technical abilities and experience and as such the system will need to be accomodating to people of all levels of technical expertise. However we do expect our users to have a basic functional understanding of web applications and how to use them. We will also be exclusively targeting English speakers as the product will only be able to handle English language CVs and thus we will only have the application available in English. We also plan on focusing the analysis on the Irish job market.

From a user's perspective, using the system should be as straightforward as navigating to the URL using a modern web browser of their choice before uploading a CV, selecting or typing a search query. Unless the answer to the query has been precomputed, we expect that there  will be a short delay (No more than 30-40 seconds) as processing takes place before the screen changes to display the output information to the user. From here the user is free to navigate and explore the displayed information and interact with any interactive information displayed like navigating to job listing of jobs that were deemed the most suitable for them.
<br>

## 2.3 Operational Scenarios
<br>

### **User Accesses the Site**

![Use Case Diagram Showing User Visiting Site](./res/UC-Diagram-User-Visits-Page.png)

**Description**

A user will open their web browser of choice. Then they will type in the URL of the web application. Once complete the web browser will send a request to the web server which will respond with the home page of the application.

**Goal**

A user can access the website homepage using a web browser and an internet connection.

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

The user will be able to upload a CV that is stored on their computer in a PDF format. They will then press a button to submit this file and it will be uploaded to the server. After a brief processing time for the analysis the user will be presented with the results of the analysis. 

**Goal**

A user can upload a file, this file can be sent to the server and the user can view the results.

**Step-by-Step Interaction**

1. The user uploads the CV document file.
    *   This can either be done by dragging the file over the upload section on the website or by clicking a button which will open the user's file explorer where they can then select the file for upload
2. User presses the "Submit" button.
3. The user waits as the page displays a loading icon while the document is processed and analyzed.
4. The user is shown an screen displaying the results of analysis the CV.

<br>

### **User Selects a Common Search Query**

![Use Case Diagram Showing User Selecting Common Query](./res/UC-Diagram-User-Selects-Common-Query.png)

**Description**

A common precomputed search query is shown in a button. For example, a button could contain the text "Most popular programming languages in Ireland". Clicking the button causes a report for the query to be displayed.

**Goal**

A user can select a common search query and see the report associated with it.

**Step-by-Step Interaction**

1. The user clicks on the button containing the search query.
2. A new page containing a report related to the query is displayed. The page contains text and visualiations which are informative to the user.
3. The user closes the page.

<br>

### **User Searches for a Query**

![Use Case Diagram Showing User Selecting Common Query](./res/UC-Diagram-User-Searches-For-Query.png)

**Description**

The user types in a search query with a question related to the current job market for software engineers in Ireland. A report that answers the query is generated or found and the user reads the report. The report contains descriptions and visualisations that answer the user's query or inform them on a topic.

**Goal**

To allow users to search for queries about the current job market for software engineers and gather useful information related to the query.

**Step-by-Step Interaction**

1. The user types in a search query such as "Top programming languages in Ireland"
2. The system interprets the meaning of the query and the type of information that should be retrieved.
3. The system returns precomputed reports which are similar to the query or generates new reports that answer the query. In this example, the report "Most popular programming languages in Ireland" is similar to the question "Top programming languages in Ireland."
4. The user selects the report they would like to view and opens it.
5. The user closes the report after viewing it and returns to the home screen.

<br>

## 2.4 Constraints
Development of this system will have to abide by the following constraints.
* **Time constraints:** development and deployment of the project must be complete before April 2022.
* **Financial constraints:** the project will have little to no budget and thus will not be able to make use of any expensive services such as hosting or non-free development tools or subscriptions.
* **Processing constraints:** due to the aforementioned budget constraint the computing and storage capability of the server hardware will be limited.
* **Legal constraints:** the product will be taking in user data and thus the product must be in accordance with European and International regulations for data management, data storage and data protections.
* **Platform constraints:** the product is a web application and as such must be developed with modern browser capabilities in mind. These browsers will have different features and capabilities which the product must be able to adapt to for a consistent user experience. 
* **Traffic constraints:** due to budget and processing limitations the system will not be able to handle large amounts of users accessing the product at once.
\
\
<br>

# **3. Functional Requirements**
## 3.1 User Upload of CVs
**Description**
* A user of the system must be able to upload a CV or resume to the system and submit it for processing. The file must be encrypted during transport and sent over a secure connection as it will contain user personal information such as names and email addresses.

**Criticality**
* This feature is vital to the system as it is the system's only significant source of information about the user. Without this feature we cannot get critical data needed for analysis such as skills, employment history and technical knowledge.

**Technical Issues**
* There are two main technical challenges for this feature, the first is decoding a user's file from its initial file type (eg. PDF) into a standardised file format which can be sent to the server. The second challenge is to ensure that the information in the CV is kept secure when it is uploaded and transmitted to the server.

**Dependencies**
* This feature is dependent on the user having access to a web browser and an internet connection.

## 3.2 Parsing User Submitted CVs
**Description**
* The system must be able to parse a user submitted CV and identify and extract key data such as skills, technical knowledge, past employment, certifications, education and other important information. This will be carried out using machine learning based natural language processing.

**Criticality**
* This feature is necessary as this will be the main way that the system is able to gather data about users and this data will be essential for the analysis and review process which is the main functionality of the product.

**Technical Issues**
* The main technical issue faced with this feature will be related to natural language processing as it is quite difficult for a machine to automatically extract information from unstructured text and categorise it.

**Dependencies**
* This feature is dependent on the CV upload feature as it must be possible to first upload a CV before it can be parsed.

## 3.3 Gathering Job Posts
**Description**
The system must be able to automatically scrape job posts from websites such as Indeed and LinkedIn and store them in a performant and well-structured database. It should be possible to do this relatively quickly as the job market changes over time and information can quickly become outdated.

**Criticality**
* This feature is very important as job posts will be the system's primary source of information about the job market which the system will use to make evaluations and predictions and provide valuable insights for users.

**Technical Issues**
* The main technical challenge is scraping information quickly and reliably from a wide variety of sources which is necessary as many data sources do not have APIs for accessing them. On top of this, storing and managing this data in a reliable and consistent way in databases will also be a crucial technical challenge for this feature.

**Dependencies**
* This feature does not have any dependencies on any other features within the system and will serve as a standalone tool which will in the background to gather and feed data into the system.

## 3.4 Data Analysis of Job Posts and CVs
**Description**
* The system should gather job posts and other sources of information about the job market as well as the data extracted from the user's uploaded resume for data analysis to provide meaningful and useful insights to the user.

**Criticality**
* This feature is vital to the functionality of the application as without it the system would not be able to carry out any evaluations or extract information from data.

**Technical Issues**
* The main technical challenge is developing the various models and algorithms needed for combining and interpreting the data to make meaningful responses for the user.

**Dependencies**
* This feature is dependent on both the CV submission feature and the job market data gathering feature as these features will provide the necessary data for the analysis to take place.

## 3.5 Report Search and Generation
**Description**
The system should give users the ability to search for existing pre-generated reports which contain useful information about the job market and also to generate new data analysis reports based on user's search queries.

**Criticality**
This feature is necessary to make the insights gathered from job posts directly available to the user in the form of reports. The ability of users to supply input to the data analysis system is valuable as these inputs will guide the data analysis process and also inform the system on what kinds of information are most popular.

**Technical Issues**
The main technical challenge for this feature would be to extract the meaning of the user's query and find or generate reports relevant to it that contain information in a usable and readable format.

**Dependencies**
This feature is dependent on the job post gathering and data analysis phases as both of these features are required to generate analysis reports.

\
\
<br>

# **4. System Architecture**

The system is composed of three primary high-level components: a user-facing front end web application that provides the user interface of the application, a back end web server that will perform data analysis on CVs, user input and job posts stored in the database and a data gathering application that gathers job posts using APIs and scraping scripts.

User input in the form of a CV upload or text input can be passed to the back end server as JSON. The back end service will then perform data analysis on these inputs and any other necessary information stored in the database before sending insights in the form of a JSON response to the front end application after a processing delay.

As job market trends and job posting patterns change over time, it is important to regularly update the database. This can be done by the data source module consisting of APIs and scraping scripts which will update the database with fresh data at regular intervals.

<br>

![Architecture diagram](./res/system-architecture-diagram.png)

\
\
<br>

# **5. High-Level Design**

![Data Flow Diagram](./res/data-flow-diagram.png)

The data flow diagram above shows the major components of the system how they interact with each other and the kind of inputs and outputs each component receives or sends. The top of the diagram shows the user who interacts with the web application which is composed of two major features: the resume upload and insights page and the job postings insights page.

Users who choose to use the resume upload feature can upload their resumes for analysis. When a resume is uploaded, it is sent to the resume analyzer for processing. To analyze resumes, the resume analyzer will read job postings or precomputed insights from the database and use them to extract useful insights from resumes. These insights are then sent back to the user and displayed by the user interface in an intuitive and useful report that makes use of a combination of text and visualisations.

The job posting analysis service is the other major component of the system. Users can use this service by clicking buttons representing popular search queries or they may do their own searches. The resume analyzer is designed to process two types of queries: searches for information or searches for questions. In the former case, standard information retrieval techniques can be used to retrieve relevant documents. To answer questions, we plan on using AI to recognize the type of question asked. For example, "best rated companies" and "best paying companies" are similar in that they involve the evaluation of companies and may require the generation of a ranked list. Once the type of question has been identified, the contents of the search query can be used to infer the specific question that was asked. The AIs guess of the purpose of the question can be displayed to the user who can accept the question or try again.

\
\
<br>

# **6. Preliminary Schedule**
![Preliminary Gantt Chart](./res/Gantt.JPG)

The initial development plan for the project is as follows. We will begin by setting up the skeletons for the front and backend of the system. In this step we will generate any boiler plate code for technologies that we will be using such as React and Django. We are aiming to complete this first step by late November which will give us time to briefly start development before the DCU exam period. Starting in late November we will begin development by first building the various scrapers and API interfaces which will be used to gather and aggregate data about the job market from sources like Linkedin and Indeed. We will aim to get this data gathering step done before the exams but expect that there might be the risk of some overrun as exams draw near. Following the DCU exams in December we hope to get our database setup so that the data gathering system can store the data for use by later systems. Also starting in mid December will be the development and training work for the natural language processing engine which will be used to parse user's CVs, development on this feature is expected to run though to the start of January. With the completion of the NLP parser and the data gathering feature we should have all the data  we need to begin work on the analysis engine which would take us up until mid January. With this complete all that is left for the backend of the system will be the setting up the API endpoints so these features can be accessed from our frontend web app. Then  up until early February we plan to develop the frontend of the application focusing more on functionality and design rather than aesthetics. With both a preliminary front and backend complete we will spend the beginning to february carrying out end to end testing on the system to identify any bugs. Once the first round of testing is complete we will spend 2 weeks finalising and cleaning up the product. This will be followed by a final round of testing and debugging which will conclude in late February. With development wrapped up we will carry out the necessary automated and user testing to ensure the system is sound. And then we will spend the last 2 weeks focusing on the documentation for the system. This plan should have us finished a few days before the deadline on April 15th.

\
\
<br>

# **7. Appendices**

Natural Language Processing: https://www.ibm.com/cloud/learn/natural-language-processing

Web Scraping: https://en.wikipedia.org/wiki/Web_scraping

React Official Website: https://reactjs.org/

Django Official Website: https://www.djangoproject.com/

Indeed job listing website: https://ie.indeed.com/?r=us

LinkedIn: https://ie.linkedin.com/