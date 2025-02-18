import "./RepositoriesStyles.css";
import { Repository } from "../../types/repositoryTypes";
import { useState, useEffect } from "react";
import { searchRepositories } from "../../services/repositoryService";
import { CardsContainer } from "../CardsContainer/CardContainer";
import { getAllLanguages } from "../../services/repositoryService";
import { getUserRepositoriesByPage } from "../../services/repositoryService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RepositorySearch } from "../RepositorySearch/RespositorySearch";

interface IRepositoriesProps {
    username: string;
}

export function Repositories({ username }: IRepositoriesProps) {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [search, setSearch] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [languages, setLanguages] = useState<string[]>([]);
    const [totalRepositories, setTotalRepositories] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    function handleSearch(search: string, language: string) {
        setSearch(search);
        setLanguage(language);
    }

    useEffect(() => {
        getAllLanguages(username).then(({languages, totalRepositories}) => {
            setLanguages(["All", ...languages]);
            setTotalRepositories(totalRepositories);
        });
    }, [username]);

    useEffect(() => {
        if (search || language) {
            searchRepositories(username, search, language).then(( repositories ) => {
                setRepositories(repositories);
            });
        }
        else {
            getUserRepositoriesByPage(username, currentPage).then(( repositories ) => {
                setRepositories(repositories);
            });
        }
    }, [username, search, language, currentPage]);
    return (
        <div className="repositories">

            <div className="repositories-header">
                <h2 className="repositories-title">Repositories</h2>  
                <p className="repositories-number">{totalRepositories}</p>
            </div>

            <RepositorySearch languages={languages} handleSearch={handleSearch}/>
            
            <CardsContainer repositories={repositories} languages={languages}/>

            <div className="repositories-pagination">
                <FaArrowLeft className="repositories-pagination-button" onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                }}/>

                <p className="repositories-pagination-page">{currentPage}</p>

                <FaArrowRight className="repositories-pagination-button" onClick={() => {
                    if (currentPage < totalRepositories/10) {
                        setCurrentPage(currentPage + 1);
                    }}
                } />
            </div>

        </div>
    );
}