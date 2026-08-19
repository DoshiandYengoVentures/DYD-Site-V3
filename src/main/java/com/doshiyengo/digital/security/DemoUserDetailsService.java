package com.doshiyengo.digital.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Single hardcoded demo account so /dashboard can be demonstrated without a database.
 * Replace with a real UserDetailsService backed by a client table when accounts exist.
 */
@Service
public class DemoUserDetailsService implements UserDetailsService {

    public static final String DEMO_USERNAME = "demo@doshiyengo.digital";
    public static final String DEMO_PASSWORD = "Demo1234!";
    public static final String DEMO_BUSINESS_NAME = "Harbor & Co. Contracting";

    private final ClientPrincipal demoUser;

    public DemoUserDetailsService(PasswordEncoder passwordEncoder) {
        this.demoUser = new ClientPrincipal(
                DEMO_USERNAME,
                passwordEncoder.encode(DEMO_PASSWORD),
                DEMO_BUSINESS_NAME
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (demoUser.getUsername().equalsIgnoreCase(username)) {
            return demoUser;
        }
        throw new UsernameNotFoundException("No account found for " + username);
    }
}
