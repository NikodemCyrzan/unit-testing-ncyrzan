import { getUtcStringDate } from "tasks/task3";
import { setupMockDate, MockDateSetup } from "./testUtils";

describe("task3", () => {
	let mockDate: MockDateSetup;

	beforeEach(() => {
		mockDate = setupMockDate();
	});

	afterEach(() => {
		mockDate.reset();
	});

	it("returns current date when no arguments provided", () => {
		mockDate.set({ isoDate: "2026-01-01T12:00:00Z" });

		expect(getUtcStringDate()).toBe("2026-01-01T12:00:00Z");
	});

	it("returns correct ISO date in timezone -02:00", () => {
		mockDate.set({ offset: -120 });

		expect(getUtcStringDate(new Date(2026, 0, 2, 12, 0, 0))).toBe("2026-01-02T14:00:00Z");
	});

	it("returns correct ISO date in timezone +05:00 when close to midnight", () => {
		mockDate.set({ offset: 300 });

		expect(getUtcStringDate(new Date(2026, 0, 2, 1, 0, 0))).toBe("2026-01-01T20:00:00Z");
	});

	it("throws if date is invalid", () => {
		expect(() => getUtcStringDate(new Date("invalid"))).toThrow("Invalid date");
	});
});
