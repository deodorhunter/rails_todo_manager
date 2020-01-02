import React, { useRef } from 'react';
import { Query, Mutation } from "react-apollo";
import { useApolloClient } from "@apollo/react-hooks";
import { Me, SignMeOut } from "./operations.graphql";
import {useHistory} from 'react-router-dom';
import {Image, Button, Icon} from 'semantic-ui-react';
import cs from "./styles";

const UserInfo = ({currentUser}) => {
    let history = useHistory();
    const client = useApolloClient();
    console.log(client);
    const { username } = currentUser;
    console.log(localStorage.getItem('tdmToken'))
    return (
      <Mutation
        mutation={SignMeOut}
        onCompleted={()=>{
          client.clearStore();
          localStorage.clear();
          history.push('/login');
        }}
      >
          {(signOut) => (
           
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', fontSize: '20px'}}>
              {/* <div className={cs.info}> */}
                  <Image avatar spaced='right' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
                  {username}
              {/* </div> */}
              <Button style={{marginLeft: '20px'}} size='big'
                  labelPosition="right" 
                  onClick={() => {
                    const token = localStorage.getItem('tdmToken');
                    console.log('token', token)
                    signOut({
                      variables: { token}
                    }).then(({ data: { signOut: { success } }}) => {
                      if(success)
                      {
                        console.log('Logged out successfully');
                      }
                      else console.log('some error')  
                    })
                  }}>
              
                    <Icon name='log out' size='big' />
              </Button>
              </div>
          )}
        </Mutation>
      
    );
  } 
  
  
  
  export default UserInfo;