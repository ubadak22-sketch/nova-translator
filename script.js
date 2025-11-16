// --------------- CONFIG -----------------
const API_URL = "https://adolfo-blondish-sublaryngeally.ngrok-free.dev/translate";

// --------------- LANGUAGE LIST -----------------
const languages = {
    "English": "en",
    "Hindi": "hi",
    "Tamil": "ta",
    "Urdu": "ur",
    "Japanese": "ja",
    "Arabic": "ar",
    "Chinese": "zh-cn",
    "French": "fr",
    "Spanish": "es",
    "German": "de"
};

// Populate dropdowns
const src = document.getElementById("sourceLang");
const tgt = document.getElementById("targetLang");

for (let lang in languages) {
    src.innerHTML += `<option value="${languages[lang]}">${lang}</option>`;
    tgt.innerHTML += `<option value="${languages[lang]}">${lang}</option>`;
}
tgt.value = "hi"; // default output language

// Swap button
document.getElementById("swapBtn").onclick = () => {
    let temp = src.value;
    src.value = tgt.value;
    tgt.value = temp;
};

// Translate button
document.getElementById("translateBtn").onclick = async () => {
    let text = document.getElementById("inputText").value;
    if (!text) {
        alert("Bro enter some text.");
        return;
    }

    let payload = {
        text: text,
        source_lang: src.value,
        target_lang: tgt.value
    };

    try {
        let res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            document.getElementById("outputText").value =
                "Our servers are down right now.\nPlease try again in an hour.";
            return;
        }

        let data = await res.json();

        if (data.error) {
            document.getElementById("outputText").value =
                "Our servers are under maintenance.\nPlease try again a little later.";
            return;
        }

        document.getElementById("outputText").value =
            data.translated_text || "Translation unavailable right now.";

    } catch (err) {
        document.getElementById("outputText").value =
            "Server offline.\nWe will be back shortly 🙏";
    }
};

// OCR handling
document.getElementById("ocrBtn").onclick = async () => {
    const image = document.getElementById("imageInput").files[0];
    if (!image) return alert("Upload an image first bro.");

    const result = await Tesseract.recognize(image, 'eng');
    document.getElementById("inputText").value = result.data.text;
};
