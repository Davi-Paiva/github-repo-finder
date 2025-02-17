import { Repository } from "../../types/repositoryTypes";
import "./RepositoryCardStyles.css";
import { AiOutlineExport } from "react-icons/ai";
import { colors } from "../../utils/colors";

interface IRepositoryCardProps {
    repository: Repository;
    languages: string[];
}          



export function RepositoryCard({  repository, languages }: IRepositoryCardProps) {
    return (
        <div className="repository-card">
            <h2 className="repository-card-title">{repository.name}</h2>
            <p className="repository-card-description">{repository.description}</p>
            <p className={`${!repository.language? "invisible" : "repository-card-language"}`} style={{ backgroundColor: colors[languages.indexOf(repository.language)] }}>{repository.language}</p>
            <button className="repository-card-button" onClick={() => {
                window.open(`https://github.com/${repository.full_name}`, "_blank");
                }}>
                <p>Open on GitHub</p>
                <AiOutlineExport size={15} />
            </button>
        </div>
    );
}