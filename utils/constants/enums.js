const CaseStatus = {
    NEWCASE: 'NEWCASE',
    INPROGRESS: 'INPROGRESS',
    SENTTOREVIEW: 'SENTTOREVIEW',
    INREVIEW: 'INREVIEW',
    REQUESTCHANGES: 'REQUESTCHANGES',
    FINISHED: 'FINISHED',
    DOCTORAPPROVED: 'DOCTORAPPROVED',
    DOCTORREQUESTCHANGES: 'DOCTORREQUESTCHANGES',
};

const OtpTypes = {
    REGISTER: 'REGISTER',
    RESETPASSWORD: 'RESETPASSWORD',
    CHANGEPASSWORD: 'CHANGEPASSWORD',

};



module.exports = { CaseStatus, OtpTypes }
