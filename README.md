# Speech-to-Text với Google Cloud

<!-- Chừa chỗ cho video demo: đặt máy quay, giới thiệu ngắn, và chạy ví dụ -->

Demo :



Ứng dụng Node.js này minh họa cách chuyển giọng nói thành chữ (speech-to-text) sử dụng Google Cloud Speech-to-Text API. Ứng dụng đọc một file âm thanh, gửi lên API để nhận kết quả chuyển chữ, và xuất văn bản nhận được.

**Yêu cầu trước khi chạy**

- Cài đặt `Node.js` trên máy.
- Có một project trên Google Cloud Platform (GCP) và đã bật API **Speech-to-Text**.
- Tạo một Service Account và tải file khóa JSON (service account key). Bạn sẽ dùng file JSON này để xác thực.

**Lấy file JSON từ Google Cloud (tóm tắt)**

1. Vào Console GCP: https://console.cloud.google.com/
2. Chọn project của bạn, vào **IAM & Admin → Service Accounts**.
3. Tạo Service Account mới (nếu chưa có), cấp quyền `Cloud Speech Client` hoặc `Owner` tạm thời cho thử nghiệm.
4. Tạo khóa (Create Key) kiểu JSON và tải file xuống (ví dụ: `my-gcp-key.json`).
5. Đổi tên file JSON bạn vừa tải về thành `google-credentials.json` và đặt vào thư mục gốc của dự án (cùng cấp với `index.js`). `index.js` hiện tại mặc định dùng `google-credentials.json`, nên bạn chỉ cần đặt file vào thư mục rồi chạy `node index.js`.

**Cài đặt**

1. Clone repo :

```powershell
git clone https://github.com/ductaiii/vietnamese-stt-api.git
cd vietnamese-stt-api
```

2. Cài phụ thuộc:

```powershell
npm install
```

**Cách dùng nhanh**

1. Đặt file âm thanh (ví dụ `cuulong.mp3`) vào thư mục dự án.
2. Trong `index.js`, kiểm tra `config` (các trường `encoding`, `sampleRateHertz`, `languageCode`) sao cho khớp với file âm thanh.
3. Chạy (dùng file mặc định `cuulong.mp3`):

```powershell
node index.js
```

Hoặc chạy với file bất kỳ:

```powershell
node index.js ten-file-bat-ky.mp3
```

Ứng dụng sẽ in kết quả chuyển chữ ra console và lưu transcript vào thư mục `transcripts/<ten-file-audio>.txt`.

**Ví dụ đầu ra**

```text
D:\TongHopProject\nodejs-googlestt>node index.js
ai ơi ngủ đi xa hãy nhớ kẻ trắng nước trong là Cần Thơ Cửu Long giang ra biển lớn chính dòng thương ai với tôi bằng cả tấm lòng mẹ trẻ con lại các trận
Đã lưu transcript vào: D:\TongHopProject\nodejs-googlestt\transcripts\cuulong.txt
```

**Gặp lỗi phổ biến**

- Nếu nhận được lỗi dạng `Specify MP3 encoding to match audio file.` thì chỉnh `config.encoding` thành `MP3` cho file .mp3, hoặc `LINEAR16` cho file WAV 16-bit PCM.
- Lỗi xác thực: kiểm tra biến `GOOGLE_APPLICATION_CREDENTIALS` trỏ đúng tới file JSON.

