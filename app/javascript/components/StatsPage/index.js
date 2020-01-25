import React, {useState} from 'react';
import { Segment, Statistic, Progress, Grid, Header, Message } from 'semantic-ui-react';
import CategoriesPie from './CategoriesPie';
import CompletionHistogram from './CompletionHistogram';

const StatsPage = ({data, currentUser}) => {
    const [visibleMessages, setVisibleMessages] = useState({
        "best": true,
        "worst": true,
    })
    const {statistics} = data;

    const handleDismiss = (key) => {
        setVisibleMessages(prev => ({...prev, [key]: !prev[key]}))
    }
    const bestCategories = () =>{
        const {categories} = data.statistics;
        const best = categories
                        .filter(el => el.percentage > 0.6)
                        .slice(0, 3)
                        .map(el => el.category);
        return `${best.length > 1 ? 'These are' : 'This is'} your best ${best.length > 1 ? 'categories: ' : 'category: '}` + best.join(', ');
    }
    const worstCategories = () =>{
        const {categories} = data.statistics;
        const worst = categories
                        .filter(el => el.percentage < 0.5)
                        .slice(0, 3)
                        .map(el => el.category);
        return `${worst.length > 1 ? 'These are' : 'This is'} your worst ${worst.length > 1 ? 'categories: ' : 'category: '}` + worst.join(', ');
    }
    const renderPie = ({statistics}) => {
        const {categories, totalCount, totalCompleted} = statistics;
        let unclassified = {
            id: 'No category',
            label: 'No category',
            value: totalCount
        }
        const data = categories.map( el => {
            unclassified.value -= el.categoryTotal
            return {
                id: el.category,
                label: el.category,
                value: el.categoryTotal
            }
        });
        data.push(unclassified)
        return <CategoriesPie data={data}/>
    }
    const renderHistogram = ({statistics}, purpose) => {
        const {categories, totalCompleted, totalCount} = statistics;
        if(purpose === 'overall'){
            return categories.map(cat => (
                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                    <h2 style={{margin: 0}}>{cat.category}</h2>
                    <Progress 
                        style={{margin: '0px', width: '70%'}}
                        key={cat.category}
                        value={cat.categoryCompleted} 
                        total={cat.categoryTotal} 
                        progress='percent' 
                        color='teal'/>
                </div>
                
            ))
        }
        else if(purpose === 'mostCompleted'){
            const data = categories.filter( cat => cat.percentage >= 0.7);
            return data.map( el => (
                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                    <Header as="h2" floated='left' style={{margin: 0}}>{el.category}</Header>
                    <Header as="h2" floated='right'>
                        <Statistic size={'mini'}>
                            <Statistic.Value>{`${el.percentage * 100}%`}</Statistic.Value>
                        </Statistic>
                    </Header>
                </div>
            ))
        }
        else if(purpose === 'leastCompleted'){
            const data = categories.filter( cat => cat.percentage <= 0.4);
            return data.map( el => (
                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                    <Header as="h2" floated='left' style={{margin: 0}}>{el.category}</Header>
                    <Header as="h2" floated='right'>
                        <Statistic size={'mini'}>
                            <Statistic.Value>{`${el.percentage * 100}%`}</Statistic.Value>
                        </Statistic>
                    </Header>
                </div>
            ))
        }
    }
    return (
        <div style={{display: 'flex', flex: 1, marginTop: 10}}>
            <Segment style={{width: '100%', height: '100%', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                    <Header size={'large'} floated='right'>
                        Statistics report
                    </Header>
                </div>
                <Statistic.Group 
                    widths={2} 
                    style={{justifyContent:'center', width: '100%'}}
                    size='small'
                >
                    <Statistic size={'mini'}>
                        <Statistic.Value>{statistics.completedCount}</Statistic.Value>
                        <Statistic.Label>Completed Tasks</Statistic.Label>
                    </Statistic>
                    <Statistic size={'mini'} floated='left'>
                        <Statistic.Value>{statistics.totalCount}</Statistic.Value>
                        <Statistic.Label>Total Tasks</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                {visibleMessages["best"] ?
                <Message
                    positive
                    attached='bottom'
                    onDismiss={() => handleDismiss("best")}
                    header='Doing great, bud!'
                    content={bestCategories()}
                    style={{marginTop: 30}}
                /> : ''}
                {visibleMessages["worst"] ?
                <Message
                    negative
                    attached='bottom'
                    onDismiss={() => handleDismiss("worst")}
                    header='These are not getting done by themselves...'
                    content={worstCategories()}
                /> : ''}
                <Grid style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', padding: 20}}>
                    <Grid.Row>
                        <Grid.Column style={{width: 550}}>
                            <h2>Completion</h2>
                        </Grid.Column>
                        <Grid.Column style={{width: 450}}>
                            <h2>Tasks distribution</h2>
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row style={{paddingVertical: 0}}>
                        <div style={{width: 550, height:450, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 20}}>
                            
                            {renderHistogram(data, 'overall')}
                        </div>
                        <div style={{width: 450, height:450}}>
                            
                            {renderPie(data)}
                        </div>
                        
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h2>Most completed</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <h2>Least completed</h2>
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row style={{paddingVertical: 0}} columns={2}>
                        <Grid.Column>
                            {renderHistogram(data, 'mostCompleted')}
                        </Grid.Column>
                        <Grid.Column>
                            {renderHistogram(data, 'leastCompleted')}
                        </Grid.Column>
                        
                    </Grid.Row>
                    
                </Grid>
               
            </Segment>
        </div>
    );
}

export default StatsPage