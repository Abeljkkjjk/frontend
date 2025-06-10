import { apiService, renderer, utils } from './app.js';

const searchInput = document.getElementById('search-input');
console.log('Search input element:', searchInput); // Debug

const moviesContainer = document.getElementById('popular-movies'); // Usar o container de filmes populares para exibir resultados da busca

let searchTimeout;

searchInput.addEventListener('input', () => {
    console.log('Input event triggered'); // Debug
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const query = searchInput.value.trim();
        console.log('Search query:', query); // Debug
        if (query) {
            utils.showLoading();
            try {
                const data = await apiService.searchMovies(query);
                console.log('Search results:', data); // Debug
                if (data.results && data.results.length > 0) {
                    moviesContainer.innerHTML = ''; // Limpa o conteúdo anterior
                    renderer.renderMovieSection(data.results, 'popular-movies');
                    // Esconder outras seções se estiverem visíveis
                    document.querySelectorAll('.movie-section').forEach(section => {
                        if (section.id !== 'popular-movies') {
                            section.style.display = 'none';
                        }
                    });
                } else {
                    moviesContainer.innerHTML = '<div class="col-12 text-center text-light">Nenhum filme encontrado para sua busca.</div>';
                }
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
                utils.showError('Erro ao buscar filmes. Tente novamente mais tarde.', moviesContainer);
            } finally {
                utils.hideLoading();
            }
        } else {
            // Se a busca estiver vazia, recarrega todas as seções de filmes
            location.reload(); // Recarrega a página para mostrar todas as seções novamente
        }
    }, 500); // Debounce de 500ms
});