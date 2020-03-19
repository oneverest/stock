import React, { useState, useEffect } from 'react';
import { Grid, SegmentGroup, Segment, Header, Table, Button, Icon, Pagination, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getAllPovs } from 'services/pov';
import { connect } from 'react-redux';

function ListRoute() {
  const [items, setItems] = useState<any[]>([]);

  // useEffect(async () => {
  //   const result = await getAllPovs({ page: 1, pageSize: 20 });
  // });
  return (
    <React.Fragment>
      <Grid className="list1" columns="equal" stackable padded textAlign="left">
        <Grid.Row>
          <Grid.Column width="16">
            <SegmentGroup>
              <Segment className="list1-header">
                <Header as={'h5'}>资产净值表</Header>
                <Button className="btn" as={Link} to="/agent/pov/add" primary size="small" floated="right">
                  创建记录
                </Button>
              </Segment>
              {items.length ? (
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
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </Segment>
              ) : (
                <Segment className="list1-no-content">
                  <Container fluid text textAlign="center">
                    空数据
                  </Container>
                </Segment>
              )}
            </SegmentGroup>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    page: state.page,
  };
};

export default connect(mapStateToProps)(ListRoute);
