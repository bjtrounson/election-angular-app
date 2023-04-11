import ElectionModel, {LocalStorageProxy, Party} from "./election.model";

describe('Election', () => {
    it('should create an instance', () => {
        const localStorageProxy = new LocalStorageProxy<Party>("parties", [
            {id: 0, name: "Party 1", votes: 10},
        ]);
        expect(new ElectionModel(localStorageProxy)).toBeTruthy();
    });
    it("should have parties", () => {
        const localStorageProxy = new LocalStorageProxy<Party>("parties", [
            {id: 0, name: "Party 1", votes: 10},
        ]);
        const election = new ElectionModel(localStorageProxy);
        const parties = election.getAllParties();
        expect(parties).toEqual([{id: 0, name: "Party 1", votes: 10}]);
    });
});
