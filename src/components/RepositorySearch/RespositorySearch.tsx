import { useState, useEffect } from "react";
import Select from 'react-select';
import { colors } from "../../utils/colors";
import "./RepositorySearchStyles.css";
import { SelectorStyles } from "./SelectorStyles";

interface IRepositoriesProps {
    languages: string[];
    handleSearch: (search: string, language: string) => void;
}

export function RepositorySearch({ languages, handleSearch }: IRepositoriesProps) {
    const [search, setSearch] = useState<string>("");
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        handleSearch(search, language);
    }, [search, language]);

    return (
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
                styles={SelectorStyles}
                    onChange={(selectedOption) => {
                        setLanguage(selectedOption?.value || "");
                    }}
                />
            </div>
        </div>
    );
}