// --------------- CONFIG -----------------
const API_URL = "https://adolfo-blondish-sublaryngeally.ngrok-free.dev/translate";

// --------------- LANGUAGE LIST -----------------
const languages = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Chinese (Simplified)": "zh-cn",
    "Chinese (Traditional)": "zh-tw",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Finnish": "fi",
    "French": "fr",
    "Frisian": "fy",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Haitian Creole": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jv",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Khmer": "km",
    "Korean": "ko",
    "Kurdish": "ku",
    "Kyrgyz": "ky",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Mongolian": "mn",
    "Myanmar": "my",
    "Nepali": "ne",
    "Norwegian": "no",
    "Nyanja": "ny",
    "Odia": "or",
    "Pashto": "ps",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Punjabi": "pa",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Scots Gaelic": "gd",
    "Serbian": "sr",
    "Sesotho": "st",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tagalog": "tl",
    "Tajik": "tg",
    "Tamil": "ta",
    "Tatar": "tt",
    "Telugu": "te",
    "Thai": "th",
    "Turkish": "tr",
    "Turkmen": "tk",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uyghur": "ug",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu"
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
