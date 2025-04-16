function createSearchBox() {
    if (document.getElementById('yt-playlist-search-box')) return;

    const input = document.createElement('input');
    input.id = 'yt-playlist-search-box';
    input.placeholder = 'Search playlists...';

    input.addEventListener('input', () => {
        const searchTerm = input.value.trim().toLowerCase();
        const playlists = document.querySelectorAll('#label.style-scope.ytd-playlist-add-to-option-renderer');

        playlists.forEach(playlist => {
            const name = playlist.textContent.trim().toLowerCase();
            const container = playlist.closest('ytd-playlist-add-to-option-renderer');
            if (container) {
                container.style.display = name.includes(searchTerm) ? 'block' : 'none';
            }
        });
    });

    const observer = new MutationObserver(() => {
        const popup = document.querySelector('ytd-add-to-playlist-renderer');
        if (popup && !popup.querySelector('#yt-playlist-search-box')) {
            popup.prepend(input);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

createSearchBox();
