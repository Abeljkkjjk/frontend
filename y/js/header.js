const headerContent = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">NETFLIX</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Filmes</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Séries</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Minha Lista</a></li>
                </ul>
                <div class="d-flex">
                    <div class="search-container me-3">
                        <input type="text" id="search-input" class="form-control search-input" placeholder="Buscar filmes..." aria-label="Buscar filmes">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="navbar-nav">
                        <a class="nav-link" href="#" title="Notificações">
                            <i class="fas fa-bell"></i>
                        </a>
                        <a class="nav-link" href="#" title="Perfil">
                            <i class="fas fa-user"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
`;
document.getElementById('header').innerHTML = headerContent;