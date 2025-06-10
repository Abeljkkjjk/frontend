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
                    // Limpa o container e adiciona um título
                    moviesContainer.innerHTML = `
                        <div class="col-12 mb-4">
                            <h3 class="text-light">Resultados para: "${query}"</h3>
                        </div>
                    `;
                    
                    // Renderiza os filmes encontrados
                    renderer.renderMovieSection(data.results, 'popular-movies');
                    
                    // Esconde outras seções
                    document.querySelectorAll('.movie-section').forEach(section => {
                        if (section.id !== 'popular-movies') {
                            section.style.display = 'none';
                        }
                    });
                } else {
                    moviesContainer.innerHTML = `
                        <div class="col-12 text-center text-light">
                            <h3>Nenhum filme encontrado para: "${query}"</h3>
                            <p>Tente buscar com outros termos.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
                moviesContainer.innerHTML = `
                    <div class="col-12 text-center text-light">
                        <h3>Erro ao buscar filmes</h3>
                        <p>Por favor, tente novamente mais tarde.</p>
                    </div>
                `;
            } finally {
                utils.hideLoading();
            }
        } else {
            // Se a busca estiver vazia, mostra todas as seções novamente
            document.querySelectorAll('.movie-section').forEach(section => {
                section.style.display = 'block';
            });
            location.reload();
        }
    }, 500); // Debounce de 500ms
});