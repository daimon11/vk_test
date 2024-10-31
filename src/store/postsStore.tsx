import {makeAutoObservable} from 'mobx';
import axios from 'axios';

interface Post {
    data: {
        id: string;
        author: string;
        title: string;
        thumbnail: string;
    };
}

class PostStore {
    posts: Post[] = [];
    page: string | null = null;
    after: string = '';
    loading: boolean = false;
    error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setPosts(data: Post[]): void {
        this.posts = [...this.posts, ...data];
    }

    setPage(page: string | null): void {
        console.log('setPage', page);
        this.page = page;
    }

    setAfter(after: string): void {
        this.after = after;
    }

    setLoading(loading: boolean): void {
        this.loading = loading;
    }

    setError(error: string): void {
        this.error = error;
    }

    deletePostById(id: string): void {
        this.posts = this.posts.filter(post => post.data.id !== id);
    }

    updatePostAuthor(id: string, newAuthor: string): void {
        const post = this.posts.find(post => post.data.id === id);
        if (post) {
            post.data.author = newAuthor;
        }
    }

    async fetchPosts(subreddit: string = 'rusAskReddit'): Promise<void> {
        if (this.loading) return;

        this.setLoading(true);
        try {
            const response = await axios(`https://www.reddit.com/r/${subreddit}/${this.page}.json?limit=8&${this.after ? `after=${this.after}` : ''}`);
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            const data: Post[] = response.data.data.children;
            console.log('data', data);
            this.setPosts(data);
            this.setAfter(response.data.data.after);
        } catch (error) {
            this.setError(error instanceof Error ? error.message : String(error));
        } finally {
            this.setLoading(false);
        }
    }

    resetPosts(): void {
        this.posts = [];
        this.page = '';
        this.after = '';
        this.error = '';
    }
}

const postStore = new PostStore();
export default postStore;