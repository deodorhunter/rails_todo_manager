import React, {useState, createRef} from 'react';
import {UserStatistics} from './operations.graphql';
import {Grid, Ref, Menu, Button, Progress, Segment, Header, Statistic} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import StatsSubscription from '../StatsSubscription';


const StatsRail = ({currentUser, data, loading, goToReport}) => {
    const getTopCategory = ({categories}) =>  (
        categories.sort((a,b) => a.categoryTotal > b.categoryTotal)[0]
    )
    const getMostCompletedCategory = ({categories}) => (
        categories[0]
    )
    const getLeastCompletedCategory = ({categories}) => {
        let worst = null;
        // debugger

        for(const category of categories){
            if(worst){
                if(category.categoryCompleted === 0){
                    if(worst.categoryCompleted === 0){
                        if(worst.categoryTotal <= category.categoryTotal
                        && worst.categoryCompleted >= category.categoryCompleted)
                            worst = category
                    }
                    else worst=category
                    
                }
                else{
                    if(category.percentage < worst.percentage)
                        worst=category
                } 
            }
            else worst = category
        }
        return worst
    }
    console.log('[StatsRail] data and loading: ', data, loading)
    if(loading) return null;
    else if(!loading && data){
        const {statistics} = data;
        const topCategory = getTopCategory(statistics);
        const mostCompleted = getMostCompletedCategory(statistics);
        const leastCompleted = getLeastCompletedCategory(statistics);
                       
        return(
            <div style={{paddingTop: '20px', backgroundColor: 'white', flex:1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <Query query={UserStatistics} variables={{'userId': currentUser.id}}>
                {({data, loading, subscribeToMore}) => { */}
                    {/* debugger */}
                    
                            <div style={{flex: 1, alignItems: 'center', justifyContent:'center', flexDirection: 'row', width: '100%'}}>
                                <div style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Statistic.Group widths={2} style={{justifyContent:'center', width: '100%'}} size='small'>
                                        <Statistic size={'mini'}>
                                            <Statistic.Value>{statistics.completedCount}</Statistic.Value>
                                            <Statistic.Label>Completed Tasks</Statistic.Label>
                                        </Statistic>
                                        <Statistic size={'mini'} floated='left'>
                                            <Statistic.Value>{statistics.totalCount}</Statistic.Value>
                                            <Statistic.Label>Total Tasks</Statistic.Label>
                                        </Statistic>
                                </Statistic.Group>
                                </div>
                                <Segment.Group compact style={{width: '100%'}}>
                                <Segment style={{padding: '16px'}}>
                                    <Header as='h3' floated="left">Your top category:</Header>
                                    <Statistic size="mini" floated="right">
                                    <Statistic.Value>
                                        {topCategory ? topCategory.category : ''}
                                    </Statistic.Value>
                                    </Statistic>
                                </Segment>
                                <Segment size='large'>
                                    <div style={{display:'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
                                        <Header as='h3' floated="left">
                                            Most completed category:
                                        </Header>
                                        <Statistic size="mini" floated="right">
                                        <Statistic.Value>
                                            {mostCompleted ? mostCompleted.category : ''}
                                        </Statistic.Value>
                                        </Statistic>
                                    </div>
                                    {mostCompleted ?
                                        <Progress 
                                            style={{margin: '0px'}}
                                            value={mostCompleted.categoryCompleted} 
                                            total={mostCompleted.categoryTotal} 
                                            progress='ratio' 
                                            color='green'/>
                                    : ''}
                                </Segment>
                                <Segment size='large' style={{paddingBottom: 0}}>
                                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Header as='h3' floated="left">
                                            Least completed category:
                                        </Header>
                                        <Statistic size="mini" floated="right">
                                        <Statistic.Value>
                                            {leastCompleted ? leastCompleted.category : ''}
                                        </Statistic.Value>
                                        </Statistic>
                                    </div>
                                    { leastCompleted ?
                                        <Progress 
                                            style={{margin: '0px'}}
                                            value={leastCompleted.categoryCompleted} 
                                            total={leastCompleted.categoryTotal} 
                                            progress='ratio' 
                                            color='red'/>
                                    : ''}
                                    <Button 
                                        compact 
                                        floated='right'
                                        onClick={() => goToReport()}
                                        style={{
                                            border: 0,
                                            backgroundColor: 'white',
                                            paddingRight: 0,
                                            paddingBottom: 14,
                                            fontSize: 16,
                                            marginTop: 14
                                        }}
                                    >Go to reports →</Button>
                                </Segment>
                                </Segment.Group>
                                
                            </div>
                        {/* ) */}
                    {/* } */}
                    {/* <StatsSubscription subscribeToMore={subscribeToMore}/> */}
                {/* }} */}
               
            {/* </Query> */}
        </div>
    )
    }
}

export default StatsRail;