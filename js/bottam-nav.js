document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.bottom-nav ul li a');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
    
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});