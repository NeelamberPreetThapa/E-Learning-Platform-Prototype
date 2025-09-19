// --- DATABASE (HARDCODED) ---
const courses = [
    {
        id: 1,
        title: "The Ultimate JavaScript Masterclass",
        instructor: "Aditya Sharma",
        description: "Go from beginner to expert in JavaScript. Covers everything from basics to advanced topics like closures, async/await, and more.",
        image: "https://i.ytimg.com/vi/ER9SspLe4Hg/maxresdefault.jpg",
        modules: [
            { id: 1, title: "Introduction to JavaScript", videoId: "W6NZfCO5SIk" },
            { id: 2, title: "Variables and Data Types", videoId: "ER9SspLe4Hg" },
            { id: 3, title: "Functions and Scope", videoId: "N8apGk_3_pM" }
        ]
    },
    {
        id: 2,
        title: "React for Beginners: The Complete Guide",
        instructor: "Priya Singh",
        description: "Learn how to build powerful, fast, and scalable web applications with React. We will build multiple projects.",
        image: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
        modules: [
            { id: 1, title: "What is React?", videoId: "bMknfKXIFA8" },
            { id: 2, title: "Components and Props", videoId: "SqcY0GlETPk" },
            { id: 3, title: "State and Lifecycle", videoId: "4UZrsTqkcW4" }
        ]
    },
    {
        id: 3,
        title: "Advanced CSS and SASS",
        instructor: "Rohan Verma",
        description: "Take your CSS skills to the next level. Learn about Flexbox, Grid, Animations, and the power of SASS.",
        image: "https://i.ytimg.com/vi/s7wE2sRjL74/maxresdefault.jpg",
        modules: [
            { id: 1, title: "Flexbox Crash Course", videoId: "K74l26pE4YA" },
            { id: 2, title: "CSS Grid Explained", videoId: "7kVeCqQCxlk" },
            { id: 3, title: "Introduction to SASS", videoId: "s7wE2sRjL74" }
        ]
    }
];

// --- LOGIC FOR DIFFERENT PAGES ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

   if (path.endsWith('/') || path.includes('index.html')) {
        renderHomepage();
    } else if (path.includes('course.html')) {
        renderCourseDetailPage();
    } else if (path.includes('player.html')) {
        renderPlayerPage();
    }
});

function renderHomepage() {
    const courseGrid = document.getElementById('course-grid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = courses.map(course => `
        <div class="course-card" onclick="location.href='./course.html?id=${course.id}'">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-card-content">
                <h3>${course.title}</h3>
                <p>By ${course.instructor}</p>
            </div>
        </div>
    `).join('');
}

function renderCourseDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get('id'));
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        document.body.innerHTML = '<h1>Course not found!</h1>';
        return;
    }
    
    // Populate course details
    document.getElementById('course-title-header').innerText = course.title;
    document.getElementById('course-image').src = course.image;
    document.getElementById('course-title').innerText = course.title;
    document.getElementById('course-instructor').innerText = course.instructor;
    document.getElementById('course-description').innerText = course.description;

    const curriculumList = document.getElementById('curriculum-list');
    curriculumList.innerHTML = course.modules.map(module => `
        <li>
            <span>${module.title}</span>
            <a href="./player.html?courseId=${course.id}&moduleId=${module.id}">▶ Play</a>
        </li>
    `).join('');
}

function renderPlayerPage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get('courseId'));
    const moduleId = parseInt(params.get('moduleId'));
    
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        document.body.innerHTML = '<h1>Course not found!</h1>';
        return;
    }

    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
        document.body.innerHTML = '<h1>Lecture not found!</h1>';
        return;
    }

    document.getElementById('video-title').innerText = module.title;
    document.getElementById('video-player').src = `https://www.youtube.com/embed/${module.videoId}?autoplay=1`;
    document.getElementById('back-to-course').href = `./course.html?id=${course.id}`;
    
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = course.modules.map(m => `
        <li class="${m.id === moduleId ? 'active' : ''}">
            <a href="player.html?courseId=${course.id}&moduleId=${m.id}">${m.title}</a>
        </li>
    `).join('');
}
