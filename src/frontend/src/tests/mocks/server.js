import { rest } from 'msw'
import { setupServer } from 'msw/node'

const skills = [
    {
        name: 'SQL',
        color: '229,91,91',
    }
]

const skill_counts = {
    'JavaScript': 1,
    'Python': 2,
    'SQL': 4,
    'CSS': 3,
}

const jobs = [
    {
        company: 'Salesforce',
        title: 'Software Engineer',
        description: 'Salesforce is a leading developer of software',
        requirements: ['SQL', 'Python', 'CSS'],
        skill_match: ['SQL'],
    }
]

const years_of_experience_counts = [1, 2, 5, 4, 1]

const resume_score = {
    'overall_score': 50, 
    'skill_score': 50,
    'length_score': 50 
}

const recommendations = []

export const server = setupServer(
    rest.post('http://localhost:8000/resume-upload', (req, res, ctx) => {
        return res(
            ctx.json({ skills, recommendations, skill_counts, jobs, resume_score })
        )
    }),
    rest.get('http://localhost:8000/report-data', (req, res, ctx) => {
        return res(
            ctx.json({ skill_counts, jobs, years_of_experience_counts })
        )
    }),
    rest.get('http://localhost:8000/path-data', (req, res, ctx) => {
        const roles = [
            'Junior Frontend Developer',
            'Senior Frontend Developer',
            'Junior Backend Developer',
            'Senior Backend Developer',
            'Junior Full Stack Developer',
            'Full Stack Developer',
            'Senior Full Stack Developer',
            'QA Engineer',              
            'Senior QA Engineer',
            'Business Analyst',      
            'Development Lead',  
            'Software Architect',
            'Product Owner',              
            'Project Manager',    
            'Devops',              
            'Senior Devops',              
            'Automation Engineer',
            'Cloud Engineer',              
            'Database Admin (DBA)'
        ]

        const response = roles.reduce((acc, role) => {
            acc[role] = skill_counts
            return acc
        }, {})

        return res(
            ctx.json(response)
        )
    })
)

// docs: https://mswjs.io/docs/getting-started/integrate/node
