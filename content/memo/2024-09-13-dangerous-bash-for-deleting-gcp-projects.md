---
title: "Dangerous bash for deleting GCP projects"
date: 2024-09-13T00:00:00.000Z
draft: false
---

List all projects with a given prefix to their project ID, which are ones we want to delete:

```bash
gcloud projects list \
--format 'csv(projectId)' \
--filter 'projectId~^tf-test-'  
```

Get a count of projects to be deleted (exclude CSV header from count):

```bash
gcloud projects list \
--format 'csv(projectId)' \
--filter 'projectId~^tf-test-' | awk 'NR>1' | wc -l
```

Looping though the project IDs, excluding the CSV header, and using the project ID in a command:

```bash
for i in $(gcloud projects list --format 'csv(projectId)' --filter 'projectId~^tf-test-'  | awk 'NR>1'); do \
  echo "$i"; \
done;
```

This loop will tell you which project is being considered, and waits for y/n input to proceed with deletion

```bash
for i in $(gcloud projects list --format 'csv(projectId)' --filter 'projectId~^tf-test-'  | awk 'NR>1'); do \
  printf "$i will be deleted\n"; \
  gcloud projects delete $i; \
done;
```

This loop below should make you sweat if you haven't looked through the commands above. It automatically approves the deletion action and should be used carefully!
Even writing it felt a little dirty, let alone using it.

```bash
for i in $(gcloud projects list --format 'csv(projectId)' --filter 'projectId~^tf-test-'  | awk 'NR>1'); do \
  printf "$i will be deleted\n"; \
  yes | gcloud projects delete $i; \
done;
```

