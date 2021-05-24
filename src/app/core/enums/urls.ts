import { environment } from '../../../environments/environment';

let url = environment.baseUrl;

export const LOGIN = {
    TOKEN: url + 'Token/login',
    RefreshToken: url + 'Token/refreshToken',
    logout: url + 'Token/Logout'
}
export const USER = {
    USER_DETAILS: url + 'Account/users/me',
    changePassword: url + 'Account/public/changepassword',
    resetPassword: url + 'account/public/resetpassword',
    recoverPassword: url + 'Account/public/recoverpassword'
}
// export const URLS = {
// }

export const CASE = {
    CaseUrl: 'https://api.covid19india.org/v4/min/data.min.json',
}
export const HOSPITAL = {
    StateUrl: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    DistrictUrl: ' https://cdn-api.co-vin.in/api/v2/admin/location/districts',
    HospitalByPinCodeUrl: url + 'gethospitaldatabypin',
    GethospitaldataUrl: url + 'gethospitaldata',
    GethospitalbyidUrl: url + 'gethospitalbyid',
    addReport: url + 'addreport',
    updatereport: url + 'updatereport',
    updateinfo: url + 'updateinfo',
    // '../../../assets/Data/ts.json'
}

export const SLOTS = {
    SlotsDate: 'https://www.healthifyme.com/api/v1/cowin/day_wise_slots',
    slots: 'https://www.healthifyme.com/api/v1/cowin/slots'
}

export const COMPONENTS = {
    getComponentdata: url + 'getcomponentdata',
    fecthdata: url + 'fetchdata',
    fetchdatabypin: url + 'fetchdatabypin',
    notify: 'http://ninotificationservice-env.eba-j7q5natv.us-east-2.elasticbeanstalk.com/notify',
}

export const DONOR = {
    adddonor: url + 'donoraction/adddonor',
}

export const VACCINE = {
    getAvailabilityByDistrict: url + 'vaccine/getAvailabilityByDistrict',
    getAvailabilityByPin: url + 'vaccine/getAvailabilityByPin'
}