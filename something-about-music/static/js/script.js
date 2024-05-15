document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postsSection = document.getElementById('posts');
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                `;
                postsSection.appendChild(postDiv);
            });
        });
});