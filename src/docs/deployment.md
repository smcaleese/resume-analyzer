## Back End Deployment With Heroku
1. Make changes to the server
2. Go to the root directory of the project
3. Commit changes: `git commit -a -m "new changes"`
4. Push changes to GitLab: `git push origin master`
5. Set remote: `heroku git:remote -a fourth-year-project-api`
6. Push changes to Heroku: `git subtree push --prefix src/backend heroku master`

Link to test server in browser: `https://fourth-year-project-api.herokuapp.com/status`

Response should be `{"message":"Server is running"}`

## Front End Deployment
1. Set remote: `heroku git:remote -a fourth-year-project-front-end`
