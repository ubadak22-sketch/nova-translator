// ---------------- CONFIG --------------------
const BASE_URL = "https://adolfo-blondish-sublaryngeally.ngrok-free.dev";

// ---------------- LANG LIST -----------------
const languages = {
    "Auto Detect": "auto",
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

for (let name in languages) {
    const code = languages[name];
    src.innerHTML += `<option value="${code}">${name}</option>`;
    tgt.innerHTML += `<option value="${code}">${name}</option>`;
}
src.value = "auto";
tgt.value = "hi";

// ----------------- SWAP LANGS ----------------
document.getElementById("swapBtn").onclick = () => {
    let temp = src.value;
    src.value = tgt.value;
    tgt.value = temp;
};

// ----------------- TRANSLATE ------------------
document.getElementById("translateBtn").onclick = async () => {
    let text = document.getElementById("inputText").value;
    if (!text) return alert("Bro enter some text.");

    try {
        const res = await fetch(`${BASE_URL}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                target_lang: tgt.value
            })
        });

        const data = await res.json();
        document.getElementById("outputText").value =
            data.translated_text || data.error || "Translation failed.";
    } catch (e) {
        document.getElementById("outputText").value = "Error contacting server.";
    }
};

// ----------------- OCR (SERVER) ----------------
document.getElementById("ocrBtn").onclick = async () => {
    const image = document.getElementById("imageInput").files[0];
    if (!image) return alert("Upload an image bro.");

    let form = new FormData();
    form.append("image", image);

    const res = await fetch(`${BASE_URL}/ocr`, {
        method: "POST",
        body: form
    });

    const data = await res.json();
    document.getElementById("inputText").value =
        data.extracted_text || data.error || "OCR failed.";
};

// ----------------- DETECT LANGUAGE -------------
async function detectLang(text) {
    const res = await fetch(`${BASE_URL}/detect_lang`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text })
    });
    const data = await res.json();
    return data.language || "unknown";
}
