    const scriptURL = 'https://script.google.com/macros/s/AKfycbzA_zNbxIRDyx8hjYvfoRm97aM9SM1oKceu8ZYnmFIleTXvO5iULYRaBXn_ecGwN3pJ/exec';
        const form = document.forms['search-form'];
        
        // Set the timestamp automatically
        const timestampField = document.getElementById('timestamp-field');
        const now = new Date();
        const formattedDate = now.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(',', '');
        timestampField.value = formattedDate;
      
        // Handle form submission
        form.addEventListener('submit', e => {
          e.preventDefault();
          fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        });