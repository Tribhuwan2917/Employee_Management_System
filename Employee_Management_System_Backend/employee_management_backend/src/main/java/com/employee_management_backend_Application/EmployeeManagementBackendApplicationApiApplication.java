package com.employee_management_backend_Application;

import com.employee_management_backend_Application.entity.CurrentProject;
import com.employee_management_backend_Application.entity.EmployeeDetails;
import com.employee_management_backend_Application.entity.PriviousProject;
import com.employee_management_backend_Application.entity.Registration;
import com.employee_management_backend_Application.repository.CurrentProjectRepository;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import com.employee_management_backend_Application.repository.PriviousProjectRepository;
import com.employee_management_backend_Application.repository.RegistrationRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.reactive.context.ConfigurableReactiveWebApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class
EmployeeManagementBackendApplicationApiApplication {
	public static void main(String[] args) throws IOException {
		ConfigurableApplicationContext ctx = SpringApplication.run(EmployeeManagementBackendApplicationApiApplication.class, args);
		RegistrationRepository registrationRepository = ctx.getBean(RegistrationRepository.class);
		EmployeeDetailsRepository employeeDetailsRepository = ctx.getBean(EmployeeDetailsRepository.class);
		PriviousProjectRepository priviousProjectRepository = ctx.getBean(PriviousProjectRepository.class);
		CurrentProjectRepository currentProjectRepository=ctx.getBean(CurrentProjectRepository.class);

	}
}