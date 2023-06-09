// Code licensed under the MIT

const component = (id) => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("search").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById(id).style.display = "flex";
};

const load = () => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("search").style.display = "flex";
  document.getElementById("home").style.display = "none";

  document.getElementById('simple-search').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      e.preventDefault()
      search()
    }
  })

  document.getElementById('sampleSearch').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      e.preventDefault()
      search(document.getElementById('sampleSearch').value)
    }
  })

};

const start = () => {
  const url = location.href.split("/").pop().split("-?-")[0];
  if ((url == "index.html") | (url == "")) {
    component("home");
  } else {
    component("loading");
    // component("search");
    var query = decodeURI(location.href.split("/").pop().split("-?-")[1]);
    fetch("/api.search?" + query.replaceAll(' ', '_'))
      .then((data) => data.json())
      .then((out) => {
        out = JSON.parse(out);
        document.getElementById("title").innerHTML = out.title;
        document.getElementById("info").innerHTML = out.text;
        document.getElementById("link").href = out.link;

        document.getElementById("sampleSearch").value = query;

        // if (out.image != null) {
        //   fetch(out.image).then((res) => {
        //     if (res.status == 200) {
        //       document.getElementById("img").setAttribute("src", out.image);
        //     } else {
        //       document.getElementById("img-p").style.display = "none";
        //     }
        //   });
        // } else {
        //   document.getElementById("img-p").style.display = "none";
        // }
        // console.log(out.video)
        // if (out.video != null) {
        //   fetch(out.video).then((res) => {
        //     if (res.status == 200) {
        //       document.getElementById("vid").setAttribute("src", out.video);
        //     } else {
        //       document.getElementById("vid-p").style.display = "none";
        //     }
        //   });
        // } else {
        //   document.getElementById("vid-p").style.display = "none";
        // }

        // if (out["related_search_on_google"] != []) {
        for (var i = 0; i < out["related_search_on_google"].length; i++) {
          element = out["related_search_on_google"][i];
          console.log(element);

          const elementComponent = document.createElement("a");
          elementComponent.setAttribute('class', 'p-2 rounded bg-white m-2 font-bold text-slate-900 flex')
          elementComponent.setAttribute('href', `https://google.com/search?q=${element}`)
          elementComponent.innerText = element

          const imageComponent = document.createElement('img')
          imageComponent.setAttribute('class', 'w-6 mr-2')
          imageComponent.setAttribute('src', '/src/search-svgrepo-com.svg')

          elementComponent.appendChild(imageComponent)
          
          document.getElementById(
            "rel-ser"
          ).appendChild(elementComponent)
        }
        // }

        load();
      });
  }
};

window.addEventListener("popstate", function () {
  start();
});

const search = (q = "") => {
  if (q != "") {
    location.href = "/?/search-?-" + q;
  } else {
    var val = document.getElementById("simple-search").value;
    location.href = "/?/search-?-" + val;
  }
};
