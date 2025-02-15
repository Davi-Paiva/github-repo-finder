import { getUser, searchUser } from "../services/userService";

describe("getUser", () => {
    it("should return a user", async () => {
        const user = await getUser("Davi-Paiva");
        expect(user?.login).toBe("Davi-Paiva");
        expect(user?.id).toBe(137201028);
        expect(user?.avatar_url).toBe("https://avatars.githubusercontent.com/u/137201028?v=4");
        expect(user?.url).toBe("https://api.github.com/users/Davi-Paiva");
        expect(user?.repos_url).toBe("https://api.github.com/users/Davi-Paiva/repos");
        expect(user?.name).toBe("Davi Paiva");
        expect(user?.email).toBe(null);
        expect(user?.public_repos).toBe(2);
    });
});

describe("searchUser", () => {
    it("should return a list of users", async () => {
        const users = await searchUser("Davi-Pa");
        expect(users?.length).toBeGreaterThan(1);
        for(const user of users ?? []){
            expect(user.login.toLowerCase()).toContain("davi-pa");
        }
    });
});