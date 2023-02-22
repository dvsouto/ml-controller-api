const ObjectUtil = {
	makeIterable: (obj, with_keys = true): Iterable<object> | Iterable<[string, object]> => {
		const iterable = {
			...obj,
			[Symbol.iterator]: function () {
				const properties = Object.keys(obj);
				let count = 0;
				let isDone = false;

				const next = () => {
					if (count >= properties.length) {
						isDone = true;
					}

					const key = properties[count];
					count += 1;

					const value = with_keys ? [key, obj[key]] : obj[key];

					return { value, done: isDone };
				};

				return { next };
			}
		};

		return iterable;
	},
	trimObjectStrings: (obj) => {
		if (obj && typeof obj === "object") {
			for (const prop in obj) {
				if (typeof obj[prop] === "string") {
					obj[prop] = obj[prop].trim();
				} else if (obj[prop] && typeof obj[prop] === "object") {
					obj[prop] = ObjectUtil.trimObjectStrings(obj[prop]);
				}
			}
		}

		return obj;
	}
};

export {
	ObjectUtil
};
