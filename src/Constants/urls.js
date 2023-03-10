export const URLS = {
    getCompanyConfig: `/bookings/widgets/company/${process.env.REACT_APP_COMPANY}/type/external`,
    getMasterFreeDate: `/bookings/company/${process.env.REACT_APP_COMPANY}/employees/dates`,
    getFreeDates: `/bookings/company/${process.env.REACT_APP_COMPANY}/calendars`,
    postNewBook: `/bookings/company/${process.env.REACT_APP_COMPANY}/book`,
    postWebAppResult: `/web-app-result`,
    postTgResult: `/tg-result`
}