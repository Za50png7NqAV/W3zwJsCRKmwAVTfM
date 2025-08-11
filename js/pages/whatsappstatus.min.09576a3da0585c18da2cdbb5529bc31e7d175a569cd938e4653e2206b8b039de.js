function getRandomQuote(){const e=Math.floor(Math.random()*quotes.length);return quotes[e].text}window.onload=function(){const s=getRandomQuote(),e=`$*{quote}*

*Follow Yojna Portal*: https://wa.me/channel/0029VaCwEclFy72HhgQzJB0I`,t=encodeURIComponent(e),n=`https://wa.me/status?text=${t}`;window.location.href=n}