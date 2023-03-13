// Your code here

function createEmployeeRecord(array){
    //console.log(array[0])
    let employee = {}
    employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []

    return employee
}

function createEmployeeRecords(arrayOfArrays){
    //console.log(arrayOfArrays)
    let employeeRecordsArray = arrayOfArrays.map(createEmployeeRecord)
    //console.log(employeeRecordsArray)

    return employeeRecordsArray
}

function createTimeInEvent(employeeRecord, dateStamp){
    let objectForTimeIn = {}
    objectForTimeIn.type = "TimeIn"
    objectForTimeIn.hour = parseInt(dateStamp.slice(11,15))
    objectForTimeIn.date = dateStamp.slice(0,10)
    employeeRecord.timeInEvents.push(objectForTimeIn)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let objectForTimeOut = {}
    objectForTimeOut.type = "TimeOut"
    objectForTimeOut.hour = parseInt(dateStamp.slice(11,15))
    objectForTimeOut.date = dateStamp.slice(0,10)
    employeeRecord.timeOutEvents.push(objectForTimeOut)

    return employeeRecord


}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let timeInOnDate = 0
    let timeOutOnDate = 0
    for (let i of employeeRecord.timeInEvents){
        if (i.date === dateStamp){
            timeInOnDate = i.hour
        }
    }
    for (let i of employeeRecord.timeOutEvents){
        if (i.date === dateStamp){
            timeOutOnDate = i.hour
        }
    }

    return (timeOutOnDate - timeInOnDate)/100
}

function wagesEarnedOnDate(employeeRecord, dateStamp){

    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employee){
    let accumulator = 0
    for (let i of employee.timeInEvents){
        let currentwages = wagesEarnedOnDate(employee, i.date)
        accumulator = accumulator + currentwages
    }
    return accumulator
}

function calculatePayroll(arrayOfRecords){

    let newArray = arrayOfRecords.map(allWagesFor)
    return newArray.reduce((accumulator, i) => accumulator + i, 0)
}