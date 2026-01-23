<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRMNL Viewer</title>
    <link rel="manifest" href="manifest.json">
    <style>
        body { font-family: -apple-system, sans-serif; text-align: center; padding: 20px; background: #000; color: #fff; }
        .container { max-width: 500px; margin: 0 auto; background: #111; padding: 20px; border-radius: 16px; border: 1px solid #222; }
        #display-area { margin-top: 20px; border-radius: 8px; overflow: hidden; background: #000; min-height: 280px; display: flex; align-items: center; justify-content: center; border: 1px solid #333; }
        img { width: 100%; height: auto; display: block; }
        .controls { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        input { padding: 14px; border-radius: 8px; font-size: 16px; background: #222; color: white; border: 1px solid #444; }
        button { padding: 14px; cursor: pointer; background: #fff; color: #000; border: none; border-radius: 8px; font-weight: bold; }
        .hidden { display: none; }
        #status { font-size: 13px; margin-top: 15px; color: #666; }
        .build-tag { font-size: 10px; color: #222; margin-top: 40px; letter-spacing: 2px; }
        #reset-link { margin-top: 20px; font-size: 11px; color: #333; cursor: pointer; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>TRMNL</h1>
        
        <div id="setup-section" class="hidden">
            <p style="color:#888">Private API Setup</p>
            <div class="controls">
                <input type="text" id="token-input" placeholder="Access Token (API Key)">
                <input type="password" id="pin-input" placeholder="Set Security PIN">
                <button id="save-btn">Save Encrypted</button>
            </div>
        </div>

        <div id="main-section">
            <div id="display-area"><p id="status-text" style="color:#222">LOCKED</p></div>
            <div class="controls">
                <input type="password" id="unlock-pin" placeholder="Enter PIN">
                <button id="fetch-btn">Update Display</button>
            </div>
            <div id="status">Build V8 (JSON Parse Mode)</div>
        </div>
        
        <p id="reset-link">Reset App Data</p>
        <div class="build-tag">BUILD: 2026.01.22-V8</div>
    </div>

    <script>
        // --- CRYPTO ---
        async function deriveKey(pin) {
            const encoder = new TextEncoder();
            const baseKey = await crypto.subtle.importKey("raw", encoder.encode(pin), "PBKDF2", false, ["deriveKey"]);
            return crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: encoder.encode("trmnl-v8-salt"), iterations: 100000, hash: "SHA-256" },
                baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
            );
        }

        async function decryptData(encrypted, pin) {
            const key = await deriveKey(pin);
            return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(encrypted.iv) }, key, new Uint8Array(encrypted.data)));
        }

        async function encryptData(text, pin) {
            const key = await deriveKey(pin);
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text));
            return { iv: Array.from(iv), data: Array.from(new Uint8Array(ciphertext)) };
        }

        // --- APP ---
        (async () => {
            const setup = document.getElementById('setup-section');
            const main = document.getElementById('main-section');
            const status = document.getElementById('status');
            const displayArea = document.getElementById('display-area');

            if (!localStorage.getItem('creds')) {
                setup.classList.remove('hidden');
                main.classList.add('hidden');
            }

            document.getElementById('save-btn').onclick = async () => {
                const token = document.getElementById('token-input').value.trim();
                const pin = document.getElementById('pin-input').value;
                if(!token || !pin) return alert("All fields required");
                const encrypted = await encryptData(token, pin);
                localStorage.setItem('creds', JSON.stringify(encrypted));
                location.reload();
            };

            document.getElementById('fetch-btn').onclick = async () => {
                const pin = document.getElementById('unlock-pin').value;
                if(!pin) return;
                try {
                    status.innerText = "Processing...";
                    const token = await decryptData(JSON.parse(localStorage.getItem('creds')), pin);
                    
                    // Proxy call to the API endpoint
                    const apiEndpoint = 'https://usetrmnl.com/api/display';
                    const proxyUrl = `https://cors-anywhere.com/${apiEndpoint}`;
                    
                    status.innerText = "Requesting JSON...";
                    const response = await fetch(proxyUrl, {
                        headers: { 'access-token': token }
                    });
                    
                    if (response.status === 403) throw new Error("Proxy access required. Visit cors-anywhere.com/corsdemo");
                    if (!response.ok) throw new Error(`API Error: ${response.status}`);
                    
                    const data = await response.json();
                    if (!data.image_url) throw new Error("No image_url in response");

                    status.innerText = "Downloading Image...";
                    // Fetch the actual image using the URL provided in the JSON
                    const imgRes = await fetch(`https://cors-anywhere.com/${data.image_url}`);
                    const blob = await imgRes.blob();
                    
                    displayArea.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="TRMNL Screen">`;
                    status.innerText = "Synced: " + new Date().toLocaleTimeString();
                    status.style.color = "#4CAF50";
                } catch (e) {
                    status.innerText = "Error: " + e.message;
                    status.style.color = "#ff5252";
                }
            };

            document.getElementById('reset-link').onclick = () => { if(confirm("Wipe App?")) { localStorage.clear(); location.reload(); } };
        })();
    </script>
</body>
</html>
