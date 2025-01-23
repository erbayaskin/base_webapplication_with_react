package com.erbayaskin.basicBackend.models.repositories;


import com.erbayaskin.basicBackend.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
