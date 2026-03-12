# Speech-to-Text with Google Cloud

Demo:

https://github.com/user-attachments/assets/fbfb26e7-a75c-437e-af13-b9820fe4441b


This Node.js application demonstrates how to convert speech to text using the Google Cloud Speech-to-Text API. The application reads an audio file, sends it to the API for transcription, and outputs the resulting text.

**Prerequisites**

- `Node.js` installed on your machine.
- A Google Cloud Platform (GCP) project with the **Speech-to-Text** API enabled.
- A Service Account with its downloaded JSON key file (service account key). You will use this JSON file for authentication.

**Getting the JSON key from Google Cloud (Summary)**

1. Go to the GCP Console: https://console.cloud.google.com/
2. Select your project, and navigate to **IAM & Admin → Service Accounts**.
3. Create a new Service Account (if you don't have one) and grant it the `Cloud Speech Client` role (or `Owner` temporarily for testing).
4. Create a Key (JSON format) and download the file (e.g., `my-gcp-key.json`).
5. Rename the downloaded JSON file to `google-credentials.json` and place it in the root directory of the project (at the same level as `index.js`). By default, `index.js` uses `google-credentials.json`, so you just need to place the file in the folder and run `node index.js`.

**Installation**

1. Clone the repository:

```powershell
git clone [https://github.com/ductaiii/vietnamese-stt-api.git](https://github.com/ductaiii/vietnamese-stt-api.git)
cd vietnamese-stt-api
