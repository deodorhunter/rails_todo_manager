import React, { useRef } from 'react';
import { Query, Mutation } from "react-apollo";
import { useApolloClient } from "@apollo/react-hooks";
import { Me, SignMeIn } from "./operations.graphql";
import cs from "./styles";

const UserInfo = () => {
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const client = useApolloClient();
    console.log(client)
    return (
      <div className={cs.panel}>
        {/* <Query query={Me}>
          {({ data, loading }) => {
              console.log(data, localStorage)
            if (loading) return '...Loading';
            if (!data.me) {
              return ( */}
                <Mutation
                  mutation={SignMeIn}
                  update={(cache, { data: { signIn } }) => {
                    cache.writeQuery({
                      query: Me,
                      data: { me: signIn.user },
                    });
                  }}
                >
                  {(signIn, { loading: authenticating }) =>
                    authenticating ? (
                      '...'
                    ) : (
                      <div className={cs.signIn}>
                        <form
                          onSubmit={event => {
                            debugger
                            console.log(emailField, passwordField)
                            const data = {
                              'email': emailField.current.value,
                              'password': passwordField.current.value
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
                          <input
                            ref={emailField}
                            type="email"
                            className={cs.input}
                            placeholder="Email"
                          />
                          <input
                            ref={passwordField}
                            type="password"
                            className={cs.input}
                            placeholder="password"
                          />
                          <input
                            type="submit"
                            className={cs.button}
                            value="Sign In"
                          />
                        </form>
                      </div>
                    )
                  }
                </Mutation>
              );
            }
  
            {/* const { username } = data.me; */}
            {/* return ( */}
              {/* <div>
                {/* <div className={cs.info}>😈 {username}</div> */}
                {/* <button onClick={() => {
                  console.log('will logout... soon')
                  // client.resetStore();
                  localStorage.clear()
                  console.log(client, localStorage.getItem('tdmToken'));

                }
                }>
                  Log out
                </button> */}
              {/* </div>  */}
            {/* ); */}
          {/* }} */}
        {/* </Query> */}
      </div>
    );
  };
  
  export default UserInfo;