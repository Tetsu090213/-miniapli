import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="woodpecker"
export default class extends Controller {
  static targets = ["bird", "target"] // targetを追加

  connect() {
    // ページ読み込み時に音声をプリロード（準備）しておく
    this.audio = new Audio("/woodpecker_sound.mp3") 
  }

  peck(event) {
    const bird = this.birdTarget
    const target = this.targetTarget

    // 1. クリックされた絶対座標を計算
    // 画像内の相対座標ではなく、ステージ内での位置を算出
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 2. キツツキを移動（くちばしの位置調整）
    bird.style.display = "block"
    bird.style.left = `${x - 10}px` 
    bird.style.top = `${y - 15}px`

    // ★ ここに音を鳴らす命令を追加
    this.playSound()

    // 3. アニメーションのリセット
    bird.classList.remove("is-pecking")
    target.classList.remove("is-vibrating") // ターゲットだけを揺らす

    void bird.offsetHeight; 
    void target.offsetHeight; 

    // 4. アニメーション開始
    bird.classList.add("is-pecking")
    target.classList.add("is-vibrating")
  }

  // ★ 音を再生するための新しい関数を最後に追加（コメントも自由に書けます）
  playSound() {
    if (!this.audio) return // 音声ファイルがない場合のエラー防止
    this.audio.currentTime = 0 // 再生位置を先頭に戻す（連打対応）
    this.audio.play() // 再生
  }
}