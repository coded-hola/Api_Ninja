class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.inputTitle = document.querySelector('#title');
    this.inputBody = document.querySelector('#body');
    this.inputId = document.querySelector('#id');
    this.subPost = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts){
    let output = "";

    posts.forEach((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
        `;
    });

    this.post.innerHTML = output;
  }

  showAlert(msg, cls){
    this.clearAlert();
    const div = document.createElement('div');
    let container = document.querySelector('.posts-container');
    let post = document.querySelector('#posts');

    div.className = cls;
    div.appendChild(document.createTextNode(msg));

    container.insertBefore(div, post);

    setTimeout(() =>{
      this.clearAlert();
    }, 2000);

  }

  clearAlert(){
    const current = document.querySelector('.alert');
    if(current){
      current.remove();
    }
  }

  clearId(){
    this.inputId = "";
  }

  clearInputs(){
    document.querySelector('#title').value = "";
    document.querySelector('#body').value = "";
  }

  fillForm(data){
    this.inputTitle.value = data.title;
    this.inputBody.value = data.body;
    this.inputId.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(type){
    if(type === "edit"){
      this.subPost.textContent = "Update Post";
      this.subPost.className = "post-submit alert alert-danger btn-block";

      const btn = document.createElement('button');
      btn.className = "post-cancel btn btn-light btn-block";
      btn.appendChild(document.createTextNode('cancel EDIT'));

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');

      cardForm.insertBefore(btn, formEnd);

    }else {
      this.subPost.textContent = "Post it";
      this.subPost.className = "post-submit btn btn-primary btn-block";

      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }
      this.clearId();
      this.clearAlert();
      this.clearInputs();
    }

  }

}


export const ui = new UI();
