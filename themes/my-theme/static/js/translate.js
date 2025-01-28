
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en', // डिफॉल्ट भाषा
            includedLanguages: 'en,hi,mr,gu', // जोड़ी गई भाषाएँ
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    