require 'rails_helper'

describe Message, type: :model do
  describe '#create' do
    it "メッセージが有れば保存できる" do
      message = build(:message, image: nil)  
      expect(message).to be_valid
      end

    it "画像が有れば保存できる" do
      message = build(:message, content: nil)  
      expect(message).to be_valid
      end

    it "画像とメッセージが有れば保存できる" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "メッセージも画像もなければ保存できない" do
      message = build(:message, content: nil, image: nil)
      message.valid?
      expect(message.errors[:content]).to include("can't be blank")
    end

    it "group_idがなければ保存できない" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("must exist")
    end

    it "user_idがなければ保存できない" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("must exist")
    end


  end
end