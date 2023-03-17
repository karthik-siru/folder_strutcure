/**
 * get the start and end timestamp
 * @param {String} type 
 * @returns Array<Timestamp, TimeStamp>
 */
const generateTimeStamp = (type) => {
    const now = new Date();
    const currentMonthDayOne = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const endTime = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();
    return [currentMonthDayOne, endTime];
}

module.exports = generateTimeStamp;
