// API

const url = 'https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search?page=1&page_size=100&query=';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'c9b65324camshb4ab5d05cd23741p1e8258jsnffe7878ba1d5',
        'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
    }
};

async function fetchCourse() {
    try {
        const response = await fetch(url, options);
        const courseData = await response.json();

        function createCard(course) {
            var cardHTML = `
                <article class="card" aria-labelledby="course-title">
                <div class="media" role="img" aria-label="Course image">
                    <span class="badge" id="sale-badge">${course.sale_price_usd === 0 ? 'SALE' : ''}</span>
                    <img id="course-image" src="${course.image}" alt="${course.name} course image"/>
                </div>

                <div class="body">
                    <div class="meta">
                    <div class="category" id="course-category">${course.category}</div>
                    </div>

                    <h3 class="title" id="course-title">${course.name}</h3>
                    <p class="desc" id="course-desc">${course.description}</p>

                    <div class="meta">
                    <div class="meta-item">Category: <strong id="meta-category">${course.category}</strong></div>
                    </div>

                    <div class="price">
                    <div class="price-left">
                        <div>
                        <div class="price-text" id="price-text">${course.sale_price_usd === 0 ? 'FREE' : `$${course.sale_price_usd}`}</div>
                        <div class="old-price" id="old-price">${course.sale_price_usd === 0 ? `$${course.actual_price_usd}` : ''}</div>
                        </div>
                    </div>

                    <div class="actions">
                        <a id="enroll-link" class="btn btn-primary" href="${course.url}" target="_blank" rel="noopener">Enroll now</a>
                        <a id="preview-link" class="btn btn-outline" href="${course.clean_url}" target="_blank" rel="noopener" >Course page</a>
                    </div>
                    </div>
                </div>
                </article>
            `;
            return cardHTML;
        }

        function displayCourses(courses) {
            // TODO: Generate and insert cards into DOM

            // Course Container
            var container = document.getElementById('courses-container');

            // Clear existing courses
            container.innerHTML = '';

            // Append each card
            courses.forEach(function (course) {
                var cardHTML = createCard(course);
                container.innerHTML += cardHTML; // Append each card
            });
        }

        displayCourses(courseData.courses);

    } catch (error) {
        console.error(error);
    }
}


fetchCourse();

// function formatPrice(actualPrice, salePrice) {
//     // TODO: Format price display
//     // - Show "FREE" if sale price is 0
//     // - Show crossed out original price
// }