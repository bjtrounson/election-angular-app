import {z} from "zod";

const Party = z.object({
    id: z.number(),
    name: z.string(),
    votes: z.number(),
})
export type Party = z.infer<typeof Party>;

export enum Editing {
    Start,
    Done,
    Cancel
}

export class LocalStorageProxy<T> {
    private readonly storageKey: string;
    private storage: Array<T>;

    public constructor(key: string, initialValue: Array<T> = []) {
        this.storageKey = key;
        const currentStorage = this.get();
        if (currentStorage.length > 0) this.storage = currentStorage;
        else {
            this.storage = initialValue;
            this.set(initialValue);
        }
    }

    public set(value: Array<T>): void {
        localStorage.setItem(this.storageKey, JSON.stringify(value));
        this.storage = value;
    }

    public get(): Array<T> {
        if (this.storage != this.parseLocalStorage()) {
            this.storage = this.parseLocalStorage();
        }
        return this.storage;
    }

    private parseLocalStorage(): Array<T> {
        const storage = localStorage.getItem(this.storageKey);
        if (!storage) return [];

        const parsedStorage = JSON.parse(storage) as unknown;
        if (!Array.isArray(parsedStorage)) return [];
        return parsedStorage;
    }
}

export default class ElectionList {
    private readonly localStorageProxy: LocalStorageProxy<Party>;
    private editingParty: Party | null;
    private editingPartyIndex: number | null;
    private beforeEditNameCache: string;
    private beforeEditVoteCache: number;


    constructor(localStorageProxy: LocalStorageProxy<Party>) {
        this.localStorageProxy = localStorageProxy;
        this.editingParty = null
        this.editingPartyIndex = null
        this.beforeEditNameCache = ''
        this.beforeEditVoteCache = 0
    }

    public filterAboveVotes(filterLimit: number) {
        const parties = this.localStorageProxy.get();
        return parties.filter(party => party.votes >= filterLimit);
    }

    public filterBelowVotes(filterLimit: number) {
        const parties = this.localStorageProxy.get();
        return parties.filter(party => party.votes <= filterLimit);
    }

    public addParty(name: string, votes: number) {
        name = name.trim()
        if (!name) return;
        if (!votes) votes = 0;
        const parties = this.localStorageProxy.get();
        const id = parties.length + 1
        const party: Party = {id, name, votes};
        parties.push(party)
        this.localStorageProxy.set(parties);
    }

    public removeParty(partyId: number) {
        const parties = this.localStorageProxy.get();
        const partiesWithoutDeleted = parties.filter((party) => party.id !== partyId);
        this.localStorageProxy.set(partiesWithoutDeleted);
    }

    public editParty(editingState: Editing, party: Party, partyChanges?: Omit<Party, "id">) {
        const parties = this.localStorageProxy.get();
        const editingParty = this.editingParty;

        switch (editingState) {
            case Editing.Start:
                this.beforeEditNameCache = party.name
                this.beforeEditVoteCache = party.votes
                this.editingPartyIndex = parties.indexOf(party)
                this.editingParty = party;
                break;
            case Editing.Done:
                if (!editingParty) throw new Error("No party is being edited");
                if (!partyChanges) throw new Error("No party changes provided");
                const currentParties = this.localStorageProxy.get();
                const editedParties = currentParties.map(party => {
                    if (party.id === editingParty.id) return {id: editingParty.id, name: partyChanges.name, votes: partyChanges.votes};
                    return party;
                });
                this.localStorageProxy.set(editedParties);
                this.resetEditedParty();
                break;
            case Editing.Cancel:
                if (!editingParty) throw new Error("No party is being edited");
                const cancelEditParties = parties.map(party => {
                    if (party.id === editingParty.id) return {id: party.id, name: this.beforeEditNameCache, votes: this.beforeEditVoteCache};
                    return party;
                });
                this.localStorageProxy.set(cancelEditParties);
                this.resetEditedParty();
                break;
            default:
                break;
        }
    }

    public removeAllParties() {
        this.localStorageProxy.set([]);
    }

    public sortPartiesNames() {
        const parties = this.localStorageProxy.get();
        parties.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
    }

    public sortPartiesVotes() {
        const parties = this.localStorageProxy.get();
        parties.sort(function (a, b) {
            if (a.votes < b.votes) return -1;
            if (a.votes > b.votes) return 1;
            return 0;
        })
    }

    public findParty(targetName: string, targetVotes: number) {
        const parties = this.localStorageProxy.get();
        return parties.find((party) => party.name === targetName && party.votes === targetVotes)
    }

    public calculateTotalPartyVotes(): number {
        const parties = this.localStorageProxy.get();
        let totalVotes: number = 0;
        parties.forEach(party => {
            totalVotes += party.votes
        })
        return totalVotes
    }

    public calculatePartyPercentage(party: Party): number {
        const votePercentage: number = (party.votes / this.calculateTotalPartyVotes()) * 100;
        if (votePercentage >= 100) {
            return 100
        }
        return parseInt(votePercentage.toFixed(2))
    }

    public getAllParties() {
        return this.localStorageProxy.get();
    }

    public getEditedParty() {
        return this.editingParty;
    }

    private resetEditedParty() {
        this.editingParty = null;
        this.editingPartyIndex = null;
        this.beforeEditNameCache = "";
        this.beforeEditVoteCache = 0;
    }
}
