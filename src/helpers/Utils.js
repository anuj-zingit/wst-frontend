let getInitials = function (name) {
    if(!name){
        return '';
    }
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};
let getName = function (contact) {
    let name = `${contact.firstname||''} ${contact.lastname||''}`.trim();
    if(!name){
        name = `${contact.contact_name||''}`.trim()
    }
    if(name === "N/A"){
        name = '';
    }
    return  name || contact.mobile;
};

let removeSeconds = function (string,removeTimezone = false) {
    if(!string){
        return string;
    }
    if(removeTimezone){
        string = string.replaceAll('CT','');
    }
    let parts = string.split(' ');

    if(parts.length > 0 && parts[0].includes(':')) {
        parts[0] = parts[0].split(':').slice(0, -1).join(':');
    }
    if(parts.length > 1 && parts[1].includes(':')) {
        parts[1] = parts[1].split(':').slice(0, -1).join(':');
    }
    return parts.join(' ');

}

let getDateInFormat = function (date) {
    var dt = new Date();
    if(date) {
        dt = new Date(date);
    }

    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");
    
    let formattedDate = (month + '/' + day + '/' + year);
    return formattedDate;
}

let getEndDate = function() {
    const dt = new Date();
    dt.setMonth(dt.getMonth() + 1);
    const endDate = getDateInFormat(dt);
    return endDate;
}

let getStartDate = function() {
    let dt = new Date();
    //setting 6 months back date
    dt.setMonth(dt.getMonth() - 12);
    const startDate = getDateInFormat(dt);
    return startDate;
}

let parsePhnNumber = (e) => {
    let value = e;
    if (parseInt(e)) {
        // eslint-disable-next-line
        value = value.replace(/\-/g, "");
        if (value.length > 3 && value.length <= 6)
            value = value.slice(0, 3) + "-" + value.slice(3);
        else if (value.length > 6)
            value =
                value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
        return value.slice(0, 12);
    } else {
        return e;
    }
};

export default {
    parsePhnNumber,
    getInitials,
    getName,
    removeSeconds,
    getStartDate,
    getEndDate
}
