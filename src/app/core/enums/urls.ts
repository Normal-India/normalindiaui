import { environment } from '../../../environments/environment';

let url = environment.baseUrl + '/api/';

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
    CaseUrl: 'https://api.covid19india.org/v3/data.json',
}
export const HOSPITAL = {
    StateUrl: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    DistrictUrl: ' https://cdn-api.co-vin.in/api/v2/admin/location/districts',
    HospitalByPinCodeUrl: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/gethospitaldatabypin',
    GethospitaldataUrl: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/gethospitaldata',
    GethospitalbyidUrl: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/gethospitalbyid',
    addReport: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/addreport',
    updatereport: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/updatereport', 
    updateinfo: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/updateinfo', 
    // '../../../assets/Data/ts.json'
}

export const SLOTS = {
    SlotsDate: 'https://www.healthifyme.com/api/v1/cowin/day_wise_slots',
    slots: 'https://www.healthifyme.com/api/v1/cowin/slots'
}

export const COMPONENTS = {
    getComponentdata: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/getcomponentdata',
    fecthdata: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/fetchdata',
    fetchdatabypin: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/fetchdatabypin'
}

export const DONOR = {
    adddonor: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/donoraction/adddonor',
}