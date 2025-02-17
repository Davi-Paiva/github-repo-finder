import {User} from '../types/userTypes'
import { githubClient } from './auth'

export const getUser = async (username: string): Promise<User | null> => {
    try {
        return fetch(`https://api.github.com/users/${username}`, githubClient)
            .then((response) => response.json())
            .then((data) => {
                return {
                    id: data.id,
                    login: data.login,
                    avatar_url: data.avatar_url,
                    url: data.url,
                    repos_url: data.repos_url,
                    name: data.name,
                    email: data.email,
                    public_repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    bio: data.bio,
                } as User;
            });
    }catch (error){
        console.log('Failed to get user: ', error);
        return null;
    }
}

export const searchUser = async (query: string): Promise<User[] | null> => {
    if(query.length === 0) {
        return [];
    }
    try {
        return fetch(`https://api.github.com/search/users?q=${query}&per_page=10`, githubClient)
            .then((response) => response.json())
            .then((data) => {
                return data.items.map((item: User) => {
                    return {
                        id: item.id,
                        login: item.login,
                        avatar_url: item.avatar_url,
                        url: item.url,
                        repos_url: item.repos_url,
                        name: item.name,
                        email: item.email,
                        public_repos: item.public_repos,
                    } as User;
                });
            });
    }catch (error){
        console.log('Failed to search user: ', error);
        return null;
    }
}
