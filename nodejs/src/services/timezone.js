const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const { TZ } = require('../config/config');

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const convertToTz = function (params) {
    try {
        const obj = { ...params };
        const defaultTimezone = TZ;
        const requestTimezone = obj?.tz ? obj.tz : defaultTimezone;
        if (obj && obj.date === undefined) {
            obj.date = dayjs()
                .tz(requestTimezone)
                .format(DATE_FORMAT);
        }
        const format = obj?.format ? obj.format : DATE_FORMAT;
        let convertedDateTime = dayjs(obj.date);
        if (requestTimezone !== defaultTimezone) {
            convertedDateTime = dayjs(obj.date).tz(requestTimezone);
        }
        // Logic to emulate original moment behavior if needed, but dayjs.tz handles conversion
        // The original code was doing manual offset calc:
        // let serverTimeZone = moment(obj.date, defaultTimezone);
        // ...
        // Replicating original logic exactly to be safe:
        let serverTimeZone = dayjs.tz(obj.date, defaultTimezone);
        let localOffset = serverTimeZone.utcOffset();
        // serverTimeZone.tz(requestTimezone) returns NEW instance in dayjs (immutable)
        let centralTimeZone = serverTimeZone.tz(requestTimezone);
        let centralOffset = centralTimeZone.utcOffset();
        let diffInMinutes = localOffset - centralOffset;
        const date = convertedDateTime.tz(defaultTimezone);

        return date.add(diffInMinutes, 'minutes').format(format);
    } catch (error) {
        handleError(error, 'Error - convertToTz');
    }
};

const convertToRetriveTz = (params) => {
    try {
        const obj = { ...params };
        const defaultTimezone = TZ;
        const requestTimezone = obj?.tz ? obj.tz : defaultTimezone;
        if (obj && obj.date === undefined) {
            obj.date = dayjs().toISOString();
        }
        let format = obj?.format ? obj.format : DATE_FORMAT;
        let convertedDateTime = dayjs(obj.date);
        if (requestTimezone !== defaultTimezone) {
            convertedDateTime = dayjs(obj.date).tz(defaultTimezone);
        }
        const date = convertedDateTime.tz(requestTimezone);
        return format ? date.format(format) : date;
    } catch (error) {
        handleError(error, 'Error - convertToRetriveTz');
    }
};

module.exports = {
    convertToTz,
    convertToRetriveTz
}
