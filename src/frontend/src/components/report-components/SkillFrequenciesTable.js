
import React, { useContext } from 'react'
import styled from 'styled-components'
import DisplayCard from '../DisplayCard'
import { Table } from 'react-bootstrap'
import { AppContext } from '../../App'
import LoadingSpinner from '../LoadingSpinner'
import { roles } from '../../constants'
import RoleDropdown from '../RoleDropdown'

const SkillFrequenciesPanel = ({ className }) => {
    const { appState } = useContext(AppContext)
    const { skill_counts: skillCounts } = appState.reportsData

    if (!skillCounts) {
        return <LoadingSpinner />
    }

    const roleKey = roles[appState.role]
    const roleSkillCounts = skillCounts[roleKey]
    const sortedSkillCounts = Object.entries(roleSkillCounts).sort((a, b) => b[1] - a[1]).slice(0, 50)

    const infoDescription = 'Keyword counts from job posts.'

    return (
        <DisplayCard
            className={className}
            header='Job post skill frequencies'
            info={infoDescription}
            height='max(710px, 40vh)'
            roleDropdown={<RoleDropdown />}
        >
            <div className='count-table'>
                <Table responsive='sm' size='sm'>
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSkillCounts.map(([skill, count], index) => {
                            return (
                                <tr key={index}>
                                    <td>{skill}</td>
                                    <td>{count}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </DisplayCard>
    )
}

export default styled(SkillFrequenciesPanel)`
    .count-table {
        overflow-y: auto;
        padding: 0px 40px;
    }
`