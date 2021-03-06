import React, {useState} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Query, Mutation } from "react-apollo";
import { Me, SignMeIn } from "./operations.graphql";
import {Link, useHistory} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

export default() => {
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    let history = useHistory();
    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src={""} /> Log-in to your account
            </Header>
            <Mutation
                  mutation={SignMeIn}
                  update={(cache, { data: { signIn } }) => {
                    cache.writeQuery({
                      query: Me,
                      data: { me: signIn.user },
                    });
                  }}
                  onCompleted={()=>history.push('/')}
                >
                  {(signIn, { loading: authenticating }) =>
                    authenticating ? (
                      '...'
                    ) : (
                    <Form size='large'
                        onSubmit={event => {
                            debugger
                            console.log(emailField, passwordField)
                            const data = {
                                'email': emailField,
                                'password': passwordField
                            }
                            signIn({
                                variables: { email: data },
                                }).then(({ data: { signIn: { token } } }) => {
                                if (token) {
                                    console.log(token)
                                    localStorage.setItem('tdmToken', token);
                                }
                            });
                        }}
                    >
                        <Segment stacked>
                        <Form.Input 
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='E-mail address'
                            value={emailField} 
                            onChange={ e => { setEmailField(e.target.value)}}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            value={passwordField}
                            type='password'
                            onChange={ e => {setPasswordField(e.target.value)}}
                        />

                        <Button 
                            color='teal' 
                            fluid size='large'
                            type='submit'
                        >
                            Login
                        </Button>
                        </Segment>
                    </Form>
                    )}
                </Mutation>
            <Message>
                New to us? <Link to='/register'>Sign Up</Link>
            </Message>
            </Grid.Column>  
        </Grid>
    )
}