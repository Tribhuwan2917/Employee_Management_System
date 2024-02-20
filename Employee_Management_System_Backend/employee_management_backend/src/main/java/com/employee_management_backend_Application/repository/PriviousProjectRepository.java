package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.CurrentProject;
import com.employee_management_backend_Application.entity.PriviousProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriviousProjectRepository extends JpaRepository<PriviousProject,Integer> {
    @Query("select priviousProject from PriviousProject priviousProject where priviousProject.employeeId=:employeeId")
    public List<PriviousProject> findPriviousProjectByEmployeeId(Integer employeeId);
}
