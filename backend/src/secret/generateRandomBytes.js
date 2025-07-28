import crypto from 'node:crypto'
import fs from 'node:fs'
import { getTime } from "./generateTimeTag.js"

function generateRandomByes(length = 64) {
  return crypto.randomBytes(length).toString('hex')
}

fs.appendFile("randomByes.txt", `${getTime()}: \n` + generateRandomByes() + "\n", function (err) {
  err ? console.log(err) : console.log("Saved!");
})