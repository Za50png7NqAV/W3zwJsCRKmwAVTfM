document.addEventListener('DOMContentLoaded', function() {
    const scrollMenu = document.getElementById('scrollMenu');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    function updateScrollButtons() {
        // Show or hide the left button
        if (scrollMenu.scrollLeft > 0) {
            scrollLeftBtn.classList.add('show');
        } else {
            scrollLeftBtn.classList.remove('show');
        }

        // Show or hide the right button
        if (scrollMenu.scrollLeft + scrollMenu.clientWidth < scrollMenu.scrollWidth) {
            scrollRightBtn.classList.add('show');
        } else {
            scrollRightBtn.classList.remove('show');
        }
    }

    function scroll(direction) {
        const scrollAmount = scrollMenu.clientWidth / 2;
        scrollMenu.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    scrollLeftBtn.addEventListener('click', () => scroll('left'));
    scrollRightBtn.addEventListener('click', () => scroll('right'));

    // Check buttons on scroll and load
    scrollMenu.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // Initial check when page loads
});