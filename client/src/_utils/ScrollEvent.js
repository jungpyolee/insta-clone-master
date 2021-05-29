function isElementUnderBottom(elem, triggerDiff) {
  const { top } = elem.getBoundingClientRect();
  const { innerHeight } = window;
  return top > innerHeight + (triggerDiff || 0);
}

function handleScroll() {
  const elems = document.querySelectorAll(".up-on-scroll");
  elems.forEach((elem) => {
    if (isElementUnderBottom(elem, -20)) {
      elem.style.opacity = "0";
      elem.style.transform = "translateY(70px)";
    } else {
      elem.style.opacity = "1";
      elem.style.transform = "translateY(0px)";
    }
  });
}

window.addEventListener("scroll", handleScroll);

//   <style>
//   .list .up-on-scroll {
//     ...
//     transition: transform 0.7s, opacity 1s;
//   }
// </style>
// <div class="list">
//   ...
//   <article class="up-on-scroll">
//     We are dancing. We are extra dancing...
//   </article>
//   <article class="up-on-scroll">
//     We are extra cool everyday dancing...
//   </article>
//   <div class="img-wrap">
//     <img src="..." alt="img1" class="up-on-scroll" />
//   </div>
//   ...
// </div>
