package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_details")
public class EmployeeDetails {
    @Id
    private Integer employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private String employeeEmail;
    private String employeeCountry;
    private String employeeAddressZipCode;
    private String employeeAddressCity;
    private Integer employeeSalaryPerMonth;
    private String employeeGender;
    private String employeeImageUrl;
}
