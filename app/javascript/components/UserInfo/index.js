import React, { useRef } from 'react';
import { Query, Mutation } from "react-apollo";
import { useApolloClient } from "@apollo/react-hooks";
import { Me, SignMeOut } from "./operations.graphql";
import {useHistory} from 'react-router-dom';
import cs from "./styles";

const UserInfo = ({currentUser}) => {
    let history = useHistory();
    const client = useApolloClient();
    const { username } = currentUser;
    console.log(localStorage.getItem('tdmToken'))
    return (
      <Mutation
        mutation={SignMeOut}
        onCompleted={()=>{
          client.resetStore();
          localStorage.clear();
          history.push('/');
        }}
      >
          {(signOut) => (
            <div className={cs.panel}>
              <div className={cs.info}>😈 {username}</div>
              <button onClick={() => {
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
              }
              }>
                Log out
              </button> 
            </div>
          )}
        </Mutation>
      
    );
  } 
  
  
  
  export default UserInfo;