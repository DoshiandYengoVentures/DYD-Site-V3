package com.doshiyengo.digital.dashboard.requests;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public ClientRequest createRequest(String username, String title, String description,
                                        RequestCategory category, RequestPriority priority) {
        ClientRequest request = new ClientRequest(username, title, description, category, priority);
        return requestRepository.save(request);
    }

    public List<ClientRequest> getRequestsForUser(String username) {
        return requestRepository.findByUsername(username);
    }

    public List<ClientRequest> getRequestsForUser(String username, RequestStatus statusFilter) {
        List<ClientRequest> requests = getRequestsForUser(username);
        if (statusFilter == null) {
            return requests;
        }
        return requests.stream()
                .filter(request -> request.getStatus() == statusFilter)
                .toList();
    }

    public void updateStatus(String id, String username, RequestStatus newStatus) {
        requestRepository.findById(id)
                .filter(request -> request.getUsername().equalsIgnoreCase(username))
                .ifPresent(request -> request.setStatus(newStatus));
    }
}
