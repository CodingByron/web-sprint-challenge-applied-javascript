const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const headlineDiv = document.createElement("div");
  headlineDiv.className = "headline";
  headlineDiv.textContent = article.headline;
  cardDiv.appendChild(headlineDiv);

  const authorDiv = document.createElement("div");
  authorDiv.className = "author";

  const imgContainerDiv = document.createElement("div");
  imgContainerDiv.className = "img-container";

  const img = document.createElement("img");
  img.src = article.authorPhoto;
  imgContainerDiv.appendChild(img);

  authorDiv.appendChild(imgContainerDiv);

  const authorNameSpan = document.createElement("span");
  authorNameSpan.textContent = `By ${article.authorName}`;
  authorDiv.appendChild(authorNameSpan);

  cardDiv.appendChild(authorDiv);

  cardDiv.addEventListener("click", () => {
    console.log(article.headline);
  });

  return cardDiv;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element with selector '${selector}' not found.`);
    return;
  }

  fetch("http://localhost:5001/api/articles")
    .then((response) => response.json())
    .then((data) => {
      const articles = extractArticles(data);
      articles.forEach((article) => {
        const card = Card(article);
        element.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });
};

const extractArticles = (data) => {
  const articles = [];
  for (const key in data) {
    if (Array.isArray(data[key])) {
      articles.push(...data[key]);
    } else if (typeof data[key] === "object") {
      articles.push(...extractArticles(data[key]));
    }
  }
  return articles;
};

export { Card, cardAppender };
