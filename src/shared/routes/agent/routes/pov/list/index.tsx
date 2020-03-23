import React, { useEffect, useReducer } from 'react';
import { Grid, SegmentGroup, Segment, Header, Table, Button, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePovRecord } from 'store/agent/actions';
import { Pager } from 'components/Pager';
import { getAllPovs } from 'services/pov';

const initialState = { page: 1, total: 0, offset: 0, items: [] };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'page_changed':
      return { ...state, page: action.page };
    case 'send_request':
      return { ...state, ...action.payload };
    default:
      throw new Error('未定义的 action');
  }
};

function ListRoute(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pageSize = 20;

  const { page, total, items, offset } = state;

  useEffect(() => {
    getAllPovs({ page, pageSize }).then(result => {
      if (result.isSuccess) {
        const { data, meta } = result.getValue() as any;
        console.log(data, meta);
        const newPage = Number(meta.offset) / Number(meta.limit) + 1;
        const newTotal = Number(meta.count);
        const newOffset = Number(meta.offset);

        if (newOffset !== offset || newTotal !== total || newPage !== page)
          dispatch({
            type: 'send_request',
            payload: {
              page: Number(meta.offset) / Number(meta.limit) + 1,
              total: Number(meta.count),
              items: data,
              offset: newOffset,
            },
          });
      }
    });
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
              {items.length ? (
                <Segment>
                  <Table striped celled compact textAlign="center">
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>日期</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>资产净值</Table.HeaderCell>
                        <Table.HeaderCell>持仓比例</Table.HeaderCell>
                        <Table.HeaderCell>上证指数</Table.HeaderCell>
                        <Table.HeaderCell>操作</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {items.map((item: any, index: any) => (
                        <Table.Row key={index}>
                          <Table.Cell>{item.record_date}</Table.Cell>
                          <Table.Cell>{item.base_id}</Table.Cell>
                          <Table.Cell>{item.net_worth}</Table.Cell>
                          <Table.Cell>{item.position_ratio}</Table.Cell>
                          <Table.Cell>{item.szzs}</Table.Cell>
                          <Table.Cell>
                            {/* <Link to={`/agent/pov/${item.base_id}`} title="编辑"> */}
                            <Link
                              to={{
                                pathname: `/agent/pov/${item.base_id}`,
                                state: {
                                  ...item,
                                },
                              }}
                              title="编辑"
                            >
                              <Icon color="blue" name="edit" />
                            </Link>
                            <Link
                              to="/"
                              onClick={() => props.dispatch(deletePovRecord(item.base_id))}
                              data-id={item.base_id}
                              title="删除"
                            >
                              <Icon color="red" name="trash alternate" />
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell colSpan="6">
                          <Pager
                            onHandlePageChange={page => dispatch({ type: 'page_changed', page })}
                            defaultActivePage={page}
                            totalPages={Math.ceil(total / pageSize)}
                          />
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
