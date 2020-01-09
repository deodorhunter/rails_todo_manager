module Queries
    class Statistics < Queries::BaseQuery
        description 'Returns task statistics for current user'
        type Types::StatisticsType, null: true
    
        argument :user_id, ID, required: true

        def resolve(user_id:)
            connection = ActiveRecord::Base.connection.raw_connection
            test_sql = <<~SQL
                EXPLAIN ANALYZE with part1 as(
                    select
                        temp.category,
                        count(temp.category) over (partition by temp.category) as category_total,
                        count(case when temp.completed = true then temp.category else null end) over (partition by temp.category) as category_completed
                    
                    from (select  category, completed, owner_id, assignee_id from tasks )as temp
                    where owner_id = $1 or assignee_id = $2
                ),
                totals as( 
                    select
                        distinct category, category_total, category_completed
                        
                    from part1
                )
                    
                select
                    category,
                    category_total, category_completed,
                    (category_completed * 1.0 / nullif(category_total,0)) as percentage
                from totals
                where category is not null
                order by percentage desc
            SQL
            sql = <<~SQL
                with part1 as(
                    select
                        temp.category,
                        count(temp.category) over (partition by temp.category) as category_total,
                        count(case when temp.completed = true then temp.category else null end) over (partition by temp.category) as category_completed
                    
                    from (select  category, completed, owner_id, assignee_id from tasks )as temp
                    where owner_id = $1 or assignee_id = $2
                ),
                totals as( 
                    select
                        distinct category, category_total, category_completed
                        
                    from part1
                )
                    
                select
                    category,
                    category_total, category_completed,
                    (category_completed * 1.0 / nullif(category_total,0)) as percentage
                from totals
                where category is not null
                order by percentage desc
            SQL
            puts "Executing query #{sql}"
            begin
                connection.prepare('test_stats', sql)
                connection.prepare('stats', sql)
            rescue  PG::DuplicatePstatement => e
            end
            test_query = connection.exec_prepared('test_stats', [user_id, user_id])
            debugger
            puts test_query.inspect
            result = connection.exec_prepared('stats', [user_id, user_id])
            # connection.close()
            completed_count = Task.where(
                "completed = ? AND  ( owner_id = ? OR assignee_id = ? )" ,
                true,  user_id, user_id)
                .count()
            total_count = Task.where("owner_id = ? OR assignee_id = ?", user_id, user_id).count()
            
            
            data = {
                categories: result.to_a,
                completed_count: completed_count,
                total_count: total_count,
            }
            # debugger
            # return data

        end

    end
end


