package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "priviousProject_details")
public class PriviousProject {
    @Id
    private Integer priviousProjectId;
    private String priviousProjectTitle;
    private String priviousProjectLink;
    private String priviousProjectDescription;
    private String priviousProjectObjective;
    private Integer employeeId;
}
