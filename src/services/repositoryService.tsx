import { Repository } from '../types/repositoryTypes';

export const getUserRepositories = async (username: string, page: number = 1, per_page: number = 10) => {
    try {
        return fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`)
            .then((response) => response.json())
            .then((data) => {
                return data.map((repository: Repository) => {
                    return {
                        id: repository.id,
                        name: repository.name,
                        full_name: repository.full_name,
                        description: repository.description,
                        url: repository.url,
                        language: repository.language
                    };
                });
            });
    } catch (error) {
        console.log('Failed to get user repositories: ', error);
        return null;
    }
}



