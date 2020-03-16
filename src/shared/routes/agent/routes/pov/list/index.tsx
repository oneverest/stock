import React from 'react';
import { Grid, SegmentGroup, Segment, Header, Table, Button, Icon, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function ListRoute() {
  return (
    <React.Fragment>
      <Grid columns="equal" stackable padded textAlign="left">
        <Grid.Row>
          <Grid.Column width="16">
            <SegmentGroup>
              <Segment>
                <Header as={'h5'}>资产净值表</Header>
              </Segment>
              <Segment>
                <Table striped celled compact textAlign="center">
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>日期</Table.HeaderCell>
                      <Table.HeaderCell>资产净值</Table.HeaderCell>
                      <Table.HeaderCell>持仓比例</Table.HeaderCell>
                      <Table.HeaderCell>上证指数</Table.HeaderCell>
                      <Table.HeaderCell>操作</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>12</Table.Cell>
                      <Table.Cell>2019-03-22</Table.Cell>
                      <Table.Cell>1.0</Table.Cell>
                      <Table.Cell>0.7</Table.Cell>
                      <Table.Cell>2000.12</Table.Cell>
                      <Table.Cell>
                        <Link to="/agent/pov/123" title="编辑">
                          <Icon color="blue" name="edit" />
                        </Link>
                        <Link to="/" onClick={() => console.log(123)} data-id={123} title="删除">
                          <Icon color="red" name="trash alternate" />
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell colSpan="6">
                        <Pagination defaultActivePage={1} totalPages={5} />
                        <Button primary size="small" floated="right">
                          创建记录
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Segment>
            </SegmentGroup>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}
