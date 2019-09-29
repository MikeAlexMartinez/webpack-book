export default (text = HELLO) => {
  const container = document.createElement("div");
  const image = document.createElement("div");
  image.className = 'image'
  const element = document.createElement("div");
  element.className = "pure-button";
  element.innerHTML = text;

  container.append(image, element);

  return container;
};