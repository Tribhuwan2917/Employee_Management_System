import * as Yup from 'yup';
export const UpdateEmployeeDetailsSchema=Yup.object({
    employeeId:Yup.number().required("Employee Id is reuired"),
    employeeFirstName:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee First Name").required("Employee First Name is required"),
    employeeLastName:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee Last Name").required("Employee Last Name is required"),
    employeeEmail:Yup.string().email("InValid Email Id: ").required("Employee email is required"),
    employeeAddressZipCode: Yup.string().matches(/[0-9]+/,"Invalid Employee Zip Code").required("Employee Zip is required"),
    employeeAddressCity:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee Address City").required("Employee city is required"),
    employeeSalaryPerMonth:Yup.number().required("Employee Salary is required"),
    employeeGender:Yup.string().required("Employee Gender is required"),
    employeeCountry:Yup.string().required("Employee Country Is required")

})