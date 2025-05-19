// User profiles data
const profiles = [
    {
        id: 1,
        name: "User 1",
        avatar: "G1.jpg"
    },
    {
        id: 2,
        name: "User 2",
        avatar: "G2.jpg"
    },
    {
        id: 3,
        name: "User 3",
        avatar: "G3.jpg"
    },
    {
        id: 4,
        name: "User 4",
        avatar: "G4.jpg"
    }
];

// Movie data
const movies = {
    popular: [
        {
            id: 1,
            title: "Stranger Things",
            thumbnail: "G5.jpg"
        },
        {
            id: 2,
            title: "The Witcher",
            thumbnail: "G6.jpg"
        },
        {
            id: 3,
            title: "Money Heist",
            thumbnail: "G7.jpg"
        },
        {
            id: 4,
            title: "The Queen's Gambit",
            thumbnail: "G8.jpg"
        },
        {
            id: 5,
            title: "Dark",
            thumbnail: "G9.jpg"
        },
        {
            id: 6,
            title: "Breaking Bad",
            thumbnail: "G10.jpg"
        }
    ],
    trending: [
        {
            id: 7,
            title: "Squid Game",
            thumbnail: "G11.jpg"
        },
        {
            id: 8,
            title: "The Crown",
            thumbnail: "G12.jpg"
        },
        {
            id: 9,
            title: "Peaky Blinders",
            thumbnail: "G2.jpg"
        },
        {
            id: 10,
            title: "Narcos",
            thumbnail: "G4.jpg"
        },
        {
            id: 11,
            title: "The Mandalorian",
            thumbnail: "G6.jpg"
        },
        {
            id: 12,
            title: "Ozark",
            thumbnail: "G8.jpg"
        }
    ]
};

// DOM Elements
const userSelectionScreen = document.getElementById('user-selection');
const mainContent = document.getElementById('main-content');
const profilesContainer = document.querySelector('#user-selection > div');
const popularContainer = document.querySelectorAll('.grid')[0];
const trendingContainer = document.querySelectorAll('.grid')[1];

// Initialize the app
function init() {
    renderProfiles();
    renderMovies();
    setupEventListeners();
}

// Render user profiles
function renderProfiles() {
    profilesContainer.innerHTML = '';
    profiles.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.className = 'flex flex-col items-center cursor-pointer';
        profileElement.innerHTML = `
            <div class="profile-avatar w-32 h-32 rounded bg-gray-800 overflow-hidden transition-all duration-300">
                <img src="${profile.avatar}" alt="${profile.name}" class="w-full h-full object-cover">
            </div>
            <span class="mt-4 text-gray-400">${profile.name}</span>
        `;
        profileElement.addEventListener('click', () => selectProfile(profile.id));
        profilesContainer.appendChild(profileElement);
    });
}

// Render movies
function renderMovies() {
    popularContainer.innerHTML = '';
    trendingContainer.innerHTML = '';

    movies.popular.forEach(movie => {
        const movieElement = createMovieElement(movie);
        popularContainer.appendChild(movieElement);
    });

    movies.trending.forEach(movie => {
        const movieElement = createMovieElement(movie);
        trendingContainer.appendChild(movieElement);
    });
}

// Create movie element
function createMovieElement(movie) {
    const element = document.createElement('div');
    element.className = 'movie-thumbnail rounded overflow-hidden transition-transform duration-300 cursor-pointer';
    element.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}" class="w-full h-full object-cover">
    `;
    return element;
}

let currentProfile = null;

// Handle profile selection
function selectProfile(profileId) {
    currentProfile = profiles.find(p => p.id === profileId);
    userSelectionScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    document.getElementById('current-profile-img').src = currentProfile.avatar;
    renderProfileSwitcher();
}

// Render profile switcher in navbar
function renderProfileSwitcher() {
    const switcher = document.getElementById('profile-switcher');
    switcher.innerHTML = '';
    
    profiles.forEach(profile => {
        if (profile.id !== currentProfile.id) {
            const profileElement = document.createElement('div');
            profileElement.className = 'flex flex-col items-center cursor-pointer';
            profileElement.innerHTML = `
                <img src="${profile.avatar}" class="w-12 h-12 rounded">
                <span class="text-xs text-gray-400 mt-1">${profile.name}</span>
            `;
            profileElement.addEventListener('click', () => selectProfile(profile.id));
            switcher.appendChild(profileElement);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('sign-out').addEventListener('click', () => {
        mainContent.classList.add('hidden');
        userSelectionScreen.classList.remove('hidden');
    });

    // Add click handlers for all play buttons
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.closest('[data-movie-id]').dataset.movieId;
            playMovie(movieId);
        });
    });
}

// Video data
const videoSources = {
    1: "V1.MP4",
    2: "V2.MOV",
    3: "V3.MOV",
    4: "V4.MOV",
    5: "V5.MOV",
    6: "V6.MOV",
    7: "V7.MOV",
    8: "V7.MOV",
    9: "V5.MP4",
    10: "V3.MOV",
    11: "V5.MOV",
    12: "V7.MOV"
};

// Handle video upload
document.getElementById('video-upload')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file || file.type !== 'video/mp4') {
        alert('Please select an MP4 video file');
        return;
    }
    const videoUrl = URL.createObjectURL(file);
    playUploadedVideo(videoUrl, file.name);
});

function playUploadedVideo(videoUrl, title) {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    
    // Set video source
    videoPlayer.querySelector('source').src = videoUrl;
    videoPlayer.load();
    
    // Show modal
    videoModal.classList.remove('hidden');
    
    // Play video
    videoPlayer.play();
    
    // Clean up when video ends
    videoPlayer.onended = function() {
        URL.revokeObjectURL(videoUrl);
    };
}

// Play movie function
function playMovie(movieId) {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeBtn = document.getElementById('close-video');
    
    // Set video source
    videoPlayer.querySelector('source').src = videoSources[movieId] || videoSources[1];
    videoPlayer.load();
    
    // Show modal
    videoModal.classList.remove('hidden');
    
    // Play video
    videoPlayer.play();
    
    // Close button handler
    closeBtn.onclick = () => {
        videoPlayer.pause();
        videoModal.classList.add('hidden');
    };
    
    // Close when clicking outside video
    videoModal.onclick = (e) => {
        if (e.target === videoModal) {
            videoPlayer.pause();
            videoModal.classList.add('hidden');
        }
    };
}

// Update movie elements to include play buttons
function createMovieElement(movie) {
    const element = document.createElement('div');
    element.className = 'movie-thumbnail rounded overflow-hidden transition-transform duration-300 cursor-pointer relative group';
    element.dataset.movieId = movie.id;
    element.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <button class="play-button bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `;
    return element;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);