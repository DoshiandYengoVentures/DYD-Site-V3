package com.doshiyengo.digital.dashboard.requests;

import java.util.List;
import java.util.Optional;

/**
 * Storage boundary for client requests. {@link InMemoryRequestRepository} backs this
 * today; swap in a JPA-backed implementation later without touching the service,
 * controller, or templates.
 */
public interface RequestRepository {

    ClientRequest save(ClientRequest request);

    List<ClientRequest> findByUsername(String username);

    Optional<ClientRequest> findById(String id);
}
