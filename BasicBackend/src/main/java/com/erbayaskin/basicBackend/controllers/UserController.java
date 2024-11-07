package com.erbayaskin.basicBackend.controllers;

import com.erbayaskin.basicBackend.models.dto.CommonResponse;
import com.erbayaskin.basicBackend.models.dto.LoginResponse;
import com.erbayaskin.basicBackend.models.dto.UserDTO;
import com.erbayaskin.basicBackend.models.entities.User;
import com.erbayaskin.basicBackend.security.JwtService;
import com.erbayaskin.basicBackend.services.AuthenticationService;
import com.erbayaskin.basicBackend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    JwtService jwtService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<CommonResponse> loginUser(@RequestBody User user) {
        try{
            User inDbUser = userService.findByUsername(user.getUsername());
            if(inDbUser == null)
                throw new Exception("Kullanıcı adı veya şifreye ait kullanıcı bulunamadı!");
            User authenticatedUser = authenticationService.authenticate(user);

            String jwtToken = jwtService.generateToken(authenticatedUser);
            String prefix = jwtService.getPrefix();


            inDbUser.setPassword(null);
            LoginResponse loginResponse = LoginResponse.builder()
                    .token(jwtToken)
                    .prefix(prefix)
                    .user(inDbUser)
                    .expirationTime(jwtService.getExpirationTime()).build();

            return ResponseEntity.ok(CommonResponse.builder().data(loginResponse).build());

        }catch(Exception e){
            return new ResponseEntity <>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(),HttpStatus.EXPECTATION_FAILED);
        }

    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<CommonResponse> registerUser(@RequestBody UserDTO user) {
        try {
            User inDbUser = userService.findByUsername(user.getUsername());
            if (inDbUser != null)
                return new ResponseEntity<>(
                        CommonResponse.builder().message("Please set different username, because this username already use by another user!").status(501).build(), HttpStatus.EXPECTATION_FAILED);
            ObjectMapper objectMapper = new ObjectMapper();
            authenticationService.signup(objectMapper.convertValue(user,User.class));
            return new ResponseEntity<>(
                    CommonResponse.builder().data("registered").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<CommonResponse> updateUser(@RequestBody(required = false) UserDTO user) {
        try {
            BCryptPasswordEncoder bpe = new BCryptPasswordEncoder();
            if (user.getPassword() != null && user.getPassword() != "")
                user.setPassword(bpe.encode(user.getPassword()));
            else {
                User userInDB = userService.getUserById(user.getId());
                if (userInDB != null) {
                    user.setPassword(userInDB.getPassword());
                }

            }
            ObjectMapper objectMapper = new ObjectMapper();
            userService.saveUser(objectMapper.convertValue(user,User.class));
            return new ResponseEntity<>(
                    CommonResponse.builder().data("updated").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(), HttpStatus.EXPECTATION_FAILED);
        }
    }


    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<CommonResponse> getUserList() {
        try {
            List<User> list = userService.getAllUsers();
            list.forEach(user -> user.setPassword(null));
            return new ResponseEntity<>(
                    CommonResponse.builder().data(list).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    @RequestMapping(value = "/getAllPageable", method = RequestMethod.GET)
    public ResponseEntity<CommonResponse> getUserList(@RequestParam("page") int page,
                                                      @RequestParam("size") int size) {
        try {
            Page<User> list = userService.getAllPageableUsers(PageRequest.of(page, size));
            list.forEach(user -> user.setPassword(null));
            return new ResponseEntity<>(
                    CommonResponse.builder().data(list).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public ResponseEntity<CommonResponse> getUser(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id.longValue());
            user.setPassword(null);
            return new ResponseEntity<>(
                    CommonResponse.builder().data(user).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(404).build(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<CommonResponse> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return new ResponseEntity<>(
                    CommonResponse.builder().data("deleted").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    CommonResponse.builder().message(e.getMessage()).status(501).build(), HttpStatus.EXPECTATION_FAILED);
        }
    }
}