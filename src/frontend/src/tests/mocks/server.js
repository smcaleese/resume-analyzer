import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(
    rest.post('http://localhost:8000/resume-upload', (req, res, ctx) => {
        return res(
            ctx.json({
                skills: [
                    {
                        name: 'SQL',
                        color: '229,91,91',
                    }
                ],
                skill_counts: {
                    'JavaScript': 1,
                    'Python': 2,
                    'SQL': 4,
                    'CSS': 3,
                },
                jobs: [
                    {
                        company: 'Salesforce',
                        title: 'Software Engineer',
                        description: 'Salesforce is a leading developer of software',
                        requirements: ['SQL', 'Python', 'CSS'],
                        skill_match: ['SQL'],
                    }
                ],
                years_of_experience_counts: [1, 2, 5, 4, 1],
            })
        )
    })
)

// docs: https://mswjs.io/docs/getting-started/integrate/node
