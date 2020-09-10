const github = new Github;
const ui = new UI;
const searchInput = document.querySelector('#search');

searchInput.addEventListener('keyup', (e) =>{
    const userText = e.target.value;

    if(userText !== ""){
        github.getUser(userText)
        .then((res) => {
            if(res.profile.message === 'Not Found'){
                // show alert
                ui.showAlert('cant locate user', 'danger');

            }else {
                //show profile
                console.log(res)
                ui.showProfile(res.profile);
                ui.showRepo(res.repo);
            }
        })
    }else {
        ui.clearUI();
    }












    e.preventDefault();
});