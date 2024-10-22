-- CreateTable
CREATE TABLE "oppstable" (
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "posteddate" DATE,
    "archivedate" DATE,
    "naicscode" VARCHAR,
    "naicscodes" VARCHAR,
    "typeofsetaside" VARCHAR,
    "typeofsetasidedescription" VARCHAR,
    "noticeid" VARCHAR,
    "solicitationnumber" VARCHAR,
    "fullparentpathname" VARCHAR,
    "fullparentpathcode" VARCHAR,
    "type_op" VARCHAR,
    "basetype_op" VARCHAR,
    "archivetype" VARCHAR,
    "classificationcode" VARCHAR,
    "pointofcontactname" VARCHAR,
    "pointofcontactemail" VARCHAR,
    "pointofcontactphone" VARCHAR,
    "placeofperformancecity" VARCHAR,
    "placeofperformancestate" VARCHAR,
    "placeofperformancezip" VARCHAR,
    "placeofperformancecountry" VARCHAR,
    "ulink" VARCHAR,
    "ranking_process_flag" VARCHAR
);

-- CreateTable
CREATE TABLE "oppclientinfo" (
    "client_short_name" VARCHAR NOT NULL,
    "client_raw_text" TEXT NOT NULL,
    "id" SMALLSERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "oppclientlist" (
    "id" SMALLSERIAL NOT NULL,
    "clientshortname" VARCHAR,
    "clientlongname" VARCHAR,
    "status" BOOLEAN
);

-- CreateTable
CREATE TABLE "oppstableinfo" (
    "opps_id" VARCHAR NOT NULL,
    "opps_raw_text" TEXT NOT NULL,
    "id" SMALLSERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "oppstempstore" (
    "record_identifier" VARCHAR NOT NULL,
    "raw_text" TEXT NOT NULL,
    "id" SMALLSERIAL NOT NULL,
    "record_type" VARCHAR
);

-- CreateTable
CREATE TABLE "oppsclientranking" (
    "opps_id" VARCHAR NOT NULL,
    "client_short_name" VARCHAR,
    "score" DECIMAL,
    "id" SMALLSERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "oppstable_title_key" ON "oppstable"("title");

-- CreateIndex
CREATE UNIQUE INDEX "oppstable_noticeid_key" ON "oppstable"("noticeid");

-- CreateIndex
CREATE UNIQUE INDEX "oppclientinfo_id_key" ON "oppclientinfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "oppclientlist_id_key" ON "oppclientlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "oppstableinfo_id_key" ON "oppstableinfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "oppstempstore_id_key" ON "oppstempstore"("id");

-- CreateIndex
CREATE UNIQUE INDEX "oppsclientranking_id_key" ON "oppsclientranking"("id");
