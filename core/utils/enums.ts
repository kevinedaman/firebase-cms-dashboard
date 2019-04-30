export const handleEnums = (enumObj) => {
    return Object.keys(enumObj).map(key => {
        return { key, value: enumObj[key] }
    });
}

export const enumKeys = (enumObj) => {
    return Object.keys(enumObj);
}

export const enumValues = (enumObj) => {
    return Object.values(enumObj);
}
