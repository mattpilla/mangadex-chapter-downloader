const GENERIC_ERROR = 'Something went wrong. Blame MangaDex. Maybe try again later?';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

new Vue({
    el: '#app',
    data: {
        url: '',
        error: '',
        busy: false,
        chapter: null,
        manga: null,
    },
    methods: {
        async getChapter() {
            this.busy = false;
            this.error = '';
            if (!this.url) {
                return;
            }
            const matches = /mangadex\.org\/chapter\/([^\/]+)/.exec(this.url);
            if (!matches || matches.length < 2) {
                return this.error = `Unable to find chapter ID from given URL. Enter the URL in a form like this: <b>https://mangadex.org/chapter/10122/1</b>`;
            }
            try {
                const res = await fetch(`${PROXY}https://mangadex.org/api/chapter/${matches[1]}`);
                if (res.ok) {
                    this.chapter = await res.json();
                    this.busy = true;
                    this.getManga();
                    return;
                }
                this.error = GENERIC_ERROR;
                console.log(res);
                return;
            } catch (e) {
                this.error = GENERIC_ERROR;
                console.error(e);
                return;
            }
        },
        async getManga() {
            if (!this.chapter || !this.chapter.manga_id) {
                return;
            }
            const res = await fetch(`${PROXY}https://mangadex.org/api/?id=${this.chapter.manga_id}&type=manga`);
            if (res.ok) {
                const data = await res.json();
                this.manga = data.manga;
            }
        },
    }
});
