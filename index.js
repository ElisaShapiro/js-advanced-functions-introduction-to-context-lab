// Your code here
function createEmployeeRecord(inputArray){
    return {
        firstName: inputArray[0],
        familyName: inputArray[1],
        title: inputArray[2],
        payPerHour: inputArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(inputArrays){
    return inputArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, datestamp){ 
    employeeRecord.timeInEvents.push({type: "TimeIn", hour: parseInt(datestamp.slice(11)), date: datestamp.slice(0,10)})
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, datestamp){
    employeeRecord.timeOutEvents.push({type: "TimeOut", hour: parseInt(datestamp.slice(11)), date: datestamp.slice(0,10)})
    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.filter(item => item.date === date)[0].hour; 
    let timeOut = employeeRecord.timeOutEvents.filter(item => item.date === date)[0].hour;
    return (timeOut - timeIn)/100; 
}

function wagesEarnedOnDate (employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor (employeeRecord){
    let allDatesWorked = employeeRecord.timeInEvents.map(item => item.date)
    return allDatesWorked.map(date => wagesEarnedOnDate(employeeRecord, date)).reduce((accumulator, currentValue) => accumulator + currentValue)
}

function findEmployeeByFirstName(inputArray, firstName){
    return inputArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(inputArray){
    let allWagesTotal = inputArray.map(employee => allWagesFor(employee))
    return allWagesTotal.reduce((accumulator, currentValue) => accumulator + currentValue)
}