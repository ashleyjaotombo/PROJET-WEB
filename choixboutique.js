const left = document.querySelector('.left')
const right = document.querySelector('.right')
const container = document.querySelector('.container')

left.addEventListener('mouseenter', () => container.classList.add('hover-left'));
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'));

right.addEventListener('mouseenter', () => container.classList.add('hover-right'));
right.addEventListener('mouseleave', () => container.classList.remove('hover-right'));



document.querySelectorAll('.infos').forEach(infos => {
    const tooltipId = infos.dataset.tooltipId;
    const tooltip = document.getElementById(tooltipId);

    infos.addEventListener('mouseenter', (e) => {
        const rect = infos.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.scrollY}px`;
        tooltip.style.left = `${rect.right + 10}px`;
        tooltip.style.display = 'block';
    });

    infos.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});