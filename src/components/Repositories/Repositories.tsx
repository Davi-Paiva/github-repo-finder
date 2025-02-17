import "./RepositoriesStyles.css";
import { Repository } from "../../types/repositoryTypes";
import { useState, useEffect } from "react";
import { searchRepositories } from "../../services/repositoryService";
import Select from 'react-select';
import { CardsContainer } from "../CardsContainer/CardsContainer";
import { getAllLanguages } from "../../services/repositoryService";
import { getUserRepositoriesByPage } from "../../services/repositoryService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { colors } from "../../utils/colors";


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

            <div className="repo-search-container">
                <div className="repo-search-input-container">
                    <input className="repo-search-input" type="text" placeholder="Search for a repository" onChange={(e) => {
                        setSearch(e.target.value);
                    }}/>
                </div>

                <div className="repo-language-select-container">
                <Select
                    className="repo-language-select"
                    placeholder="Language"
                    options={languages.map((language) => ({ value: language, label: language }))}
                    formatOptionLabel={({ label }) => (
                        <div style={{ display: 'flex', alignItems: 'center', height: '2rem' }}>
                            <p style={{ backgroundColor: colors[languages.indexOf(label)], borderRadius: '1rem', padding: '0.5rem', display: label === "All" ? 'none' : 'block' }}></p>
                            <span style={{ marginLeft: '8px' }}>{label}</span>
                        </div>
                    )}
                    styles={{
                        control: (base) => ({
                            ...base,
                            color: '#666666',
                            fontSize: '0.8rem',
                            borderRadius: '0.2rem',
                            border: '1px solid #e1e4e8',
                            width: '100%',
                        }),
                        indicatorSeparator: (base) => ({
                            ...base,
                            display: 'none',
                        }),
                        menu: (base) => ({
                            ...base,
                            fontSize: '0.8rem',
                            marginTop: '0',
                            borderRadius: '0',
                        }),
                        input: (base) => ({
                            ...base,
                            color: 'transparent',
                        }),
                    }}
                        onChange={(selectedOption) => {
                            setLanguage(selectedOption?.value || "");
                        }}
                    />
                </div>
            </div>
            
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