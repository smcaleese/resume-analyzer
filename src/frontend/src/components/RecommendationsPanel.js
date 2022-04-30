import React, { useContext } from 'react'
import DisplayCard from './DisplayCard'
import styled from 'styled-components'
import { AppContext } from '../App'
import { StyledSkillBadge } from './SkillsDisplayPanel'

const RecommendationsPanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skills, recommendations } = appState.resultsData

    const getSkillColor = (name) => {
        const resumeSkillMatch = skills.find((skill) => name.toLowerCase() === skill.name.toLowerCase())
        return resumeSkillMatch ? resumeSkillMatch.color : '187,187,187'
    }

    return (
        <DisplayCard header='Skill Recommendations' className={className}>
            {recommendations.map((rec, index) => {
                return (
                    <div className='rec-item' key={index}>
                        {rec.lhs.map((skill, i) => {
                            if (i === rec.lhs.length - 1) {
                                return (
                                    <StyledSkillBadge key={i} skill={skill} color={getSkillColor(skill)} />
                                )
                            }
                            else {
                                return (
                                    <span key={i}>
                                        <StyledSkillBadge skill={skill} color={getSkillColor(skill)} />
                                        +
                                    </span>
                                )
                            }
                        })}
                        &rarr;
                        <StyledSkillBadge key={index} skill={rec.rhs} color={getSkillColor(rec.rhs)} />
                    </div>
                )
            })}
        </DisplayCard>
    )
}

export default styled(RecommendationsPanel)`
    overflow: scroll;
    height: 100%;

    .rec-item {
        padding: 0.2em 0 0.2em 0;
        border-bottom: 1px solid  rgba(187,187,187,0.8);
    }
`
