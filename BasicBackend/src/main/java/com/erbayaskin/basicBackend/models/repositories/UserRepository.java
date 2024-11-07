package com.erbayaskin.basicBackend.models.repositories;

import com.erbayaskin.basicBackend.models.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    public User findByUsername(String userName);
    public User findByEmail(String email);
    Page<User> findAll(Pageable pageable);
}