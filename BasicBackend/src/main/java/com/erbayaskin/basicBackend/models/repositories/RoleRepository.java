package com.erbayaskin.basicBackend.models.repositories;


import com.erbayaskin.basicBackend.models.entities.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
