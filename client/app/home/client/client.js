/**
 * Created by juan on 2/21/15.
 */

var name;
var tasks = [];


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
