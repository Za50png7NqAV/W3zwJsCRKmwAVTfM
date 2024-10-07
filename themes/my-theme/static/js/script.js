<script>
        function showCategory(category, element) {
            // Hide all content divs
            var contents = document.querySelectorAll('.content');
            contents.forEach(function(content) {
                content.classList.remove('active');
            });

            // Remove active class from all nav links
            var navLinks = document.querySelectorAll('.bottom-nav div a');
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            // Show the selected content div
            var activeContent = document.getElementById(category);
            activeContent.classList.add('active');

            // Add active class to the clicked nav link
            element.classList.add('active');
        }
    </script>