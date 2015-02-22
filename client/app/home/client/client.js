/**
 * Created by juan on 2/21/15.
 */
var count=0;

function show_image(src, width, height, alt) {
  if(count<1) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    document.body.appendChild(img);
  }
  count++;  //makes sure that the element only get appended once
}
