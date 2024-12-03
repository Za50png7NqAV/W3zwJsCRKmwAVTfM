+++
title ="Exaple Post"
date ="2024-10-22 15:15:25"
manu ="main"
type="page"
layout= "custom-list"
+++
this page 
1. पेज टेम्पलेट फाइल बनाएं

layouts/_default या किसी खास टाइप के लिए (जैसे layouts/page/) में एक नया फाइल बनाएं:

layouts/page/single.html

यह page नाम के कंटेंट टाइप के लिए कस्टम लेआउट होगा।


---

2. Content Type (page) के लिए Content बनाएँ

Hugo में, content फोल्डर में एक नया डायरेक्टरी बनाएं:

content/page/

इसमें अपनी कस्टम पोस्ट के लिए .md फाइल रखें, जैसे:

content/page/example.md