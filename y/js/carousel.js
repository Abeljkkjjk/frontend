// Variáveis globais
const API_KEY = '378d279e455281cf6cd09787d6348ffe';
const BASE_URL = 'https://api.themoviedb.org/3';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'; // URL base para imagens de fundo (horizontais)

// Função para buscar filmes populares para o carrossel
async function fetchCarouselMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
        if (!response.ok) throw new Error('Erro na requisição da API');
        
        const data = await response.json();
        // Filtra apenas filmes que têm backdrop_path (imagem horizontal)
        const moviesWithBackdrop = data.results.filter(movie => movie.backdrop_path);
        displayCarousel(moviesWithBackdrop.slice(0, 5)); // Exibe apenas os 5 primeiros filmes
    } catch (error) {
        console.error('Erro ao buscar filmes para o carrossel:', error);
        displayFallbackCarousel();
    }
}

// Função para exibir carrossel de fallback em caso de erro
function displayFallbackCarousel() {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const innerContainer = document.getElementById('carousel-inner');

    indicatorsContainer.innerHTML = '';
    innerContainer.innerHTML = `
        <div class="carousel-item active">
            <div class="carousel-fallback">
                <h2>Bem-vindo ao Netflix Clone</h2>
                <p>Explore milhares de filmes e séries</p>
            </div>
        </div>
    `;
}

// Função para exibir o carrossel
function displayCarousel(movies) {
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const innerContainer = document.getElementById('carousel-inner');

    indicatorsContainer.innerHTML = ''; // Limpa os indicadores anteriores
    innerContainer.innerHTML = ''; // Limpa os itens do carrossel anteriores

    movies.forEach((movie, index) => {
        // Cria os indicadores
        const indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        indicatorsContainer.appendChild(indicator);

        // Cria os itens do carrossel
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        // Usa backdrop_path para imagens horizontais adequadas ao carrossel
        const imageUrl = movie.backdrop_path 
            ? BACKDROP_BASE_URL + movie.backdrop_path 
            : 'https://via.placeholder.com/1920x1080/141414/ffffff?text=Imagem+Indisponível';

        carouselItem.innerHTML = `
            <div class="carousel-image-container">
                <img src="${imageUrl}" class="d-block w-100 carousel-image" alt="${movie.title}" loading="lazy">
                <div class="carousel-gradient"></div>
            </div>
            <div class="carousel-caption">
                <div class="carousel-content">
                    <h2 class="carousel-title">${movie.title}</h2>
                    <p class="carousel-description">${movie.overview ? movie.overview.slice(0, 150) + '...' : 'Descrição não disponível'}</p>
                    <div class="carousel-buttons">
                        <button class="btn btn-light btn-lg me-3" onclick="playMovie(${movie.id})">
                            <i class="fas fa-play me-2"></i>Assistir
                        </button>
                        <button class="btn btn-secondary btn-lg" onclick="addToList(${movie.id})">
                            <i class="fas fa-plus me-2"></i>Minha Lista
                        </button>
                    </div>
                    <div class="carousel-rating">
                        <span class="rating-badge">${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        <span class="rating-text">IMDb</span>
                    </div>
                </div>
            </div>
        `;
        innerContainer.appendChild(carouselItem);
    });
}

// Funções auxiliares para os botões do carrosselfunction playMovie(movieId) {
    const tmdbUrl = `https://www.themoviedb.org/movie/${movieId}`;
    window.open(tmdbUrl, "_blank"); // Abre em uma nova aba
    console.log(`Redirecionando para a página do filme ID: ${movieId} no TMDb: ${tmdbUrl}`);
}
function addToList(movieId) {
    // Implementação futura - adicionar à lista do usuário
    console.log(`Adicionando filme ID: ${movieId} à lista`);
    alert('Filme adicionado à sua lista!');
}

// Função para inicializar o carrossel com auto-play
function initCarousel() {
    fetchCarouselMovies();
    
    // Configurar auto-play do carrossel
    const carouselElement = document.getElementById('carouselExampleCaptions');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000, // 5 segundos
            wrap: true,
            pause: 'hover'
        });
    }
}

// Inicializa o carrossel ao carregar a página
document.addEventListener('DOMContentLoaded', initCarousel);