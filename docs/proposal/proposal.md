# School of Computing &mdash; Year 4 Project Proposal Form

## SECTION A

|                     |                                 |
| ------------------- | ------------------------------- |
| Project Title:      | Job Posting and Resume Analyzer |
| Student 1 Name:     | Darragh McGonigle               |
| Student 1 ID:       | 18316121                        |
| Student 2 Name:     | Stephen McAleese                |
| Student 2 ID:       | 18921756                        |
| Project Supervisor: | Michael Scriney                 |

## SECTION B


### Introduction

A common problem faced students and job seekers in the field of Software Engineering is finding out which skills are most in-demand and whether their resume contains the skills that are relevant to the current job market. Traditionally, acquiring insights on skills involved reading dozens of resume's which can take a long time and doesn't scale well. Evaluating resume's was and still is often done manually which can be slow and expensive.

Our 4th year project seeks to automatically gather insights from Software Engineering job posts from sites such as Indeed and resumes to quickly and cheaply provide the insights job seekers and students need to succeed in the job market.

### Outline

Our project is composed of two components: an application that obtains insights on skills and industry trends from large numbers of job posts from websites like Indeed and a tool that allows users to evaluate the quality of their resumes and suggest improvements.

To acquire valuable insights on the Software Engineering job market, we plan to ingest large numbers of job posts from websites such as Indeed and LinkedIn. This can be done via their APIs or using web scraping. We plan to store this data in a large SQL database. It can then be scraped and analyzed using statistical and machine learning methods to extract relevant and valuable insights about the kind of skills that are currently desired in the job market today.

The second feature is to give the user the ability to upload their resume for analysis and evaluation. Once the resume is uploaded, it will then be parsed for skills and other key qualities. These will then be analysed against the market data to see what skills and certifications would be most beneficial and improve the value of the employee in the eyes of the market. We also intend to conduct linguistic analysis to check and correct for errors (spelling and grammar), determine sentiment and tonality and calculate the reading level required to read the resume. Once the resume analysis is complete, users will receive feedback on how to improve their resume and they could then be presented with the most applicable jobs (Jobs which ask for skills and qualities that the user mentions in their resume).

### Background

This project idea was inspired by several real-world problems that we were facing as students and job seekers. With our time in college drawing to a close we have both got a first-hand experience of the job market and how confusing and time-consuming it can be to identify the skills companies want by reading through dozens of resumes. We also found evaluating our own resumes challenging as it wasn't clear how they could be improved.

By developing this project, we hope to make it much easier and simpler to identify the most valuable skills required for software engineers today and improve our resumes. 

### Achievements

We really want to make this tool as broadly useful to both first time applicants starting out on their career path as well as established professionals looking to make the next step. We aim to do this by having features which we feel will be universally beneficial to both these sets of users.

Features:

1. **Job market analysis:**

