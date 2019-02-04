exports.bar = async (fileName) => {
    await exports.createFile(fileName);
    let result = await callDB(fileName);

    return result;
}