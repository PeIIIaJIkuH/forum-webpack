export const updateObjectInArray = (items, itemId, prop, newObjProp) => items.map(i => {
	if (i[prop] === itemId) {
		return {...i, ...newObjProp}
	}
	return i
})