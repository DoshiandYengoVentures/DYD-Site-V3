"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import * as service from "@/lib/requests/service";
import { REQUEST_CATEGORIES, REQUEST_PRIORITIES } from "@/lib/requests/types";
import type { RequestCategory, RequestPriority } from "@/lib/requests/types";
import type { CreateRequestState } from "./state";

export async function createRequestAction(
  prevState: CreateRequestState,
  formData: FormData
): Promise<CreateRequestState> {
  const session = await auth();
  const username = session?.user?.username;
  if (!username) {
    redirect("/login");
  }

  const values = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    category: String(formData.get("category") ?? ""),
    priority: String(formData.get("priority") ?? ""),
  };

  const errors: CreateRequestState["errors"] = {};

  if (!values.title) {
    errors.title = "Please enter a title.";
  } else if (values.title.length > 140) {
    errors.title = "Title must be 140 characters or fewer.";
  }

  if (!values.description) {
    errors.description = "Please add a description.";
  } else if (values.description.length > 4000) {
    errors.description = "Description must be 4000 characters or fewer.";
  }

  if (!values.category) {
    errors.category = "Please choose a category.";
  } else if (!REQUEST_CATEGORIES.some((c) => c.value === values.category)) {
    errors.category = "Please choose a valid category.";
  }

  if (!values.priority) {
    errors.priority = "Please choose a priority.";
  } else if (!REQUEST_PRIORITIES.some((p) => p.value === values.priority)) {
    errors.priority = "Please choose a valid priority.";
  }

  if (Object.keys(errors).length > 0) {
    return { submitCount: prevState.submitCount + 1, errors, values };
  }

  await service.createRequest(
    username,
    values.title,
    values.description,
    values.category as RequestCategory,
    values.priority as RequestPriority
  );

  redirect("/dashboard/requests");
}
