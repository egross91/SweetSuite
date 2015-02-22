/**
 * Created by juan on 2/21/15.
 */

var exampleExists = false;
var name;
var tasks = [];

function show_image(src, width, height, alt) {
  if(!exampleExists) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    document.body.appendChild(img);
  }
  exampleExists = true;  //makes sure that the element only get appended once
}

// ask for name of list and then tasks
function list_info() {
  remove_lists();
  name = prompt("Please enter list name", "List Name");
  var temp = "a";
  while(temp != "done") {
    temp = prompt("Enter task, enter \"done\" when done", "done");
    tasks.push(temp);
  }
}

// post name and tasks
/*

TODO
post text on same page, not new one
post with new lines in between tasks

 */
function post_list() {
  document.write(name + "\n");
  for(var i = 0; i < tasks.length-1; i++) {
    document.write(tasks[i] + "\n");
  }
}


function remove_lists() {
  var images = document.getElementsByTagName('img');
  var l = images.length;
  for (var i = 0; i < l; i++) {
    images[0].parentNode.removeChild(images[0]);
  }
  exampleExists = false;
}
