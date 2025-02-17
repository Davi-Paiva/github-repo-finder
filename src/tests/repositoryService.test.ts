import { getAllUserRepositories } from "../services/repositoryService";

describe("getAllUserRepositories", () => {
    it("should return a list of repositories", async () => {
        const repositories = await getAllUserRepositories("Davi-Paiva");
        expect(repositories).toBeDefined();
        expect(repositories?.length).toBe(2);
        expect(repositories?.[0].id).toBe(922196510);
        expect(repositories?.[0].name).toBe("davipaiva");
        expect(repositories?.[0].full_name).toBe("Davi-Paiva/davipaiva");
        expect(repositories?.[0].description).toBe("my personal website");
        expect(repositories?.[0].url).toBe("https://api.github.com/repos/Davi-Paiva/davipaiva");
        expect(repositories?.[0].language).toBe("JavaScript");
    });
});
