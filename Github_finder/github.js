class Github {
    constructor(){
        this.client_id = '939d60ba7a069d7c21ab';
        this.client_secret = '85d79ad858f259b48a2d414ab499239e4cee7b9d';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user = 'coded-hola'){
        const profileRes = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profileRep = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileRes.json();
        const repo = await profileRep.json();

        return {
            profile,
            repo
        }
    }
}