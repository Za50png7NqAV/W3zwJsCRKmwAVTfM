function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index].text;
  }

  window.onload = function() {
    const quote = getRandomQuote();
    const shareText = `*${quote}*\n______\n*🎲Try New*: https://yojnaportal.com/status\n\n*Follow Yojna Portal*: https://wa.me/channel/0029VaCwEclFy72HhgQzJB0I`;
    const encodedText = encodeURIComponent(shareText);

    const whatsappURL = `https://wa.me/status?text=${encodedText}`;
    window.location.href = whatsappURL;
  }