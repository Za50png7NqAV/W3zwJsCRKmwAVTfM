const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('leftSidebar');
const overlay = document.getElementById('sidebarOverlay');

openBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});