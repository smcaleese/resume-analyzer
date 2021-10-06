# School of Computing &mdash; Year 4 Project Proposal Form

> Edit (then commit and push) this document to complete your proposal form.
> Make use of figures / diagrams where appropriate.
>
> Do not rename this file.

## SECTION A

|                     |                            |
| ------------------- | -------------------------- |
| Project Title:      | Job Posting Insights (???) |
| Student 1 Name:     | Darragh McGonigle          |
| Student 1 ID:       | xxxxxx                     |
| Student 2 Name:     | Stephen McAleese           |
| Student 2 ID:       | 18921756                   |
| Project Supervisor: | Michael Scriney            |

> Ensure that the Supervisor formally agrees to supervise your project; this is only recognised once the
> Supervisor assigns herself/himself via the project Dashboard.
>
> Project proposals without an assigned
> Supervisor will not be accepted for presentation to the Approval Panel.

## SECTION B

> Guidance: This document is expected to be approximately 3 pages in length, but it can exceed this page limit.
> It is also permissible to carry forward content from this proposal to your later documents (e.g. functional
> specification) as appropriate.
>
> Your proposal must include *at least* the following sections.


### Introduction

> Describe the general area covered by the project.

We want to set out to develop a tool which will evaluate the quality of an uploaded resume and display analytical data for the job market. This application would be a web app with 2 distinct sections (1 for market analysis and 1 for resume upload).

### Outline

> Outline the proposed project.

With this tool we want to make something which will help users find jobs and progress through their careers. The plan is to have a user upload resume which will then be parsed for skills characteristics and other key qualities, these will then be analysed against the market data to see what skills and certifications would be most beneficial and improve the value of the employee in the eyes of the market. On top of this market based evaluation we would also conduct linguistic analysis to check and correct for errors (spelling and grammar), determine sentiment and tonality and calculate reading level. Once complete the user will receive feedback on how to improve their CV and they will be presented with the most applicable jobs (Jobs which ask for skills and qualities that the user mentions in their resume)

### Background

> Where did the ideas come from?

We knew we wanted to make something which would solve a real problem we were facing in our lives, and with our time in college drawing to a close we have both got a first hand experience of the job market and how confusing and difficult it can be to identify what companies want and how time consuming it can be to sift through hundreds to job listings.
With this we hope to address this issue by making relevant jobs easy to find and make ourselves (and our users) more interesting candidates to potential employers by identifying in demand skills and having a very solid resume.

### Achievements

> What functions will the project provide? Who will the users be?

We really want to make this tool as broadly useful to both first time applicants starting out on their career path as well as established professionals looking to make the next step. We aim to do this by having features which we feel will be universally beneficial to both these sets of users.

Features:

1. **Job market analysis:**

- Identify skills and keywords from job listings
- Classify jobs based on relation to a field
- Search job listings
- Current state (What's popular now)
- Market trends (What’s up and coming and will be popular in the future)

2. **Resume helper:**

- Identify skills and keywords from resume
- Error correction for spelling and grammar
- Tone and sentiment classification
- Readability level
- Career Progression Tree

### Justification

> Why/when/where/how will it be useful?

We believe that this tool will serve as a great guide for all those looking to start or advance their career. It will help people prioritise skills and learning to be most applicable to the wants and needs of employers and will help cut down on time wasted searching and applying for jobs a user is not qualified for.
We think it will be particularly useful for graduate students looking to start their careers because as people in that position it is often unclear exactly what the correct next step is and a tool which could offer help and guidance throughout your career progression would be very useful.

### Programming language(s)

> List the proposed language(s) to be used.

As mentioned previously we plan to make a web application with a lot of machine learning components in the backend. For this we have decided to use a React based frontend as we both have previous experience with that language and both enjoy it and want to progress our knowledge further. Then for the backend we would ideally use Python as it has lots of support for machine learning and data science which we know will be a critical part of the project.

### Programming tools / Tech stack

> Describe the compiler, database, web server, etc., and any other software tools you plan to use.

**React**

React is a library for JavaScript developed by Facebook and allows for a component based approach to web design as well as easy management of complex state and DOM updates.

**NodeJS**

Node is a server side JS runtime environment which will enable us to deploy and run our react web app on a server so it can be accessed externally.

**Django / Flask / Fast API**

Python library for developing restful web APIs which will be needed for communication between our React application and our server.

**Jest**

React testing framework which will allow use to make write unit tests for our frontend React app.

**PostgreSQL**

PostgreSQL is a SQL based database management system which is what we plan to use for storing our data for our application

### Hardware

> Describe any non-standard hardware components which will be required.

There should be no need for any non-standard hardware for the development or deployment of the application. That being said we will make use or a cloud hosting provider such as Amazon EC2 to deploy the application for use.

### Learning Challenges

> List the main new things (technologies, languages, tools, etc) that you will have to learn.

There are lots of new skills that will need to be learned for this project and some old skills which will need to be refined and improved should we hope to achieve our goal.
In terms of new skills, we will need to learn how to develop and employ machine learning models for features such as parsing for keywords, sentiment analysis, error correction and for many other areas of the project. We will also need to learn effective data storage and data management techniques as we have never dealt with the volumes of data which will be needed to both train machine learning models and storage of market data for analysis and display. We will also need to learn how to develop effective search algorithms for retrieving job listings from our data store. Lastly we will need to learn data mining techniques for gathering data from multiple sources. This will most likely involve a mixture of API usage and web scraping to build data sets which we can use.
Now for skills which will need to be improved, React is a big one as it will make up the front end of our application and we hope to deliver a solid and reliable application built with best practices. We also need to improve our knowledge of web APIs both developing and using them. We have some experience with web APIs from past projects and INTRA but they were in Java with Spring so learning how to do it in Python will be a new challenge.

### Breakdown of work

> Clearly identify who will undertake which parts of the project.
>
> It must be clear from the explanation of this breakdown of work both that each student is responsible for
> separate, clearly-defined tasks, and that those responsibilities substantially cover all of the work required
> for the project.

We have chosen not to do a simple frontend backend split for the division of work as for this project a lot of the learning and technical challenge will take place in the backend and we both want to get the experience and knowledge which comes from tackling the harder problems. 
As such we found on our last project that splitting work by feature rather than by layer enables a more agile development workflow enabling us to be more responsive to new ideas. This approach does rely heavily on using proper agile software tracking tools such as Trello or Jira to track work balance and to monitor progress.

#### Darragh McGonigle

> *Student 1 should complete this section.*

#### Stephen McAleese

> *Student 2 should complete this section.*

As stated above we will be using a feature based division so I will be responsible for the linguistic analysis features such as error correction, sentiment analysis and readability analysis.
 I will also take part in data sourcing by writing code to utilise APIs or scrape certain websites such as Indeed.com and Stackoverflow for data for analysis. I will also be responsible for generating the dataset needed to train models for the linguistic features above.
I will also be developing the front end CV upload and results display for the features listed above. As Well as developing the testing for the features as well
