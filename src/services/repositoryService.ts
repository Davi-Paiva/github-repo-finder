import { Repository } from '../types/repositoryTypes';
import { githubClient } from './auth';

/**
 * Get all repositories for a user
 * @param {string} username - The username of the user to get the repositories for
 * @returns {Promise<Repository[]>} A promise that resolves to an array of repositories
 * Note: GitHub's API uses pagination with a default limit of 30 repositories per page.
 * This function fetches all pages until no more repositories are found.
 */
export const getAllUserRepositories = async (username: string): Promise<Repository[]> => {
    try {
        let allRepositories: Repository[] = [];
        let currentPage = 1;
        let hasMorePages = true;
        const per_page = 50;
        while (hasMorePages) {
            const response = await fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${per_page}`, githubClient);
            const data = await response.json();
            
            data.forEach((repository: Repository) => {
                allRepositories.push({
                    id: repository.id,
                    name: repository.name,
                    full_name: repository.full_name,
                    description: repository.description,
                    url: repository.url,
                    language: repository.language
                });
            });
            
            if (data.length < per_page) {
                hasMorePages = false;
            }
            currentPage++;
        }
        return allRepositories;
    } catch (error) {
        console.log('Failed to get user repositories: ', error);
        return [];
    }
}

/**
 * Get repositories for a user by page
 * @param {string} username - The username of the user to get the repositories for
 * @param {number} page - The page number to get
 * @param {number} per_page - The number of repositories per page
 * @returns {Promise<Repository[]>} A promise that resolves to an array of repositories
 */
export const getUserRepositoriesByPage = async (username: string, page: number = 1, per_page: number = 10) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`, githubClient);
    const data = await response.json();
    const repositories = data.map((repository: Repository) => ({
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        description: repository.description,
        url: repository.url,
        language: repository.language
    }));
    return repositories;
}

/**
 * Search repositories for a user by name and language
 * @param {string} username - The username of the user to get the repositories for
 * @param {string} searchQuery - The query to search for
 * @param {string} searchLanguage - The language to search for
 * @returns {Promise<Repository[]>} A promise that resolves to an array of repositories
 * Note: I noticed that the GitHub API does not support searching for repositories of a specific user by name and language.
 * Therefore, I had to fetch all repositories and then filter them in the client side.
 */

export const searchRepositories = async (username: string, searchQuery: string, searchLanguage: string) => {
    let repositories = await getAllUserRepositories(username);
    if (searchQuery) {
        repositories = repositories.filter((repository: Repository) => repository.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (searchLanguage && searchLanguage !== "All") {
        repositories = repositories.filter((repository: Repository) => repository.language === searchLanguage);
    }
    repositories = repositories.slice(0, 10);
    return repositories;
}

/**
 * Get all languages for a user
 * @param {string} username - The username of the user to get the languages for
 * @returns {Promise<{languages: string[], totalRepositories: number}>} A promise that resolves to an object containing an array of languages and the total number of repositories
 * Note: I developed this function in order to display only relevant languages in the filter by language dropdown.
 */
export const getAllLanguages = async (username: string) => {
    const response = await getAllUserRepositories(username);
    const languages = response
        .map((repository: Repository) => repository.language)
        .filter((language): language is string => !!language);
    return {languages: Array.from(new Set(languages)) as string[], totalRepositories: response.length};
}



