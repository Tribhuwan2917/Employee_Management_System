package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails,Integer> {
}
