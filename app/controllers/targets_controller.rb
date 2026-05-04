# app/controllers/targets_controller.rb
class TargetsController < ApplicationController
  def create
    # ★ ここを追加：新しい画像を保存する前に、既存のデータをすべて削除する
    Target.destroy_all

    # フォームから送られてきたデータで新しいTargetを作成
    @target = Target.new(target_params)

    if @target.save
      # 保存に成功したらトップページへ戻り、メッセージを表示
      redirect_to root_path, notice: "ターゲットを更新しました！"
    else
      # 失敗した場合もトップページへ戻る
      redirect_to root_path, alert: "画像の保存に失敗しました。"
    end
  end

  private

  # セキュリティ対策（許可した項目以外の保存を防ぐ）
  def target_params
    params.require(:target).permit(:image)
  end
end
