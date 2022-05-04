import { rest } from 'msw'
import { setupServer } from 'msw/node'

const soft_skill_counts = {
    'Agile': 5,
    'Communication': 3,
    'Collaboration': 6
}

const years_of_experience_counts = [1, 2, 5, 4, 1]

const location_counts = {
    'Dublin': 25,
    'Cork': 6,
    'Athlone': 3
}

const skills = [
    {
        name: 'Python',
        color: '220,91,91',
    },
    {
        name: 'SQL',
        color: '229,91,91',
    },
]

const skill_counts = {
    'software': { 'Java': 5 },
    'fullstack': { 'NodeJS': 2},
    'backend': { 'Spring': 15 },
    'frontend': { 'ReactJS': 12 },
    'devops': { 'Jenkins': 6 },
    'qa': { 'Junit': 8 },
    'mobile': { 'Android': 5 },
    'ds': { 'Pandas': 4 },
    'ml': { 'PyTorch': 6 },
    'other': { 'GraphQL': 1 }
}

const jobs = [
    {
        company: 'Salesforce',
        title: 'Software Engineer',
        description: 'Salesforce is a leading developer of software',
        requirements: [
            'SQL',
            'Python', 
            'CSS'
        ],
        skill_match: [
            'SQL'
        ],
    },
    {
        company: 'Meta',
        title: 'Front End Engineer',
        description: 'Meta is a leading developer of software',
        requirements: [
            'HTML',
            'ReactJS',
            'JavaScript'
        ],
        skill_match: [
            'HTML',
            'ReactJS',
            'JavaScript'
        ]
    }
]

const resume_score = {
    'overall_scores': {'frontend': 37, 'ds': 27, 'ml': 17, 'fullstack': 33, 'qa': 25, 'backend': 21, 'devops': 20, 'mobile': 24, 'software': 41},
    'skill_scores': {'frontend': 47, 'ds': 32, 'ml': 18, 'fullstack': 41, 'qa': 30, 'backend': 24, 'devops': 22, 'mobile': 28, 'software': 54},
    'length_score': 16
}

const recommendations = [
    {
        'lhs': [
            'Spring'
        ],
        'rhs': 'Microservices',
        'lift': 2.9206349206349205,
        'support': 0.03770491803278689
    },
    {
        'lhs': [
            'CSS'
        ],
        'rhs': 'AngularJS',
        'lift': 2.578884004815634,
        'support': 0.061885245901639345
    }
]

const getPathData = () => {
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

    const data = roles.reduce((acc, role) => {
        acc[role] = skill_counts
        return acc
    }, {})
    
    return data
}

export const server = setupServer(
    rest.post('http://localhost:8000/resume-upload', (req, res, ctx) => {
        return res(
            ctx.json({ skills, recommendations, skill_counts, jobs, resume_score })
        )
    }),
    rest.post('https://resume-analyzer-api.com/resume-upload', (req, res, ctx) => {
        return res(
            ctx.json({ skills, recommendations, skill_counts, jobs, resume_score })
        )
    }),
    rest.get('https://resume-analyzer-api.com/report-data', (req, res, ctx) => {
        return res(
            ctx.json({ skill_counts, soft_skill_counts, years_of_experience_counts, location_counts })
        )
    }),
    rest.get('http://localhost:8000/report-data', (req, res, ctx) => {
        return res(
            ctx.json({ skill_counts, soft_skill_counts, years_of_experience_counts, location_counts })
        )
    }),
    rest.get('https://resume-analyzer-api.com/path-data', (req, res, ctx) => {
        const pathData = getPathData()
        return res(
            ctx.json(pathData)
        )
    }),
    rest.get('http://localhost:8000/path-data', (req, res, ctx) => {
        const pathData = getPathData()
        return res(
            ctx.json(pathData)
        )
    })
)

// docs: https://mswjs.io/docs/getting-started/integrate/node
