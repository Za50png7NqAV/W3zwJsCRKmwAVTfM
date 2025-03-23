function generateSecureToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
function decodeBase64(encodedStr) {
    try {
        if (/^[A-Za-z0-9+/=]+$/.test(encodedStr)) {
            const decodedString = atob(encodedStr);
            new URL(decodedString); // URL validation
            return decodedString;
        } else {
            console.error("Invalid Base64 string");
            return null;
        }
    } catch (e) {
        console.error("Base64 decoding failed:", e);
        return null;
    }
}

const tokenMap = JSON.parse(localStorage.getItem('tokenMap')) || {};
const urlParams = new URLSearchParams(window.location.search);
const shortCode = urlParams.get('pdf');
const iframe = document.getElementById('iframe');

if (shortCode) {
    if (tokenMap[shortCode]) {
     
        iframe.src = decodeURIComponent(tokenMap[shortCode]);
        console.log(`✅ Secure Token से लोड किया गया: ${tokenMap[shortCode]}`);
    } else {
  
        const decodedURL = decodeBase64(shortCode);
        if (decodedURL) {
        
            const secureToken = generateSecureToken();
            tokenMap[secureToken] = decodedURL;
            localStorage.setItem('tokenMap', JSON.stringify(tokenMap)); 
            
           
            iframe.src = decodeURIComponent(decodedURL);
            
         
            const newUrl = `${window.location.origin}${window.location.pathname}?pdf=${secureToken}`;
            window.history.replaceState(null, null, newUrl);
            console.log(`✅ New Secure Token Generated: ${secureToken}`);
        } else {
            console.error("Invalid PDF URL");
            window.location.href = "https://yojnaportal.com"; 
        }
    }
} else {
  
    window.location.href = "https://yojnaportal.com";
}