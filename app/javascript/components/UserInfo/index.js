import React, { useRef } from 'react';
import { Query, Mutation } from "react-apollo";
import { Me, SignMeIn } from "./operations.graphql";
import cs from "./styles";

const UserInfo = () => {
    const input = useRef(null);
  
    return (
      <div className={cs.panel}>
        <Query query={Me}>
          {({ data, loading }) => {
              console.log(data)
            if (loading) return '...Loading';
            if (!data.me) {
              return (
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
                            console.log(input.current.value, event)
                            signIn({
                              variables: { email: input.current.value },
                            }).then(({ data: { signIn: { token } } }) => {
                              if (token) {
                                localStorage.setItem('tdmToken', token);
                              }
                            });
                          }}
                        >
                          <input
                            ref={input}
                            type="email"
                            className={cs.input}
                            placeholder="your email"
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
  
            const { username } = data.me;
            return <div className={cs.info}>😈 {username}</div>;
          }}
        </Query>
      </div>
    );
  };
  
  export default UserInfo;