class StatsBuilder
    def self.collect(user_id)
        connection = ActiveRecord::Base.connection.raw_connection
            
        sql = <<~SQL
        with part1 as(
            select 
                    temp.category,
                    count(temp.category) over (partition by temp.category) as category_total,
                    count(case when temp.completed = true then temp.category else null end) over (partition by temp.category) as category_completed
                from (
                    select  t.category, t.completed, t.owner_id, a.user_id 
                    from tasks as t join assignments as a on a.task_id = t.id
                )as temp
                where 
                    temp.owner_id = $1 or temp.user_id = $2
                union all
                select
                    temp.category,
                        count(temp.category) over (partition by temp.category) as category_total,
                        count(case when temp.completed = true then temp.category else null end) over (partition by temp.category) as category_completed
                    from tasks as temp
                    where 
                        temp.owner_id = $3
            ),
            totals as( 
                select
                distinct on (category)
                category, category_completed, category_total
                from part1
                order by category, category_total desc
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
            connection.prepare('stats', sql)
        rescue  PG::DuplicatePstatement => e
        end
        # test_query = connection.exec_prepared('test_stats', [user_id, user_id])
        debugger
        # puts test_query.inspect
        return connection.exec_prepared('stats', [user_id, user_id, user_id])
    end

    def self.build_stats(user_id)
        db_result = self.collect(user_id)
        user = User.find(user_id)
            # connection.close()
        total_count = user.tasks.count() + user.assigned_tasks.count()
        completed_count = user.tasks.where(completed: true).count() + user.assigned_tasks.where(completed: true).count()
        
        
        data = {
            categories: db_result.to_a,
            completed_count: completed_count,
            total_count: total_count,
        }
    end
end