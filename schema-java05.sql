
-- RideShare — Java 5: Hyrja dhe lejet

-- 1. Krijo tabelen e profileve
CREATE TABLE IF NOT EXISTS profilet (
    github_id TEXT PRIMARY KEY,
    emri TEXT NOT NULL,
    roli TEXT NOT NULL DEFAULT 'udhetar'
        CHECK (roli IN ('udhetar', 'shofer'))
);

-- 2. Shto pronarin e udhetimit
ALTER TABLE udhetimet
ADD COLUMN IF NOT EXISTS shofer_id TEXT
REFERENCES profilet(github_id);

-- 3. Krijo profilin demo te shoferit tjeter
INSERT INTO profilet (github_id, emri, roli)
VALUES ('DEMO-SHOFER-2', 'Shoferi tjeter (demo)', 'shofer')
ON CONFLICT (github_id) DO NOTHING;

-- 4. Cakto pronarin e udhetimit me ID 1
UPDATE udhetimet
SET shofer_id = 'DEMO-SHOFER-2'
WHERE id = '1'
  AND shofer_id IS NULL;

-- 5. Cakto rolin shofer per perdoruesin tim
INSERT INTO profilet (github_id, emri, roli)
VALUES ('333374005', 'fjollaibishaj-dev', 'shofer')
ON CONFLICT (github_id)
DO UPDATE SET roli = 'shofer';

-- 6. Cakto pronarin e udhetimit me ID 2
UPDATE udhetimet
SET shofer_id = '333374005'
WHERE id = '2';

-- 7. Kontrollo pronaret e udhetimeve
SELECT id, nisja, ora, shofer_id
FROM udhetimet
ORDER BY id;