- Identify skills and keywords from job listings
- Classify jobs based on relation to a field
- Search job listings
- Current state (What's popular now)
- Market trends (past and future changes in demand for skills)
- Display these insights with intuitive and insight data visualizations

2. **Resume helper:**

- Error correction for spelling and grammar

- Identify skills and keywords from resume
- Tone and sentiment classification
- Readability level
- Suggest skills that should be added to increase employability
- Evaluate the overall quality of the resume with a score

3. **Other ideas:**

- Career Progression Tree

### Justification

We believe that this tool will serve as a great resource for those looking to start or advance their career. It will help people choose and prioritise learning the skills that are most valuable in the software industry today and get an idea of how prepared they are to start or grow their careers.

We think these tools will be most useful for graduates looking to start their careers as they usually have less industry experience and thus have less of an idea of what skills are desired in industry.

### Programming language(s)

Our project will be implemented as a web application composed of a frontend application for processing UI events and displaying information and a backend service that will handle requests and perform the data analysis required to gather insights and evaluate resumes. 

We have decided create our frontend using ReactJS as we both have previous experience with the popular Javascript library. Since ReactJS is commonly used in industry, we also believe using it in our project will give us the opportunity to practice this valuable skill.

Since our backend service will need to perform machine learning and other forms of data analysis, we've decided to write it in Python as the language has a large collection of useful libraries for these tasks and is generally considered to be the industry-standard language for this area. Another advantage of using Python is that we both have a large amount of experience using the language in university and therefore expect to be highly productive using it.

### Programming tools / Tech stack

**ReactJS**

ReactJS is a popular JavaScript library that was created by Facebook. It seamlessly combines HTML, Javascript and CSS and allows a component-based approach to user interface implementation as well as easy management of complex state and DOM updates.

**NodeJS**

NodeJS is a server-side Javascript runtime environment which will enable us to deploy and run our React web app on a server so that it can be accessed externally.

**Django / Flask / Fast API**

Python libraries for developing RESTful web APIs which will be used to create our server which will communicate with the React application by processing requests from users and sending back information to fulfil these requests.

**Jest**

React testing framework which will allow us to write unit tests for our frontend React app.

**PostgreSQL**

PostgreSQL is an SQL-based database management system which we plan to use for storing our data for our application.

### Hardware

There should be no need for any non-standard hardware for the development or deployment of the application. 

With the advent of cloud hosting and storage, it is no longer necessary to have on-site server hardware. We plan to make use of a cloud hosting provider such as Amazon EC2 to deploy the application for use.

### Learning Challenges

There are lots of new skills that will need to be learned for this project and some old skills which will need to be refined and improved to achieve our goals.

In terms of new skills, we will need to learn methods of sourcing the data our application needs such as web scraping and API usage. We will need to learn effective data storage techniques to handle the large volumes of data which will be needed for later data analysis and to enable the efficient retrieval of relevant information from our data store. We will need to learn machine learning and data analysis approaches for extracting meaningful and valuable information from the data we collect and to implement features such as the parsing of keywords, sentiment analysis, error correction and many others. We will also need to learn how to develop effective search algorithms for retrieving job listings from our data store.

Existing skills that will need to be improved include React, API development for our server and skills related to Python. React is a big one as it will make up the front end of our application and we hope to deliver a solid and reliable application built with best practices. We also need to improve our knowledge of web APIs - both developing and using them. We have some experience with web APIs from past projects and INTRA but they were in Java with Spring so learning how to do it in Python will be a new challenge. Finally, although we both have extensive experience using Python, our experience using the language in the context of machine learning and data analysis is limited so we will need to learn how the language is used for those tasks.

### Breakdown of work

We have chosen not to do a simple frontend backend split for the division of work as for this project a lot of the learning and technical challenge will take place in the backend and we both want to get the experience and knowledge that comes from tackling the harder problems. 

As such, we found in our last project that instead splitting work by feature gave both of us the opportunity to learn a variety of different technologies while still giving us the opportunity to work separately which simplified version control and increased productivity by allowing us to focus on one thing at a time. 

To manage tasks and track progress, we expect to use git version control, Trello and the Jira project management software which are both widely used in industry.

As requirements and plans change, it's not possible to know exactly how work will be divided. Nevertheless, we have an idea of the overall high-level features each of us would like to focus on. Below is an approximate division of features and responsibilities between each student. Note that although the features listed below indicate the areas where a student will be a primary contributor, due to the collaborative nature of the project it is unlikely that a given feature will be worked on exclusively by one student. Thus, more granular approaches to work-sharing such as Jira will be necessary.

#### Darragh McGonigle

- Gather job posts from Indeed and other sources
- Design and create the database needed to store important data
- Resume UI: create the user interface needed to upload resumes and to display evaluation metrics after a resume has been evaluated.
- Resume analysis: analyze resumes, evaluate their quality and evaluate them by comparing the skills found in each resume with industry trends.

#### Stephen McAleese

- Gather job posts from LinkedIn and other sources
- Job insights UI: create the user interface needed for users to visualize and understand insights related to industry skill trends.
- Job insights analysis: extract useful insights on skills and industry trends from large numbers of job posts.
