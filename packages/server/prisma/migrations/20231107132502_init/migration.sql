-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
    "updatedOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
    "updatedOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceUsers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspaceId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
    "updatedOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),

    CONSTRAINT "workspaceUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
    "updatedOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaceProjects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspaceId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "createdOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
    "updatedOn" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),

    CONSTRAINT "workspaceProjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_slug_key" ON "workspaces"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceUsers_userId_workspaceId_key" ON "workspaceUsers"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceProjects_projectId_workspaceId_key" ON "workspaceProjects"("projectId", "workspaceId");

-- AddForeignKey
ALTER TABLE "workspaceUsers" ADD CONSTRAINT "workspaceUsers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceUsers" ADD CONSTRAINT "workspaceUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceProjects" ADD CONSTRAINT "workspaceProjects_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceProjects" ADD CONSTRAINT "workspaceProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
