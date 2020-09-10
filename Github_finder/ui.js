class UI{
    constructor(){
        this.profile = document.querySelector('.display_profile');
    }

    showProfile(user){
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
        `
    }

    clearUI(){
        this.profile.innerHTML = '';
    }

    showAlert(msg, cls){
        this.clearAlert();
        let div = document.createElement('div');
        div.className = `alert ${cls}`;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container_user');

        const search = document.querySelector('.h3');

        container.insertBefore(div, search);
        setTimeout(() => {
            this.clearAlert()
        },2000);
    }

    clearAlert(){
        const cur = document.querySelector('.alert');
        if(cur){
            cur.remove();
        }
    }

    showRepo(repo){
        let output = '';
        repo.forEach((rep) => {
            output += `
            <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${rep.html_url}" target="_blank">${rep.name}</a>
              </div>
              <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${rep.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${rep.watchers_count}</span>
              <span class="badge badge-success">Forks: ${rep.forms_count}</span>
              </div>
            </div>
          </div>
            `
        });

        document.querySelector('#repos').innerHTML = output;
    }

}