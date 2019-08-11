import React from 'react';
import { PageWidthContainer, Row, Col } from './Grid';
import { Header, Text } from './Typography';
import Spacing from './Spacing';
import Currency from './Currency';
import Button from './Button';
import { TimeProgress, addGameTime } from './Time';
import TabMenu from './TabMenu';
import Notice from './Notice';

class Work extends React.Component {
  render() {
    const { activeTasks, jobs, onWorkRequested, cashEarned, tasksCompleted } = this.props;

    return (
      <PageWidthContainer>
        <Row>
          <Col width={12}>
            <Spacing top={3}>
              <Header>Work</Header>
            </Spacing>
          </Col>
        </Row>
        <Row>
          <Col width={12}>
            <Spacing bottom={1}>
              <Text>Earn money to buy stocks and other items.</Text>
            </Spacing>
          </Col>
        </Row>

        {tasksCompleted > 0 && (
          <Row>
            <Col width={12}>
              <Notice>
                <Text>
                  You earned <Currency n={cashEarned} /> from {tasksCompleted} job(s)!
                </Text>
              </Notice>
            </Col>
          </Row>
        )}

        {jobs.map((job) => (
          <Row key={job.id}>
            <Col width={6}>
              <Text>{job.title}</Text>
            </Col>
            <Col width={3}>
              <Text>
                <Currency n={job.cashPerHour} /> / hr
              </Text>
            </Col>
            {!activeTasks[job.id] && (
              <Col width={3}>
                <Button onClick={() => onWorkRequested(job, Date.now(), 1)}>Work</Button>
              </Col>
            )}
            {activeTasks[job.id] && (
              <TimeProgress
                startTime={activeTasks[job.id].startTime}
                endTime={activeTasks[job.id].endTime}
              />
            )}
          </Row>
        ))}

        <TabMenu />
      </PageWidthContainer>
    );
  }
}

export default Work;
