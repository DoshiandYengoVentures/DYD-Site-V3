package com.doshiyengo.digital.dashboard.requests;

import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryRequestRepository implements RequestRepository {

    private final Map<String, ClientRequest> store = new ConcurrentHashMap<>();

    @Override
    public ClientRequest save(ClientRequest request) {
        store.put(request.getId(), request);
        return request;
    }

    @Override
    public List<ClientRequest> findByUsername(String username) {
        return store.values().stream()
                .filter(request -> request.getUsername().equalsIgnoreCase(username))
                .sorted(Comparator.comparing(ClientRequest::getSubmittedAt).reversed())
                .toList();
    }

    @Override
    public Optional<ClientRequest> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
