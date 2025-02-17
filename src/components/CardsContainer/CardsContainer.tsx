import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
import { Repository } from "../../types/repositoryTypes";
import "./CardContainerStyles.css";

interface CardsContainerProps {
    repositories: Repository[];
    languages: string[];
}

export function CardsContainer({ repositories, languages }: CardsContainerProps) {
    return (
        <div className="cards-container">
                {Array.from({ length: Math.ceil(repositories.length / 2) }, (_, index) => (
                    <div key={index} className="card-pair">
                        <div className="card-pair-item">
                            <RepositoryCard repository={repositories[index * 2]} languages={languages} />
                        </div>

                        <div className="card-pair-item">
                            {repositories[index * 2 + 1] && (
                                <RepositoryCard repository={repositories[index * 2 + 1]} languages={languages} />
                            )}
                        </div>

                        
                    </div>
                ))}
            
        </div>
    );
}