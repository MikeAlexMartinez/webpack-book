export default (text = "hello webpack") => {
  const container = document.createElement("div");
  const image = document.createElement("div");
  image.className = 'image'
  const element = document.createElement("div");
  element.className = "pure-button";
  element.innerHTML = text;

  element.onclick = () =>
    import("./lazy")
      .then(lazy => {
        element.textContent = lazy.default
      })
      .catch(err => {
        console.error(err);
      })

  container.append(image, element);

  return container;
};
