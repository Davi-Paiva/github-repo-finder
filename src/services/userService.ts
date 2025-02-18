import {User} from '../types/userTypes'
import { githubClient } from './auth'

/**
 * Get a user by username
 * @param {string} username - The username of the user to get
 * @returns {Promise<User | null>} A promise that resolves to a user or null if the user is not found
 */
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

/**
 * Search for a user by query
 * @param {string} query - The query to search for
 * @returns {Promise<User[] | null>} A promise that resolves to an array of users or null if the user is not found
 */
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
