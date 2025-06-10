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
                    // Limpa o container
                    moviesContainer.innerHTML = '';
                    
                    // Adiciona o título da pesquisa
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'col-12 mb-4';
                    titleDiv.innerHTML = `<h3 class="text-light">Resultados para: "${query}"</h3>`;
                    moviesContainer.appendChild(titleDiv);
                    
                    // Adiciona cada filme individualmente
                    data.results.forEach(movie => {
                        const movieDiv = document.createElement('div');
                        movieDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
                        movieDiv.innerHTML = `
                            <div class="movie-card" onclick="movieActions.showDetails(${movie.id})">
                                <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450/141414/ffffff?text=Sem+Imagem'}" 
                                     alt="${movie.title}" 
                                     class="img-fluid">
                                <div class="overlay">
                                    <h5 class="text-light">${movie.title}</h5>
                                    <p class="text-light">${movie.overview ? movie.overview.slice(0, 100) + '...' : 'Sem descrição disponível'}</p>
                                    <div class="movie-info">
                                        <span class="rating">
                                            <i class="fas fa-star text-warning"></i>
                                            ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                        </span>
                                        <span class="release-date">
                                            <i class="fas fa-calendar text-info"></i>
                                            ${movie.release_date ? new Date(movie.release_date).toLocaleDateString('pt-BR') : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `;
                        moviesContainer.appendChild(movieDiv);
                    });
                    
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