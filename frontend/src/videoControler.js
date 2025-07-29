import axios from 'axios';

export class VideoLoader {
  constructor() {
    this.controller = null;
    this.videoElement = document.querySelector('video');
    this.retryAttempted = false;

    // 视频封面图映射
    this.posterMap = {
      'BigBuckBunny.mp4': 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
      'ElephantsDream.mp4': 'https://orange.blender.org/wp-content/themes/orange/images/media/gallery/s5_proog_emo.jpg',
      'Sintel.mp4': 'https://durian.blender.org/wp-content/uploads/2010/06/05_comp_000272.jpg',
      'TearsOfSteel.mp4': 'https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg'
    };
  }

  // 加载视频 - 流式播放方式
  loadVideo(url) {
    // 重置静默模式，允许显示正常的加载状态和错误信息
    this.silentMode = false;

    // 重置重试标志
    if (url !== this.videoElement.src) {
      this.retryAttempted = false;
    }

    // 如果已有请求正在进行，则取消它
    if (this.controller) {
      this.controller.abort();
    }

    // 创建新的 AbortController 实例
    this.controller = new AbortController();

    // 移除之前的事件监听器，防止重复绑定
    this.removeAllEventListeners();

    // 强制重新计算video元素尺寸，确保CSS样式正确应用
    this.videoElement.style.display = 'none';
    this.videoElement.offsetHeight; // 触发reflow
    this.videoElement.style.display = '';

    // 显示加载状态
    this.showStatus('Loading video...');

    // 根据视频URL设置对应的封面图
    this.setPosterByUrl(url);

    // 直接设置视频源URL，浏览器会自动处理流式加载
    this.videoElement.src = url;

    // 创建事件处理函数（使用箭头函数确保this指向正确）
    this.loadStartHandler = () => {
      console.log('视频开始加载');
      this.showStatus('Video loading started...');
    };

    this.canPlayHandler = () => {
      console.log('视频可以开始播放');
      this.showStatus('Video loading completed');
      setTimeout(() => this.hideStatus(), 2000);

      // 自动开始播放
      this.videoElement.play().catch(e => {
        console.log('自动播放被浏览器阻止:', e);
        this.showStatus('Click play button to start watching', 'info');
      });
    };

    this.waitingHandler = () => {
      console.log('视频缓冲中...');
      this.showStatus('Video buffering...');
    };

    this.errorHandler = (e) => {
      console.error('视频加载错误:', e);

      // 如果处于静默模式（比如用户主动登出），则不显示错误信息
      if (!this.silentMode) {
        const errorMsg = this.getErrorMessage(e.target.error);
        this.showStatus(`Video loading failed: ${errorMsg}`, 'error');

        // 移动端特殊处理：如果是网络错误，稍后重试一次
        if (e.target.error.code === e.target.error.MEDIA_ERR_NETWORK && !this.retryAttempted) {
          this.retryAttempted = true;
          setTimeout(() => {
            console.log('重试加载视频...');
            this.loadVideo(this.videoElement.src);
          }, 3000);
        }
      }
    };

    // 设置视频加载事件监听
    this.videoElement.addEventListener('loadstart', this.loadStartHandler);
    this.videoElement.addEventListener('canplay', this.canPlayHandler);
    this.videoElement.addEventListener('waiting', this.waitingHandler);
    this.videoElement.addEventListener('error', this.errorHandler);

    // 可选：自动开始播放
    // this.videoElement.play().catch(e => console.error('自动播放失败:', e));
  }

  // 显示状态信息
  showStatus(message, type = 'info') {
    let statusElement = document.getElementById('video-status');
    if (!statusElement) {
      statusElement = document.createElement('div');
      statusElement.id = 'video-status';
      statusElement.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 16px;
        border-radius: 5px;
        font-size: 13px;
        z-index: 1000;
        transition: opacity 0.3s ease;
        pointer-events: none;
      `;
      this.videoElement.parentElement.style.position = 'relative';
      this.videoElement.parentElement.appendChild(statusElement);
    }

    statusElement.textContent = message;
    statusElement.style.backgroundColor = type === 'error' ? '#ff4444' : '#4CAF50';
    statusElement.style.color = 'white';
    statusElement.style.opacity = '1';
  }

  // 隐藏状态信息
  hideStatus() {
    const statusElement = document.getElementById('video-status');
    if (statusElement) {
      statusElement.style.opacity = '0';
      setTimeout(() => statusElement.remove(), 300);
    }
  }

  // 获取错误信息
  getErrorMessage(error) {
    if (!error) return 'Unknown error';

    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        return 'Video loading aborted';
      case error.MEDIA_ERR_NETWORK:
        return 'Network error, please check your connection';
      case error.MEDIA_ERR_DECODE:
        return 'Video decoding error';
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'Video format not supported or file does not exist';
      default:
        return `Error code: ${error.code}`;
    }
  }

  // 根据视频URL设置封面图
  setPosterByUrl(url) {
    // 从URL中提取文件名
    const fileName = url.split('/').pop();

    // 查找对应的封面图
    const poster = this.posterMap[fileName];

    if (poster) {
      this.videoElement.poster = poster;
    } else {
      // 如果没有找到对应的封面图，使用默认的Big Buck Bunny封面
      this.videoElement.poster = this.posterMap['BigBuckBunny.mp4'];
    }
  }

  // 移除所有事件监听器
  removeAllEventListeners() {
    if (this.videoElement) {
      // 移除之前绑定的事件监听器
      if (this.loadStartHandler) {
        this.videoElement.removeEventListener('loadstart', this.loadStartHandler);
      }
      if (this.canPlayHandler) {
        this.videoElement.removeEventListener('canplay', this.canPlayHandler);
      }
      if (this.waitingHandler) {
        this.videoElement.removeEventListener('waiting', this.waitingHandler);
      }
      if (this.errorHandler) {
        this.videoElement.removeEventListener('error', this.errorHandler);
      }
    }
  }

  // 取消视频加载
  cancelLoad(silent = false) {
    // 设置静默模式，避免显示错误信息
    this.silentMode = silent;

    // 立即隐藏所有状态提示
    this.hideStatus();

    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    // 移除事件监听器
    this.removeAllEventListeners();

    // 停止视频加载和播放
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.removeAttribute('src');
      this.videoElement.load(); // 重置视频元素
      // 清除封面图
      this.videoElement.poster = '';
    }
  }

  // 添加分段加载功能（如果需要）
  loadVideoSegment(url, startTime, endTime) {
    this.loadVideo(url);

    // 设置开始时间
    this.videoElement.addEventListener('canplay', () => {
      this.videoElement.currentTime = startTime;
    }, { once: true });

    // 监听结束时间
    if (endTime) {
      this.videoElement.addEventListener('timeupdate', () => {
        if (this.videoElement.currentTime >= endTime) {
          this.videoElement.pause();
        }
      });
    }
  }
}