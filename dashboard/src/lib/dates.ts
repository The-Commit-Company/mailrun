import moment from 'moment'

/**
 * Converts a Frappe date to a readable time ago string
 * @param date A frappe date string in the format YYYY-MM-DD
 * @param withoutSuffix remove the suffix from the time ago string
 * @returns 
 */
export const convertFrappeDateStringToTimeAgo = (date?: string, withoutSuffix?: boolean) => {
    if (date) {
        const userDate = moment(date)
        return userDate.fromNow(withoutSuffix)
    }
    return ''
}