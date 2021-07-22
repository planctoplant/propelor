require 'rails_helper'

RSpec.describe Sentence, type: :model do

  let(:sentence) { Fabricate(:sentence) }

  context 'create' do  
    it 'should raise_error' do
      expect { Sentence.create! }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'should create a new sentence' do
      expect(sentence.persisted?).to be(true)
    end
  end
end
