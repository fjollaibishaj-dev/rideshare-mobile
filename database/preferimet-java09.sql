
CREATE TABLE IF NOT EXISTS preferimet (
  id SERIAL PRIMARY KEY,

  github_id TEXT NOT NULL
    REFERENCES profilet(github_id)
    ON DELETE CASCADE,

  udhetimi_id TEXT NOT NULL
    REFERENCES udhetimet(id)
    ON DELETE CASCADE,

  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT preferimet_unike
    UNIQUE (github_id, udhetimi_id)
);
