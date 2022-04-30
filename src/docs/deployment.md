# Online Deployment Description
There is a Heroku app for the front end React application and a second Heroku app for running the FastAPI server.

The web address of the back end server is: `https://fourth-year-project-api.herokuapp.com`. If it is working correctly,
opening `https://fourth-year-project-api.herokuapp.com/status` should show `{"message":"Server is running"}` in the
browser.

The Heroku web address of the front end app is `https://fourth-year-project-front-end.herokuapp.com`
but it has a custom URL which named `http://resumeanalyzer.xyz` which is linked to the Heroku URL. If either of these links are working and opened, the resume upload page will be shown in the browser.

# Deployment Steps
## First Steps
Push changes to GitLab before deploying them to Heroku:

1. Make changes.
3. Commit changes: `git commit -a -m "new changes"`
2. Commit changes: eg.
- `git add changed-file`
- `git commit -m "file was changed"`
4. Push changes to GitLab: `git push origin master`

## Back End Deployment to Heroku
1. Set remote: `heroku git:remote -a fourth-year-project-api`
2. Check the Heroku remote: `git remote -v`
- It should say something like `fourth-year-project-api`
3. Push changes to Heroku:
- Force push `backend` directory (recommended): ``git push heroku `git subtree split --prefix src/backend master`:master --force``
- Push `backend` directory: `git subtree split --prefix src/backend master`


## Front End Deployment to Heroku
1. Set remote: `heroku git:remote -a fourth-year-project-front-end`
2. Check the Heroku remote: `git remote -v`
- It should say something like `fourth-year-project-front-end`
3. Push changes to Heroku:
- Force push `frontend` directory (recommended): ``git push heroku `git subtree split --prefix src/frontend master`:master --force``
- Push `frontend` directory: `git subtree split --prefix src/frontend master`

Links to test front end:
- `https://fourth-year-project-front-end.herokuapp.com`
