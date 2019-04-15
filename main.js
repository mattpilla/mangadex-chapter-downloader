new Vue({
    el: '#app',
    data: {
        url: '',
        error: ''
    },
    methods: {
        getChapter() {
            this.error = '';
            if (!this.url) {
                return;
            }
            let matches = /mangadex\.org\/chapter\/([^\/]+)/.exec(this.url);
            if (!matches || matches.length < 2) {
                return this.error = `Unable to find chapter ID from given URL. Enter the URL in a form like this: <b>https://mangadex.org/chapter/10122/1</b>`;
            }
            axios.get(`https://cors.io/?https://mangadex.org/api/chapter/${matches[1]}`).then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    return response.data;
                } else {
                    console.log(response);
                    return false;
                }
            }).catch(e => {
                console.error(e);
                return false;
            });
        }
    }
});
