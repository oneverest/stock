import React, { useEffect } from 'react';
import { Grid, SegmentGroup, Segment, Header, Table, Button, Icon, Pagination, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPovsAction } from 'store/agent/actions';

function ListRoute(props: any) {
  console.log('listRoute:', props);

  useEffect(() => {
    props.dispatch(getAllPovsAction({ page: 1 }));
  });
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
              {props.info.data.length ? (
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
                      {props.info.data.map((item: any, index: any) => (
                        <Table.Row key={index}>
                          <Table.Cell>{item.base_id}</Table.Cell>
                          <Table.Cell>{item.record_date}</Table.Cell>
                          <Table.Cell>{item.net_worth}</Table.Cell>
                          <Table.Cell>{item.position_ratio}</Table.Cell>
                          <Table.Cell>{item.szzs}</Table.Cell>
                          <Table.Cell>
                            <Link to={`/agent/pov/${item.base_id}`} title="编辑">
                              <Icon color="blue" name="edit" />
                            </Link>
                            <Link to="/" onClick={() => console.log(123)} data-id={123} title="删除">
                              <Icon color="red" name="trash alternate" />
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))}
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
    info: state.agent.pov_list,
  };
};

export default connect(mapStateToProps)(ListRoute);
