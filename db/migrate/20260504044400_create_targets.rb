class CreateTargets < ActiveRecord::Migration[7.2]
  def change
    create_table :targets do |t|
      t.timestamps
    end
  end
end
