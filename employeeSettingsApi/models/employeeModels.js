const employeeSettings = {};

class EmployeeSettings{
    constructor (employeeId, name, email, phoneNumber, address, department, workSchedule, profilePicture, dateOfJoining, status) {
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.department = department;
        this.workSchedule = workSchedule;
        this.profilePicture = profilePicture;
        this.dateOfJoining = dateOfJoining;
        this.status = status;
    }
    toDict() {
        return {
            employeeId: this.employeeId,
            name: this.name,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            department: this.department,
            workSchedule: this.workSchedule,
            profilePicture: this.profilePicture,
            dateOfJoining: this.dateOfJoining,
            status:this.status
        }
    }
    static createOrUpdate(data) {
        const settings = new EmployeeSettings(
            data.employeeId
            ,
            data.name, data.email, data.phoneNumber, data.address, data.department, data.workSchedule, data.profilePicture, data.dateOfJoining, data.status)
        employeeSettings[data.employeeId] = settings;
        return settings.toDict();
    }

    static getByid(employeeId) {
        if (employeeId in employeeSettings) {
            return employeeSettings[employeeId].toDict();
        }
        return null;
    }
    static getAll() {
        return
        Object.values(employeeSettings).map(settings=>settings.toDict())
    }
    static delete(employeeId)
{
    if (employeeId in employeeSettings) {
        delete employeeSettings[employeeId];
        return true;
    }
    return false
}
}
MediaSourceHandle.exports = EmployeeSettings;