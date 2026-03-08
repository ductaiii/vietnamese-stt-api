const speech = require('@google-cloud/speech')
const fs = require('fs')
const path = require('path')

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'google-credentials.json' // Đường dẫn tới khóa service account của Google Cloud.

async function transcribeAudio(audioName) {
  try {
    const speechClient = new speech.SpeechClient()
    const file = fs.readFileSync(audioName)
    const audioBytes = file.toString('base64')
    const audio = { content: audioBytes }

    // Cấu hình: encoding, sample rate và mã ngôn ngữ.
    const config = {
      encoding: 'MP3', // Encoding phù hợp với file voicetest.mp3
      sampleRateHertz: 44100, // Tần số mẫu (thay nếu cần)
      languageCode: 'vi-VN' // Mã ngôn ngữ (ví dụ: 'vi-VN' hoặc 'en-US')
    }

    return new Promise((resolve, reject) => {
      speechClient
        .recognize({ audio, config })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  } catch (error) {
    console.error('Lỗi:', error)
  }
}

;(async () => {
  // Nhận tên file từ command line, nếu không có thì dùng file mặc định.
  const audioFile = process.argv[2] || 'cuulong.mp3'

  if (!fs.existsSync(audioFile)) {
    console.error(`Không tìm thấy file audio: ${audioFile}`)
    console.error('Cách dùng: node index.js <ten-file.mp3>')
    process.exit(1)
  }

  // Gọi hàm chuyển chữ cho file mp3
  const response = await transcribeAudio(audioFile)

  //   console.log(response)

  // Lấy chuỗi transcript từ response
  const transcript =
    response && response[0] && response[0].results
      ? response[0].results.map((r) => r.alternatives[0].transcript).join('\n')
      : ''

  // In transcript ra console.
  console.log(transcript)

  // Tạo thư mục lưu kết quả nếu chưa tồn tại và ghi file .txt.
  const outDir = path.join(__dirname, 'transcripts')
  fs.mkdirSync(outDir, { recursive: true })
  const outFileName = `${path.parse(audioFile).name}.txt`
  const outPath = path.join(outDir, outFileName)
  try {
    fs.writeFileSync(outPath, transcript, 'utf8')
    console.log('Đã lưu transcript vào:', outPath)
  } catch (err) {
    console.error('Không thể ghi file transcript:', err)
  }
})()
