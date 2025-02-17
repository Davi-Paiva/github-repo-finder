import { Repository } from '../types/repositoryTypes';
import { githubClient } from './auth';

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

export const getAllLanguages = async (username: string) => {
    const response = await getAllUserRepositories(username);
    const languages = response
        .map((repository: Repository) => repository.language)
        .filter((language): language is string => !!language);
    return {languages: Array.from(new Set(languages)) as string[], totalRepositories: response.length};
}



