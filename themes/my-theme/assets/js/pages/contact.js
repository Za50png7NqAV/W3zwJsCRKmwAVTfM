    function previewData(event) {
            // Prevent the form from submitting
            event.preventDefault();

            // Get form field values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // Display the preview
            document.getElementById("preview-name").textContent = name;
            document.getElementById("preview-email").textContent = email;
            document.getElementById("preview-message").textContent = message;

            // Hide the form container
            document.getElementById("form-container").style.display = "none";

            // Show the preview container
            document.getElementById("preview").style.display = "block";
        }
  

  // ✅ Replace with your full WhatsApp number in international format (no +, no spaces)
  const WHATSAPP_NUMBER = "917805009974"; // e.g., 919876543210

  // Handle "Send on WhatsApp" click
  document.getElementById("WhatsApp").addEventListener("click", function () {
    // Read values from the inputs (they still have the user’s data)
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();

    // Build a neat message
    const text =
`New contact form message:
Name: ${name}
Contact: ${contact}
Message: ${msg}`;

    // Open WhatsApp with pre-filled text
    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waURL, "_blank");
  });