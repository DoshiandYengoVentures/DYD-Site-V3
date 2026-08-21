import * as repository from "./repository";
import type { ClientRequest, RequestCategory, RequestPriority, RequestStatus } from "./types";

export async function createRequest(
  username: string,
  title: string,
  description: string,
  category: RequestCategory,
  priority: RequestPriority
): Promise<ClientRequest> {
  return repository.insertRequest({ username, title, description, category, priority });
}

export async function getRequestsForUser(username: string, statusFilter?: RequestStatus): Promise<ClientRequest[]> {
  const all = await repository.findByUsername(username);
  if (!statusFilter) return all;
  return all.filter((request) => request.status === statusFilter);
}

export async function updateStatus(id: string, username: string, status: RequestStatus): Promise<void> {
  await repository.updateStatusById(id, username, status);
}
