import React, {useState, createRef} from 'react';
import {UserStatistics} from './operations.graphql';
import {Grid, Ref, Menu, Rail, Progress, Segment, Header, Statistic} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import Subscription from '../Subscription';


const StatsRail = ({currentUser}) => {
    const getTopCategory = ({categories}) =>  (
        categories.sort((a,b) => a.categoryTotal > b.categoryTotal)[0]
    )
    const getMostCompletedCategory = ({categories}) => (
        categories[0]
    )
    const getLeastCompletedCategory = ({categories}) => (
        categories[categories.length - 1]
    )
    return(
        <div style={{paddingTop: '20px', backgroundColor: 'white', flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Query query={UserStatistics} variables={{'userId': currentUser.id}}>
                {({data, loading, subscribeToMore}) => {
                    // debugger
                    console.log('[StatsRail] data and loading: ', data, loading)
                    if(loading) return null;
                    else if(!loading && data){
                        const {statistics} = data;
                        const topCategory = getTopCategory(statistics);
                        const mostCompleted = getMostCompletedCategory(statistics);
                        const leastCompleted = getLeastCompletedCategory(statistics);
                        return(
                            <div style={{flex: 1}}>
                                <Statistic.Group widths={2} style={{justifyContent:'center'}} size='small'>
                                <Statistic size={'mini'}>
                                    <Statistic.Value>{statistics.completedCount}</Statistic.Value>
                                    <Statistic.Label>Completed Tasks</Statistic.Label>
                                </Statistic>
                                <Statistic size={'mini'} floated='left'>
                                    <Statistic.Value>{statistics.totalCount}</Statistic.Value>
                                    <Statistic.Label>Total Tasks</Statistic.Label>
                                </Statistic>
                                </Statistic.Group>
                                <Segment.Group compact>
                                <Segment style={{padding: '16px'}}>
                                    <Header as='h3' floated="left">Your top category:</Header>
                                    <Statistic size="mini" floated="right">
                                    <Statistic.Value>{topCategory.category}</Statistic.Value>
                                    </Statistic>
                                </Segment>
                                <Segment size='large'>
                                    <div style={{display:'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
                                        <Header as='h3' floated="left">
                                            Most completed category:
                                        </Header>
                                        <Statistic size="mini" floated="right">
                                        <Statistic.Value>{mostCompleted.category}</Statistic.Value>
                                        </Statistic>
                                    </div>
                                
                                    <Progress 
                                        style={{margin: '0px'}}
                                        value={mostCompleted.categoryCompleted} 
                                        total={mostCompleted.categoryTotal} 
                                        progress='ratio' 
                                        color='green'/>
                                </Segment>
                                <Segment size='large'>
                                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Header as='h3' floated="left">
                                            Least completed category:
                                        </Header>
                                        <Statistic size="mini" floated="right">
                                        <Statistic.Value>{leastCompleted.category}</Statistic.Value>
                                        </Statistic>
                                    </div>
                                    <Progress 
                                        style={{margin: '0px'}}
                                        value={leastCompleted.categoryCompleted} 
                                        total={leastCompleted.categoryTotal} 
                                        progress='ratio' 
                                        color='red'/>
                                   
                                </Segment>
                                </Segment.Group>
                            </div>
                        )
                    }
                   
                }}
            </Query>
        </div>
    )
}

export default StatsRail;