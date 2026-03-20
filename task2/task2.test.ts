import { QuantityValidator } from "tasks/task2";

describe("QuantityValidator", () => {
	it.each([-1, -5, -9])("throws error if threshold is < 0", (threshold) => {
		expect(() => new QuantityValidator(threshold, 5)).toThrow("Threshold can't be negative");
	});

	it.each([0, -5, -9])("throws error if packageSize is <= 0", (packageSize) => {
		expect(() => new QuantityValidator(5, packageSize)).toThrow(
			"PackageSize can't be less than one",
		);
	});

	it.each([0, -2, -5])("is not valid when quantity <= 0", (quantity) => {
		const validator = new QuantityValidator(10, 5);

		const result = validator.validate(quantity);
		expect(result.isValid).toBe(false);
		expect(result.error).toBe("Quantity must be positive number");
	});

	it.each([1, 5, 9])("is valid when quantity < threshold", (quantity) => {
		const validator = new QuantityValidator(10, 5);

		const result = validator.validate(quantity);
		expect(result.isValid).toBe(true);
	});

	it.each([10, 15, 20])(
		"is valid when quantity >= threshold and is divisible by packageSize",
		(quantity) => {
			const validator = new QuantityValidator(10, 5);

			const result = validator.validate(quantity);
			expect(result.isValid).toBe(true);
		},
	);

	it.each([11, 12, 16])(
		"is not valid when quantity >= threshold and is not divisible by packageSize",
		(quantity) => {
			const validator = new QuantityValidator(10, 5);

			const result = validator.validate(quantity);
			expect(result.isValid).toBe(false);
			expect(result.error).toBe("Quantity should be divisible by 5");
		},
	);

	it("returns error when not valid", () => {
		const validator = new QuantityValidator(5, 5);

		const result = validator.validate(9);
		expect(result.error).toBe("Quantity should be divisible by 5");
	});

	it("doesn't return error when valid", () => {
		const validator = new QuantityValidator(5, 5);

		const result = validator.validate(5);
		expect(result.error).toBe(null);
	});
});
