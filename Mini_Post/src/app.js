import { http } from "./http";
import { ui } from "./ui";


document.addEventListener('DOMContentLoaded', getPosts);

// SUBMIT METHOD
document.querySelector('.post-submit').addEventListener('click', submitPost);

// DELETE METHOD
document.querySelector('#posts').addEventListener('click', deletePost);

// EDIT STATE
document.querySelector('#posts').addEventListener('click', enableEdit);

document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(data => {
      ui.showPosts(data);

    })
    .catch(error => console.log(error));
}


function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  if(title === "" || body === ""){
    ui.showAlert("Please fill in the fields", "alert alert-danger");
  }else {
    const data = {
      title,
      body
    }
    if(id === ""){
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Added successfully', 'alert alert-success');
          ui.clearInputs();
          getPosts();
        })
        .catch(error => console.log(error))

    }else {
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Updated successfully', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();

        })
        .catch(error => console.log(error))

    }


  }


}

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure')){
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("post removed successfully", "alert alert-danger");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    ui.fillForm(data)

  }

  e.preventDefault();
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}
