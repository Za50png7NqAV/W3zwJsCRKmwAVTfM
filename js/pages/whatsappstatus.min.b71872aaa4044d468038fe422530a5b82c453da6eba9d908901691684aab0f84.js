function getRandomQuote(){const e=Math.floor(Math.random()*quotes.length);return quotes[e].text}window.onload=function(){const e=getRandomQuote(),t=`*${e}*
______
*🎲Try New*: https://yojnaportal.com/status

*Follow Yojna Portal*: https://wa.me/channel/0029VaCwEclFy72HhgQzJB0I`,n=encodeURIComponent(t),s=`https://wa.me/status?text=${n}`;window.location.href=s}