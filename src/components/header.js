const Header = (title, date, temp) => {
  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The html tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //
  const headerDiv = document.createElement("div");
  headerDiv.className = "header";

  const dateSpan = document.createElement("span");
  dateSpan.className = "date";
  dateSpan.textContent = date;
  headerDiv.appendChild(dateSpan);

  const titleH1 = document.createElement("h1");
  titleH1.textContent = title;
  headerDiv.appendChild(titleH1);

  const tempSpan = document.createElement("span");
  tempSpan.className = "temp";
  tempSpan.textContent = temp;
  headerDiv.appendChild(tempSpan);

  return headerDiv;
};

const headerAppender = (selector) => {
  // TASK 2
  // ---------------------
  // Implement this function taking a css selector as its only argument.
  // It should create a header using the Header component above, passing arguments of your choosing.
  // It should append the header to the element in the DOM that matches the given selector.
  //
  // HINT: querySelector can take in a string (ie querySelector("#wrapper"))
  // but it can also take in a variable (ie querySelector(selector))
  // We are taking care of passing in the correct selector on line 16,
  // so all that you need to do is pass it into the querySelector method
  // for the tests to work!
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element with selector '${selector}' not found.`);
    return;
  }

  const header = Header("Sprint Challenge 5", "June 18 2023", "temp");
  element.appendChild(header);
};

export { Header, headerAppender };
