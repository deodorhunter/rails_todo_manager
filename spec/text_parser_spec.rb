require "rails_helper"
require "text_parser"

RSpec.describe TextParser do
    # import support for freezing and unfreezing time during test of dates or else they'll fail
    include ActiveSupport::Testing::TimeHelpers

    before do
        # set instance variable
        @test_user = create(:user, username: "Tim")
    end

    describe ".date_builder" do

        before do
            freeze_time
        end

        after do
            unfreeze_time
        end

        it "returns today correctly" do
            date = TextParser.date_builder(token: 'today')
            expect(date).to eq(Date.today)
        end
        it "returns tomorrow correctly" do
            date = TextParser.date_builder(token: 'tomorrow')
            expect(date).to eq(Date.tomorrow)
        end
        it "returns x days correctly" do
            date = TextParser.date_builder(token: '10days')
            expect(date).to eq(10.days.from_now)
        end
        it "returns x weeks correctly" do
            date = TextParser.date_builder(token: '1week')
            expect(date).to eq(1.week.from_now)
        end
        it "returns x months correctly" do
            date = TextParser.date_builder(token: '2months')
            expect(date).to eq(2.months.from_now)
        end
        it "returns x years correctly" do
            date = TextParser.date_builder(token: '3years')
            expect(date).to eq(3.years.from_now)
        end
    end

    describe ".parse" do
        let(:text){ 'Test task @Tim !tomorrow #test' }
        it "parses category correctly" do
            category = TextParser.parse(text: text)[:category]
            expect(category).to eq('test')
        end
        it "parses assignee correctly" do
            assignee = TextParser.parse(text: text)[:assignees]
            test_assignee = [User.find_by(username: @test_user.username)]
            expect(assignee).to eq(test_assignee)
        end
        it "parses overdue correctly" do
            overdue = TextParser.parse(text: text)[:overdue]
            expect(overdue).to eq(Date.tomorrow)
        end
        
        it "returns whole results correctly" do
            results = TextParser.parse(text: text)
            test_results = {
                :category    => 'test',
                :assignees   => [User.find_by(username: @test_user.username)],
                :overdue     => Date.tomorrow
            }
            expect(results).to eq(test_results)
        end
    end

    describe ".assign" do
        it "finds assignee correctly" do
            assignee = TextParser.assign(@test_user.username)
            test_assignee = User.find_by(username: @test_user.username)
            expect(assignee).to eq(test_assignee)
        end
    end

    
end