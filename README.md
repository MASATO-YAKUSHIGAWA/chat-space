#  chat-space DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|
|email|text|null: false, unique: true|
|pass|text|null: false|

### Association
- has_many : groups, through: :members
- has_many: messages
- belongs_to: member
******

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|user_name|text|null: false|

### Association
- has_many : users, through: :members
- has_many: messages
- belongs_to: member
********

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
********

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
********
