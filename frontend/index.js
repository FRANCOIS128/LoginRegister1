import "./index.scss"
import * as dom from "./src/dom.js"
import { clearDomValue, isInputHasContent } from "./src/utils.js"
import * as animation from "./src/animation.js"
import { VideoLoader } from "./src/videoControler.js"

import axios from "axios"

const backendPath = import.meta.env.VITE_BACKEND_PATH
const loginToken = import.meta.env.VITE_LOGIN_TOKEN

const videosrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const videoLoader = new VideoLoader()

// here btn function
const RegisterToLoginBtnFun = (event) => {
  event.preventDefault()
  animation.RegisterToLogin()

}

const LoginToRegisterBtnFun = (event) => {
  event.preventDefault()
  animation.LoginToRegister()
}

dom.toLoginBtn.addEventListener('click', RegisterToLoginBtnFun)

dom.toRegisterBtn.addEventListener('click', LoginToRegisterBtnFun)

dom.loginBtn.addEventListener('click', login)
dom.registerBtn.addEventListener('click', register)
dom.signOutBtn.addEventListener('click', signOut)

async function login(event) {
  event.preventDefault()
  // videoLoader.cancelLoad()
  if (isInputHasContent([dom.username, dom.password]) === 1) {
    animation.showError()
    return;
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/login`,
      {
        username: dom.username.value,
        password: dom.password.value
      }
    ).then(res => res.data)
    if (response.code === "0") {
      dom.welcomeUsername.innerText = response.username
      clearDomValue([dom.username, dom.password])
      animation.showCorrect()
      animation.LoginToWelcome()
      response.token && localStorage.setItem(loginToken, response.token)
      // Wait for animation to complete before loading video
      setTimeout(() => {
        // 添加防御性检查，确保页面仍然处于正确状态
        if (document.querySelector('.welcome').style.display !== 'none') {
          videoLoader.loadVideo(videosrc)
        }
      }, 1200)
    }
  } catch (error) {
    const code = error?.response?.data?.code
    switch (code) {
      case "1":
      case "2":
        animation.showError()
        break;
      default:
        animation.showUnkonw()
        break;
    }
  }
}

async function register(event) {
  event.preventDefault()
  // videoLoader.cancelLoad()
  const statusCode = isInputHasContent([
    dom.new_username,
    dom.password_one,
    dom.password_two
  ])

  if (statusCode === 1 || statusCode === -1 || dom.password_one.value !== dom.password_two.value) {
    animation.showError()
    return
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/register`,
      {
        username: dom.new_username.value,
        password: dom.password_one.value,
      }
    ).then(res => res.data)

    if (response.code === "0") {
      clearDomValue([
        dom.new_username,
        dom.password_one,
        dom.password_two]
      )

      animation.showCorrect()
      animation.RegisterToLogin()
    }
  } catch (error) {
    console.log(error)

    const code = error?.response?.data?.code
    switch (code) {
      case "1":
      case "2":
        animation.showError()
        break;
      default:
        animation.showUnkonw()
        break;
    }
  }
}

async function signOut(event) {
  event.preventDefault()
  clearDomValue([
    dom.username,
    dom.password,
    dom.new_username,
    dom.password_one,
    dom.password_two,
    dom.welcomeUsername
  ])
  animation.WelcomeToLogin()
  localStorage.removeItem(loginToken)
  videoLoader.cancelLoad(true) // 静默取消，不显示错误信息
}

async function checkToken() {
  const token = localStorage.getItem(loginToken)
  if (!token) return

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/login`,
      {
        message: "token"
      },
      configuration
    ).then(res => res.data)

    if (response.code === "0") {
      dom.welcomeUsername.innerText = response.username
      animation.LoginToWelcome()
      response.token && localStorage.setItem(loginToken, response.token)
      // Wait for animation to complete before loading video
      setTimeout(() => {
        // 添加防御性检查，确保页面仍然处于正确状态
        if (document.querySelector('.welcome').style.display !== 'none') {
          videoLoader.loadVideo(videosrc)
        }
      }, 1200)

    }
  } catch (error) {
    localStorage.removeItem(loginToken)
  }
}

checkToken()