function mediumPosts(containerId){
    let mediumPosts = {};
    
    const mediumPostsEl = document.getElementById(containerId);
    const mediumPostsTitleEl = document.getElementById('medium-posts__title');
    const mediumPostListContainerEl = document.getElementById('medium-post-list');

    fetch("https://exec.clay.run/nicoslepicos/medium-get-user-posts-new?profile=hanserino", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        }).then(function (response) {
            return response.json().then(function (data) {
                mediumPosts.data = data;

                mediumPostsEl.dataset.fetchSuccess = true;

                for (var key in mediumPosts.data.posts) {
                    if (mediumPosts.data.posts.hasOwnProperty(key)) {
                        var postPath = mediumPosts.data.posts[key];

                        var titleEl = "",
                            excerptEl = "",
                            thumbEl = "";

                        if (postPath.title) {
                            titleEl = `<h3 class="medium-post__title">${postPath.title}</h3>`;
                        }
                        if (postPath.content.subtitle) {
                            excerptEl = `<p class="medium-post__excerpt">${postPath.content.subtitle}</p>`;
                        }
                        if (postPath.virtuals.previewImage.imageId) {
                            thumbEl = `<div class="medium-post__thumb">
                                <img class="medium-post__thumb__img" src="https://cdn-images-1.medium.com/fit/t/200/200/${postPath.virtuals.previewImage.imageId}">
                            </div>`;
                        }

                        mediumPostsTitleEl.innerHTML = `Siste fra <a target="_blank" href="https://medium.com/@designlabben/" title="@Designlabben på Medium">@Designlabben på Medium</a>:`;
                        mediumPostListContainerEl.innerHTML += `
                            <li class="medium-post__item">
                                <a class="medium-post__inner" target="_blank" href="https://medium.com/@designlabben/${postPath.uniqueSlug}">
                                    ${thumbEl}
                                    ${titleEl}
                                    ${excerptEl}
                                </a>
                            </li>
                        `;
                    }
                }
            });
        }).catch(error => {
            mediumPostsEl.dataset.fetchSuccess = "fail";
            console.log('medium fetch error: ', error);
            mediumPostsEl.innerHTML = `<h2 class="fetch-error">Noe gikk galt med innhentingen av blogg-innleggene. Prøv å last siden på nytt.</h2>`;
        });
}