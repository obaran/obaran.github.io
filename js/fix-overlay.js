document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('canvas.matrix-canvas');
    const header = document.querySelector('header');
    const ctaButtons = document.querySelector('.cta-buttons');
    const themeToggle = document.querySelector('#theme-toggle');
  
    if (canvas) {
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      canvas.style.position = 'absolute';
    }
  
    if (ctaButtons) {
      ctaButtons.style.position = 'relative';
      ctaButtons.style.zIndex = '1001';
      ctaButtons.querySelectorAll('a').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.zIndex = '1002';
      });
    }
  
    if (header) {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.zIndex = '1003';
    }
  
    if (themeToggle) {
      themeToggle.style.position = 'relative';
      themeToggle.style.zIndex = '1004';
      themeToggle.style.display = 'inline-block';
      themeToggle.style.visibility = 'visible';
      themeToggle.style.opacity = '1';
    }
  });
  