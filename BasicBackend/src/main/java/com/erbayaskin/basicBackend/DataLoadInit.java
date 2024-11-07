package com.erbayaskin.basicBackend;

import com.erbayaskin.basicBackend.models.entities.Role;
import com.erbayaskin.basicBackend.models.entities.User;
import com.erbayaskin.basicBackend.models.repositories.*;
import org.glassfish.jersey.internal.guava.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoadInit implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        Role roleAdmin = Role.builder().id(1).role_name("ROLE_ADMIN").build();
        Role roleUser = Role.builder().id(2).role_name("ROLE_USER").build();
        Role roleClientSignerUser = Role.builder().id(3).role_name("ROLE_CLIENTSIGNER").build();

        List<Role> roleList = Lists.newArrayList(roleRepository.findAll());
        if(roleList == null || roleList.size()==0){
            roleAdmin = roleRepository.save(roleAdmin);
            roleRepository.save(roleUser);
            roleRepository.save(roleClientSignerUser);


            User adminUserSaved = userRepository.findByUsername("ROLE_ADMIN");


            if(adminUserSaved == null){
                BCryptPasswordEncoder bpe = new BCryptPasswordEncoder();
                User admin = User.builder()
                    .email("admin@ptt.gov.tr")
                    .enabled(true)
                    .roles(Arrays.asList(roleAdmin))
                    .username("admin")
                    .password(bpe.encode("admin1234_"))
                    .build();
                userRepository.save(admin);
            }

        }

    }
}
