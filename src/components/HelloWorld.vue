<template>
  <div class="video-wrapper">
    <video class="video" controlslist="nodownload noplaybackrate" disablepictureinpicture ref="video">
      <source src="http://127.0.0.1:3000/video3" type="video/mp4">
    </video>
    <!-- 控制条 -->
    <div class="ctrl-box">
      <!-- 视频播放时长 -->
      <div class="start-time">{{ startTime }}</div>
      <!-- 进度条 -->
      <div class="progress-box" ref="progressBox">
        <div class="progress" ref="progress"></div>
        <div class="progress-point" ref="progressPoint"></div>
      </div>
      <!-- 视频总时长 -->
      <div class="end-time">{{ endTime }}</div>
      <!-- 静音按钮 -->
      <img class="ctrl-volume" src="../assets/play.png" alt="" @click="ctrlVolume">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      video: '',
      progress: '',
      progressBox: '',
      progressPoint: '',
      isMoving: false,
      startTime: '00:00',
      endTime: '00:00',
    }
  },

  mounted() {
    this.video = this.$refs.video
    this.progress = this.$refs.progress
    this.progressBox = this.$refs.progressBox
    this.progressPoint = this.$refs.progressPoint
    this.video.addEventListener("click", function () {
      if (this.paused) {
        this.play()
      } else {
        this.pause()
      }
    })
    this.video.addEventListener("timeupdate", () => {
      this.changeProgress()
    })
    this.video.addEventListener("loadedmetadata", () => {
      this.changeProgress()
    })
    this.progressBox.addEventListener("click", (e) => {
      const length = e.pageX - this.progressBox.offsetLeft
      const percent = length / this.progressBox.offsetWidth
      this.video.currentTime = percent * this.video.duration
      this.video.play()
    })
    this.progressBox.addEventListener("touchmove", (e) => {
      this.isMoving = true
      const length = e.touches[0].clientX - this.progressBox.offsetLeft
      const percent = Math.max(0, Math.min(1, length / this.progressBox.offsetWidth))
      this.progressPoint.style.left = percent * 100 + '%'
    })
    this.progressBox.addEventListener("touchend", (e) => {
      this.isMoving = false
      const length = e.changedTouches[0].clientX - this.progressBox.offsetLeft
      const percent = Math.max(0, Math.min(1, length / this.progressBox.offsetWidth))
      this.video.currentTime = percent * this.video.duration
    })
  },

  methods: {
    // 计算时长，注意：这里的 padStart 是 es7 语法
    parseTime(value) {
      const interval = Math.floor(value)
      const minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
      const second = (interval % 60).toString().padStart(2, '0')
      return `${minute}:${second}`
    },
    // 推进进度条
    changeProgress() {
      this.startTime = this.parseTime(this.video.currentTime)
      this.endTime = this.parseTime(this.video.duration)
      const percent = this.video.currentTime / this.video.duration
      this.progress.style.width = percent * 100 + '%'
      if (!this.isMoving) {
        this.progressPoint.style.left = percent * 100 + '%'
      }
    },
    // 静音/取消静音
    ctrlVolume() {
      this.video.muted = !this.video.muted;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video {
  width: 80%;
}

.ctrl-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.progress-box {
  /* display: flex; */
  position: relative;
  width: 55%;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgb(131, 175, 155);
  align-items: center;
}

.progress-point {
  position: absolute;
  top: 50%;
  transform: translate(-5px, -50%);
  width: 0;
  height: 0;
  border: 5px solid black;
  border-radius: 50%;
  transition: left 0.5s;
}

.progress {
  width: 0%;
  height: 100%;
  background: rgb(131, 175, 155);
  transition: width 0.5s;
}

.ctrl-volume {
  width: 10%;
}
</style>
