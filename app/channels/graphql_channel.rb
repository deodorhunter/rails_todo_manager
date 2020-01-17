# app/channels/graphql_channel.rb

class GraphqlChannel < ApplicationCable::Channel
  # Add instance variable for keeping track of subscriptions
  def subscribed
    @subscription_ids = []
  end

  # Things to do when subscribing or calling subscription
  def execute(data)
    logger.debug "[GraphqlChannel] about to execute query "
    result = execute_query(data)
    payload = {
      result: result.subscription? ? { data: nil } : result.to_h,
      more: result.subscription?
    }
    # similar to js .concat(), add if sub_id is present in result context
    @subscription_ids << context[:subscription_id] if result.context[:subscription_id]
    logger.debug "[GraphqlChannel] subscription_ids are #{@subscription_ids}"
    logger.debug "[GraphqlChannel] about to transmit payload #{payload}"
    transmit(payload)
  end

  # Clean up after unsubscribing
  def unsubscribed
    @subscription_ids.each do |sid|
      TodoManagerSchema.subscriptions.delete_subscription(sid)
    end
  end

  private

  def execute_query(data)
    logger.debug "[GraphqlChannel] executing query: #{data["query"]}, variables: #{data["variables"]}, operation name: #{data['operationName']}"
    TodoManagerSchema.execute(
      query: data["query"],
      context: context,
      variables: data["variables"],
      operation_name: data["operationName"]
    )
  end

  def context
    {
      # do I need to add this one?
      # session: session,
      current_user_id: current_user&.id,
      current_user: current_user,
      channel: self
    }
  end
end